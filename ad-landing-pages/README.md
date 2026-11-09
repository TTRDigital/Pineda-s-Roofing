# Pineda's ad landing pages (static, separate from the Next.js site)

Replaces the GoHighLevel funnel page `start.pinedasroofing.com`. Own Vercel project, root directory `ad-landing-pages`.

- `content/start.json` static content (fallback). Live content: `landingPage` doc `landingPage-start` in Pineda's own Sanity project (5emjihiz / production), read at build time with the public CDN; any Sanity field overrides the fallback.
- `node scripts/build.mjs` builds `public/start/index.html`. `npm test` runs the checks.
- `node scripts/seed.mjs` is a dry run. `--apply` (with `SANITY_WRITE_TOKEN` in the env) creates the doc only if missing (createIfNotExists, never overwrites). `sanity/landingPage.js` is the schema, not yet registered in the Studio (main-site code was out of scope).
- `api/lead.js` Vercel Function: sends each lead to TTR OS (`POST $TTR_OS_URL/api/site/form`, default https://ttr-portal.vercel.app, public site key for pinedas-roofing) and to GHL (`GHL_WEBHOOK_URL` env var, required for GHL delivery; skipped with a log line if unset). Success if either accepts.
- `public/number.js` swaps every `[data-phone]` number: `TTRNumber.set("+1301...")`, `window.TTR_TRACKING_NUMBER`, or `?tn=` for QA. Twilio's script only needs to call one of those.
- `vercel.json`: `X-Robots-Tag: noindex` on everything, meta noindex, robots.txt, host rewrite `start.pinedasroofing.com` `/` -> `/start/index.html`.

## Tags carried over from the old page
GTM `GTM-5PZ4LZFZ` (head + noscript), Microsoft Clarity `m0q1pcc9q4`, Clixtell (`scripts.clixtell.com/track.js`). Not carried: GHL `number_pool.js` and `user_session.js` (GHL call tracking, replaced by number.js). New: a `generate_lead` dataLayer event on successful submit (needs a GTM trigger). Clixtell also rewrites numbers: check it does not fight number.js.

## Claims held back (not rendered; Roberto to confirm). Set `held: false` in Sanity, or build with `ALLOW_HELD_CLAIMS=1`, to release
1. "30+ Years" in the headline, "over 30 years" (Why Choose, Step 2 "over three decades"). Headline now ends at "Roofing Excellence".
2. "Maryland's Most Trusted" (now "Maryland's Family-Owned Roofing Company"; family-owned itself still needs Roberto's OK).
3. "We Stand by Our Roofs for a Lifetime" and every "Lifetime Warranty" (hero, Step 3, Why Choose), "guarantee your full satisfaction, indefinitely". Warranty terms need to be stated by Roberto.
4. "Gutters Included - Our Gift to You".
5. "Unbeatable Prices - We Match Them All!" (price match).
6. "Unrivaled Expertise ... can't be matched".
7. FAQ "Are you licensed and insured?" (licensed and fully insured). Not shown: bonded, never-subcontractors (not on the old page, not added).
8. Step 2 "Atlas Pinnacle Pristine shingles - the best in the industry" (the brand name stays, the superlative is gone).
9. Cost FAQ: "competitive pricing without compromising on quality" removed.
Kept as-is, still to confirm: the 3 Google review quotes and names (permission/authenticity), "free, no-obligation estimate", the "few days to a week" install time, "family-owned".
Changed text: Step 3 title "Lifetime Warranty & Satisfaction" -> "Final Inspection". The old "We Let Our Work Speak" gallery rendered empty on the old page; it now shows the 3 unused photos from the old page's media.

## Notes
- Hero video was 24 MB / 24 s; shortened to 12 s / 2 MB (poster for slow connections and reduced motion).
- TTR OS payload fields (`key`, `name`, `email`, `phone`, `message`, ...) are my best guess at `/api/site/form`: confirm against the endpoint.
