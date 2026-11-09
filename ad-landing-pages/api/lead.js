// Vercel Function: receives the landing-page form and forwards each lead to
//   1. TTR OS            POST {TTR_OS_URL}/api/site/form   (site key for pinedas-roofing)
//   2. GoHighLevel       POST process.env.GHL_WEBHOOK_URL  (env var only, never in code)
// The visitor gets success if at least one destination accepted the lead.

const TTR_OS_URL = (process.env.TTR_OS_URL || "https://ttr-portal.vercel.app").replace(/\/$/, "");
const TTR_SITE_KEY = process.env.TTR_SITE_KEY || "O83UlUC9rgPzFghnkUy3Tg"; // public site key

const clean = (v, max = 2000) => String(v ?? "").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").trim().slice(0, max);

export function validate(b) {
  const lead = {
    first_name: clean(b.first_name, 80),
    last_name: clean(b.last_name, 80),
    email: clean(b.email, 200),
    phone: clean(b.phone, 40),
    address: clean(b.address, 200),
    postal_code: clean(b.postal_code, 12),
    service: clean(b.service, 80),
    comments: clean(b.comments, 3000),
    page_url: clean(b.page_url, 500),
    referrer: clean(b.referrer, 500),
    utm: Object.fromEntries(Object.entries(b.utm && typeof b.utm === "object" ? b.utm : {}).slice(0, 12).map(([k, v]) => [clean(k, 40), clean(v, 200)])),
    tracking_number: clean(b.tracking_number, 20),
    consent: b.consent === true || b.consent === "true" || b.consent === "on",
  };
  const errors = [];
  if (!lead.first_name) errors.push("first_name");
  if (!lead.last_name) errors.push("last_name");
  if (lead.phone.replace(/\D/g, "").length < 10) errors.push("phone");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) errors.push("email");
  if (!lead.address) errors.push("address");
  if (!/^\d{5}(-\d{4})?$/.test(lead.postal_code)) errors.push("postal_code");
  if (!lead.service) errors.push("service");
  if (!lead.comments) errors.push("comments");
  if (!lead.consent) errors.push("consent");
  return { lead, errors };
}

async function post(url, body, headers = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "method" });
  const b = typeof req.body === "string" ? safeJson(req.body) : req.body || {};
  if (clean(b.website)) return res.status(200).json({ ok: true }); // honeypot: pretend success
  const { lead, errors } = validate(b);
  if (errors.length) return res.status(400).json({ ok: false, error: "invalid", fields: errors });

  const message = [`Service: ${lead.service}`, `Address: ${lead.address} ${lead.postal_code}`, lead.comments].join("\n");
  const ttr = {
    key: TTR_SITE_KEY,
    form: "start-landing-page",
    name: `${lead.first_name} ${lead.last_name}`.trim(),
    first_name: lead.first_name,
    last_name: lead.last_name,
    email: lead.email,
    phone: lead.phone,
    message,
    service: lead.service,
    address: lead.address,
    postal_code: lead.postal_code,
    consent: true,
    page_url: lead.page_url,
    referrer: lead.referrer,
    utm: lead.utm,
    tracking_number: lead.tracking_number,
  };
  const ghl = { ...lead, name: ttr.name, source: "start.pinedasroofing.com", submitted_at: new Date().toISOString() };

  const jobs = [post(`${TTR_OS_URL}/api/site/form`, ttr, { "x-site-key": TTR_SITE_KEY })];
  const hook = process.env.GHL_WEBHOOK_URL;
  if (hook) jobs.push(post(hook, ghl));
  const results = await Promise.allSettled(jobs);
  const names = ["ttr-os", "ghl"];
  results.forEach((r, i) => { if (r.status === "rejected") console.error(`lead delivery failed: ${names[i]}: ${r.reason?.message}`); });
  if (!hook) console.warn("GHL_WEBHOOK_URL not set; skipping GHL");
  if (results.some((r) => r.status === "fulfilled")) return res.status(200).json({ ok: true });
  return res.status(502).json({ ok: false, error: "delivery" });
}

function safeJson(s) { try { return JSON.parse(s); } catch { return {}; } }
