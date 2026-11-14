import { type NextRequest, NextResponse } from "next/server";
import { MIN_FILL_MS, propertyOptions, serviceOptions } from "@/lib/lead-options";

/*
 * Estimate form handler (replaces public/api/lead.php). Same checks and the
 * same payload for GoHighLevel. The address stays at /api/lead.php so the
 * form and old links keep working.
 *
 * Webhook: LEAD_WEBHOOK_URL (Vercel env var, Production scope only). Never
 * in code. Previews accept the form but never send a lead.
 */

const json = (status: number, body: Record<string, unknown>) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });

const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Best-effort per-IP limit, 10 leads per 10 minutes (per server instance).
const hits = new Map<string, number[]>();

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const host = (req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "").toLowerCase().replace(/:\d+$/, "");
  if (origin) {
    let originHost = "";
    try {
      originHost = new URL(origin).hostname.toLowerCase();
    } catch {}
    if (originHost !== host) return json(403, { ok: false, error: "Forbidden." });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 600_000);
  recent.push(now);
  hits.set(ip, recent);
  if (recent.length > 10) return json(429, { ok: false, error: "Too many requests. Please call us instead." });

  const raw = await req.text();
  if (raw.length > 64 * 1024) return json(400, { ok: false, error: "Invalid request." });
  let input: Record<string, unknown>;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    input = parsed;
  } catch {
    return json(400, { ok: false, error: "Invalid request." });
  }

  const lead = {
    name: text(input.name, 120),
    phone: text(input.phone, 40),
    email: text(input.email, 200),
    zip: text(input.zip, 10),
    address: text(input.address, 240),
    property: text(input.property, 40),
    service: text(input.service, 80),
    message: text(input.message, 3000),
  };

  const errors: Record<string, string> = {};
  if (lead.name.length < 2) errors.name = "Please enter your name.";
  if (lead.phone.replace(/\D/g, "").length < 10) errors.phone = "Please enter a phone number with area code.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) errors.email = "Please enter a valid email address.";
  if (!/^\d{5}(-\d{4})?$/.test(lead.zip)) errors.zip = "Please enter a 5-digit ZIP code.";
  if (!(serviceOptions as readonly string[]).includes(lead.service)) errors.service = "Please choose a service.";
  if (lead.property !== "" && !(propertyOptions as readonly string[]).includes(lead.property)) lead.property = "";
  if (input.consent !== true) errors.consent = "Please agree so we can contact you.";
  if (Object.keys(errors).length) return json(422, { ok: false, error: "Please check the form.", fields: errors });

  // Spam: drop only when both signals agree; one alone is delivered with a tag.
  const trapFilled = text(input.hp_pr, 200) !== "";
  const elapsed = typeof input.elapsed_ms === "number" && Number.isInteger(input.elapsed_ms) ? input.elapsed_ms : null;
  const tooFast = elapsed !== null && elapsed < MIN_FILL_MS;
  if (trapFilled && tooFast) return json(200, { ok: true });
  const spamCheck = trapFilled ? "suspect: hidden field filled" : tooFast ? `suspect: sent in ${elapsed} ms` : "ok";

  const webhook = (process.env.LEAD_WEBHOOK_URL ?? "").trim().replace(/^["']|["']$/g, "");
  if (process.env.VERCEL_ENV === "preview" || !webhook.startsWith("https://")) {
    if (process.env.VERCEL_ENV !== "preview") console.error("[lead] LEAD_WEBHOOK_URL missing or not https: lead accepted but NOT sent.");
    return json(200, { ok: true, delivered: false });
  }

  const digits = lead.phone.replace(/\D/g, "");
  const phone = digits.length === 10 ? `+1${digits}` : digits.length === 11 && digits[0] === "1" ? `+${digits}` : (lead.phone.startsWith("+") ? "+" : "") + digits;
  const parts = lead.name.split(/\s+/);
  const slug = lead.service.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const tags = ["website-lead", `service-${slug}`, ...(spamCheck !== "ok" ? ["suspected-spam"] : [])];

  const payload: Record<string, unknown> = {
    source: "Website form",
    submitted_at: new Date().toISOString(),
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
    consent: true,
    message: lead.message,
    tags,
    spam_check: spamCheck,
  };
  for (const key of ["page_url", "landing_page", "referrer", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"]) {
    payload[key] = text(input[key], 1000);
  }

  // One retry for rate limits, server errors and network failures.
  for (let attempt = 0; attempt < 2; attempt++) {
    let status = 0;
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      });
      status = res.status;
      if (res.ok) return json(200, { ok: true, delivered: true });
      console.error(`[lead] GoHighLevel webhook answered ${status}`);
    } catch (error) {
      console.error("[lead] GoHighLevel webhook failed", error);
    }
    if (status !== 0 && status !== 429 && status < 500) break;
    await new Promise((r) => setTimeout(r, 600));
  }
  return json(502, { ok: false, error: "We could not send your request. Please call us instead." });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405, headers: { Allow: "POST" } });
}
