// Builds public/<slug>/index.html from Sanity (landingPage document) with
// content/<slug>.json as the fallback. No dependencies.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "./template.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const PROJECT = process.env.SANITY_PROJECT_ID || "5emjihiz"; // Pineda's own Sanity project (public id)
const DATASET = process.env.SANITY_DATASET || "production";
const TTR_KEY = process.env.TTR_SITE_KEY || "O83UlUC9rgPzFghnkUy3Tg"; // public TTR OS site key for pinedas-roofing

const esc = (s) => String(s ?? "");

async function fromSanity(slug) {
  if (process.env.SKIP_SANITY === "1") return null;
  const q = encodeURIComponent(`*[_type=="landingPage" && slug.current==$slug][0]`);
  const url = `https://${PROJECT}.apicdn.sanity.io/v2025-02-19/data/query/${DATASET}?query=${q}&$slug=${encodeURIComponent(JSON.stringify(slug))}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { result } = await res.json();
    return result || null;
  } catch (e) {
    console.warn(`[${slug}] Sanity unavailable (${e.message}); using static content.`);
    return null;
  }
}

// Sanity document fields override the static fallback field by field.
function merge(base, doc) {
  if (!doc) return base;
  const out = { ...base };
  for (const [k, v] of Object.entries(doc)) {
    if (k.startsWith("_") || v == null) continue;
    if (k === "slug") continue;
    out[k] = v;
  }
  return out;
}

for (const file of readdirSync(join(root, "content")).filter((f) => f.endsWith(".json"))) {
  const base = JSON.parse(readFileSync(join(root, "content", file), "utf8"));
  const slug = base.slug;
  const doc = await fromSanity(slug);
  console.log(`[${slug}] content from ${doc ? "Sanity" : "static fallback"}`);
  const data = merge(base, doc);
  const html = render(data, { ttrKey: TTR_KEY, allowHeld: process.env.ALLOW_HELD_CLAIMS === "1" });
  const dir = join(root, "public", slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
  console.log(`[${slug}] wrote public/${slug}/index.html (${html.length} bytes)`);
}
