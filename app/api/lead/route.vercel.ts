import { attributionKeys, MIN_FILL_MS, propertyOptions, roofingNeedOptions, serviceOptions, SOLAR_SERVICE, solarMarkets } from "@/lib/lead-options";

/*
 * Estimate form handler for Vercel, which can't run public/api/lead.php.
 * Same checks and the same GoHighLevel payload as lead.php (keep them in sync).
 * Only built on Vercel: the ".vercel.ts" extension is a page extension there
 * (next.config.ts); the SiteGround static export ignores this file and uses
 * lead.php. next.config.ts rewrites /api/lead.php here, so the form posts to
 * the same address on both hosts.
 */

export const dynamic = "force-dynamic";

// Pineda's Roofing GoHighLevel workflow: "Inbound Webhook" trigger (same as lead.php).
const DEFAULT_WEBHOOK = "https://services.leadconnectorhq.com/hooks/SuOTFAexav5kBEKVFFst/webhook-trigger/IuYTKRe2MHqpU3qHc2v8";

const json = (status: number, body: Record<string, unknown>) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });

/* Best-effort per-IP limit (per server instance): 10 leads per 10 minutes. */
const recent = new Map<string, number[]>();

const text = (input: Record<string, unknown>, key: string, max: number) => {
  const v = input[key];
  return typeof v === "string" ? v.trim().slice(0, max) : "";
};

export function GET() {
  return json(405, { ok: false, error: "Method not allowed." });
}

export async function POST(req: Request) {
  // Same-site posts only.
  const origin = req.headers.get("origin");
  const host = (req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "").replace(/:\d+$/, "").toLowerCase();
  if (origin) {
    let originHost = "";
    try {
      originHost = new URL(origin).hostname.toLowerCase();
    } catch {
      /* invalid origin */
    }
    if (originHost !== host) return json(403, { ok: false, error: "Forbidden." });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 600_000);
  hits.push(now);
  recent.set(ip, hits);
  if (hits.length > 10) return json(429, { ok: false, error: "Too many requests. Please call us instead." });

  let input: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > 64 * 1024) return json(400, { ok: false, error: "Invalid request." });
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return json(400, { ok: false, error: "Invalid request." });
    input = parsed as Record<string, unknown>;
  } catch {
    return json(400, { ok: false, error: "Invalid request." });
  }

  const lead = {
    name: text(input, "name", 120),
    phone: text(input, "phone", 40),
    email: text(input, "email", 200),
    zip: text(input, "zip", 10),
    address: text(input, "address", 240),
    property: text(input, "property", 40),
    market: text(input, "market", 40),
    roofing: text(input, "roofing", 20),
    service: text(input, "service", 80),
    message: text(input, "message", 3000),
  };

  const errors: Record<string, string> = {};
  if (lead.name.length < 2) errors.name = "Please enter your name.";
  if (lead.phone.replace(/\D/g, "").length < 10) errors.phone = "Please enter a phone number with area code.";
  // Close to PHP's FILTER_VALIDATE_EMAIL: ASCII, no "..", no dot next to "@", no trailing dot.
  if (!/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/.test(lead.email))
    errors.email = "Please enter a valid email address.";
  if (!/^\d{5}(-\d{4})?$/.test(lead.zip)) errors.zip = "Please enter a 5-digit ZIP code.";
  if (!(serviceOptions as readonly string[]).includes(lead.service)) errors.service = "Please choose a service.";
  if (lead.property && !(propertyOptions as readonly string[]).includes(lead.property)) lead.property = "";
  const isSolar = lead.service === SOLAR_SERVICE;
  if (isSolar && !(solarMarkets as readonly string[]).includes(lead.market)) errors.market = "Please choose Maryland or Washington, DC.";
  if (!isSolar) {
    lead.market = "";
    lead.roofing = "";
  }
  if (!(roofingNeedOptions as readonly string[]).includes(lead.roofing)) lead.roofing = "";
  if (input.consent !== true) errors.consent = "Please agree so we can contact you.";
  if (Object.keys(errors).length) return json(422, { ok: false, error: "Please check the form.", fields: errors });

  // Spam: drop only when both signals agree; one signal alone is delivered with a "suspected-spam" tag.
  const trapFilled = text(input, "hp_pr", 200) !== "";
  const elapsed = typeof input.elapsed_ms === "number" && Number.isInteger(input.elapsed_ms) ? input.elapsed_ms : null;
  const tooFast = elapsed !== null && elapsed < MIN_FILL_MS;
  if (trapFilled && tooFast) return json(200, { ok: true });
  const spamCheck = trapFilled ? "suspect: hidden field filled" : tooFast ? `suspect: sent in ${elapsed} ms` : "ok";

  const webhook = (process.env.GHL_WEBHOOK_URL ?? "").trim() || DEFAULT_WEBHOOK;
  if (!webhook.startsWith("https://")) {
    console.error("[lead] GHL webhook URL is not https: lead accepted but NOT sent.");
    return json(200, { ok: true, delivered: false });
  }

  // E.164 for US numbers.
  const digits = lead.phone.replace(/\D/g, "");
  const phone = digits.length === 10 ? `+1${digits}` : digits.length === 11 && digits[0] === "1" ? `+${digits}` : `${lead.phone.startsWith("+") ? "+" : ""}${digits}`;
  const parts = lead.name.split(/\s+/);
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const tags = ["website-lead", `service-${slug(lead.service)}`];
  if (isSolar && lead.market) tags.push(`solar-${slug(lead.market)}`);
  if (lead.roofing === "Yes") tags.push("needs-roofing");
  if (spamCheck !== "ok") tags.push("suspected-spam");
  // Leads sent from a Vercel preview (staging) link, so test submissions are easy to spot in GoHighLevel.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") tags.push("website-preview-test");

  const payload: Record<string, unknown> = {
    source: "Website form",
    submitted_at: new Date().toISOString().replace(/\.\d{3}Z$/, "+00:00"),
    name: lead.name,
    first_name: parts[0],
    last_name: parts.slice(1).join(" "),
    email: lead.email,
    phone,
    phone_raw: lead.phone,
    address: lead.address,
    postal_code: lead.zip,
    property_type: lead.property,
    service_needed: lead.service,
    solar_market: lead.market,
    needs_roofing_work: lead.roofing,
    consent: true,
    message: lead.message,
    tags,
    spam_check: spamCheck,
  };
  for (const key of ["page_url", "landing_page", "referrer", ...attributionKeys]) payload[key] = text(input, key, 1000);

  // One retry for rate limits, server errors and network failures.
  const body = JSON.stringify(payload);
  for (let attempt = 0; attempt < 2; attempt++) {
    let status = 0;
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body,
        signal: AbortSignal.timeout(8000),
      });
      status = res.status;
      if (res.ok) return json(200, { ok: true, delivered: true });
      console.error(`[lead] GoHighLevel webhook answered ${status}: ${(await res.text()).slice(0, 300)}`);
    } catch (error) {
      console.error("[lead] GoHighLevel webhook failed:", error instanceof Error ? error.message : error);
    }
    if (status !== 0 && status !== 429 && status < 500) break;
    await new Promise((r) => setTimeout(r, 600));
  }
  return json(502, { ok: false, error: "We could not send your request. Please call us instead." });
}
