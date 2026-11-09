import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { render } from "./template.mjs";
import { toDoc } from "./seed.mjs";
import handler, { validate } from "../api/lead.js";

const c = JSON.parse(readFileSync(new URL("../content/start.json", import.meta.url)));
const html = render(c, { ttrKey: "k" });
for (const bad of ["lifetime warranty", "Lifetime Warranty", "Most Trusted", "30+", "We Match Them", "licensed and fully insured", "Our Gift", "best in the industry"])
  assert.ok(!html.includes(bad), `held claim rendered: ${bad}`);
assert.ok(html.includes("noindex"), "noindex");
assert.ok(html.includes("GTM-5PZ4LZFZ") && html.includes("m0q1pcc9q4") && html.includes("clixtell"));
assert.ok(html.includes("data-phone") && html.includes("Free, No-Obligation Estimate"));
assert.ok(render(c, { ttrKey: "k", allowHeld: true }).includes("Lifetime Warranty"));

const d = toDoc(c);
assert.equal(d._id, "landingPage-start"); assert.equal(d.slug.current, "start");
assert.ok(!JSON.stringify(d).includes("Original") && d.steps[0]._key);

const ok = { first_name: "A", last_name: "B", phone: "(301) 555-0100", email: "a@b.co", address: "1 Main", postal_code: "20901", service: "Repair", comments: "x", consent: true };
assert.deepEqual(validate(ok).errors, []);
assert.deepEqual(validate({ ...ok, email: "no", consent: false, postal_code: "1" }).errors.sort(), ["consent", "email", "postal_code"]);

// handler: delivery to both destinations, success if one works
process.env.GHL_WEBHOOK_URL = "https://ghl.invalid/hook";
const calls = []; globalThis.fetch = async (u, o) => { calls.push([u, JSON.parse(o.body)]); return { ok: !u.includes("ttr-portal") }; };
const res = () => { const r = { h: {} }; r.setHeader = () => {}; r.status = (s) => { r.s = s; return r; }; r.json = (b) => { r.b = b; return r; }; return r; };
let r = res(); await handler({ method: "POST", body: ok }, r);
assert.equal(r.s, 200); assert.equal(calls.length, 2);
assert.ok(calls[0][0].endsWith("/api/site/form") && calls[0][1].key);
r = res(); await handler({ method: "POST", body: { ...ok, website: "spam" } }, r); assert.equal(calls.length, 2, "honeypot sends nothing");
r = res(); await handler({ method: "GET" }, r); assert.equal(r.s, 405);
console.log("all tests passed");
