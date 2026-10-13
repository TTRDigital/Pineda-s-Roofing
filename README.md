# Pineda's Roofing website

Next.js 16 (App Router, static export) + Sanity Studio embedded at `/cms`, Tailwind CSS v4, hosted on **SiteGround** as plain files. Built by TTR Digital Marketing.

- **Design:** black, white and light grey with cyan accents (no navy). Every page is built from "feature sections": photo, heading, a short lead, short paragraphs and highlight boxes, never long paragraphs or bullet lists.
- **Content:** everything is editable in `/cms`. Until Sanity is connected (or a field is left empty), the site shows the built-in content from `lib/data`, so it never breaks.
- **Leads:** the estimate form posts to `/api/lead.php` (PHP on SiteGround), which delivers to the GoHighLevel inbound webhook.

## Pages

| URL | What |
|---|---|
| `/` | Home: hero, brands strip, who we are, services, residential/commercial tiles, roof system diagram, why us, process, gallery, reviews, insurance logos, service area, FAQ, estimate form |
| `/services/roofing` | Roofing hub: **Residential** and **Commercial** sections, repairs, storm, **brands we install**, Atlas, insurance logos |
| `/services/[slug]` | 13 service pages (residential, commercial, replacement, repair, emergency, maintenance, storm, gutters, siding, windows, chimneys, masonry, hardscaping) |
| `/services` | All services |
| `/atlas-roofing` | Atlas shingles, system, product lines, warranty |
| `/roofing-insurance` | Insurance claims: process, carriers, storm damage signs |
| `/gallery` | Filterable project gallery with lightbox and before/after sliders |
| `/about-us`, `/faq`, `/contact-us`, `/thank-you`, `/privacy`, `/terms` | |
| `/service-area`, `/service-area/[slug]` | Counties and city pages |
| `/cms` | Sanity Studio |

The URLs match the old WordPress site, so existing Google rankings carry over. A few changed paths redirect in `redirects.ts`.

## Setup

1. **Sanity project:** `5emjihiz`, dataset `production` (the default in `sanity/env.ts`, so no env var is needed). CORS already allows `http://localhost:3000`, `https://www.pinedasroofing.com` and `https://pinedasroofing.com`.
2. **Local env:** copy `.env.example` to `.env.local`.
3. **Load the content into Sanity (once):** create an Editor token (sanity.io/manage > API > Tokens), put it in `.env.local` as `SANITY_WRITE_TOKEN`, then `npm install && npm run seed`. Running it again only adds missing documents; `-- --force` overwrites the CMS with the built-in content, `-- --dry-run` checks without writing.
4. **Run:** `npm run dev`, then open http://localhost:3000 and http://localhost:3000/cms.

## Hosting on SiteGround

`npm run build` writes the whole site to `out/` as plain files: HTML pages, `_next/` scripts, `_img/` WebP photos, `api/lead.php` (the form) and `.htaccess` (redirects, security headers, caching). Upload the **contents** of `out/` into the site's `public_html`.

Automatic deploys (`.github/workflows/deploy-siteground.yml`) build and upload over FTPS on every push, when Sanity publishes, and from Actions > "Deploy to SiteGround" > Run workflow. Only changed files are uploaded. Repository secrets:

| Secret | Value |
|---|---|
| `SG_FTP_SERVER` | FTP host (Site Tools > Site > FTP Accounts > Manage > FTP credentials) |
| `SG_FTP_USERNAME` / `SG_FTP_PASSWORD` | an FTP account whose folder is `pinedasroofing.com/public_html` |
| `GHL_WEBHOOK_URL` | GoHighLevel inbound webhook for the estimate form |

The workflow writes `api/lead-config.php` (the webhook URL; never served, see `.htaccess`). For a manual upload, create it yourself: `<?php return ['webhook_url' => 'https://services.leadconnectorhq.com/hooks/...'];`.

**Publish → live:** in sanity.io/manage > API > Webhooks, add a webhook: URL `https://api.github.com/repos/TTRDigital/pineda-s-roofing/dispatches`, method POST, triggers create/update/delete, filter none, projection `{"event_type": "sanity-publish"}`, HTTP headers `Authorization: Bearer <GitHub fine-grained token with Contents: read and write on this repo>` and `Accept: application/vnd.github+json`. Each publish then rebuilds and uploads the site (about 3 minutes).

In SiteGround, also turn on Site Tools > Security > SSL Manager (Let's Encrypt) and HTTPS Enforce. `.htaccess` sends `pinedasroofing.com` to `https://www.pinedasroofing.com`.

GoHighLevel chat: the widget ID is in `lib/chat.ts` (`NEXT_PUBLIC_GHL_CHAT_WIDGET_ID` overrides it at build time; `off` hides the chat). Google Analytics / Tag Manager: `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GTM_ID` at build time.

## Editing in /cms

- **Settings > Site settings:** phone, email, address, hours, license, Google rating, social links, header button.
- **Settings > Brands & insurance logos:** upload each brand's and insurer's logo (transparent PNG or SVG). Without a logo, the name shows as text.
- **Pages:** Home, Roofing, Atlas, Insurance claims, About.
- **Services / Service areas / Gallery / Reviews / FAQs:** collections. In Gallery, add a **Before** and **After** photo to get a drag slider.

Keep paragraphs to 1 to 3 sentences and put key points in **highlight boxes**. That is the format the client asked for.

## Development

```bash
npm run dev        # local site
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run build      # production build
```

- `lib/data/*`: built-in content (fallbacks and seed source). `lib/data/images.ts` lists every local photo with its alt text.
- `lib/content.ts`: GROQ queries plus the merge over fallbacks (fetched at build time).
- `public/.htaccess`, `public/api/lead.php`: the SiteGround side (redirects, headers, form).
- `components/sections/FeatureSection.tsx`: the main building block.
- `sanity/schemaTypes`: CMS schema.
