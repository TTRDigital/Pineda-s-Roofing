// Seeds content/<slug>.json into Pineda's own Sanity project as a landingPage document.
//   node scripts/seed.mjs            DRY RUN (default): prints what would happen, writes nothing
//   node scripts/seed.mjs --apply    writes, using SANITY_WRITE_TOKEN from the environment
// Never overwrites: uses createIfNotExists, so an existing document (and any edits in it) is kept.
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const PROJECT = process.env.SANITY_PROJECT_ID || "5emjihiz";
const DATASET = process.env.SANITY_DATASET || "production";
const apply = process.argv.includes("--apply");
const token = process.env.SANITY_WRITE_TOKEN;
if (apply && !token) { console.error("--apply needs SANITY_WRITE_TOKEN in the environment (not in code)."); process.exit(1); }

let n = 0;
const keyed = (v) => Array.isArray(v) ? v.map((x) => (x && typeof x === "object" ? { _key: `k${n++}`, ...keyed(x) } : x)) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).filter(([k]) => !/Original$|^original$/.test(k)).map(([k, x]) => [k, keyed(x)])) : v;

export function toDoc(c) {
  const { slug, ...rest } = c;
  return { _id: `landingPage-${slug}`, _type: "landingPage", slug: { _type: "slug", current: slug }, ...keyed(rest) };
}

if (process.argv[1] && process.argv[1].endsWith("seed.mjs")) {
  console.log(`${apply ? "APPLY" : "DRY RUN"}: ${PROJECT}/${DATASET} (createIfNotExists, never overwrites)`);
  const mutations = [];
  for (const f of readdirSync(join(root, "content")).filter((f) => f.endsWith(".json"))) {
    const doc = toDoc(JSON.parse(readFileSync(join(root, "content", f), "utf8")));
    console.log(` - ${doc._id}: ${Object.keys(doc).length} fields, ${JSON.stringify(doc).length} bytes`);
    mutations.push({ createIfNotExists: doc });
  }
  if (!apply) { console.log("Nothing written. Re-run with --apply and SANITY_WRITE_TOKEN to create missing documents."); process.exit(0); }
  const res = await fetch(`https://${PROJECT}.api.sanity.io/v2025-02-19/data/mutate/${DATASET}?returnIds=true&visibility=sync`, {
    method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${token}` }, body: JSON.stringify({ mutations }),
  });
  const out = await res.json().catch(() => ({}));
  if (!res.ok) { console.error("Sanity error:", res.status, out?.error?.description || ""); process.exit(1); }
  console.log("Done:", (out.results || []).map((r) => `${r.id} ${r.operation}`).join(", "));
}
