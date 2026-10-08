# Pineda's Roofing website

Next.js 16 (App Router) + Sanity Studio embedded at `/cms`, Tailwind CSS v4, hosted on Vercel. Built by TTR Digital Marketing.

- **Design:** black, white and light grey with cyan accents (no navy). Every page is built from "feature sections": photo, heading, a short lead, short paragraphs and highlight boxes, never long paragraphs or bullet lists.
- **Content:** everything is editable in `/cms`. Until Sanity is connected (or a field is left empty), the site shows the built-in content from `lib/data`, so it never breaks.
- **Leads:** the estimate form posts to `/api/lead`, which delivers to GoHighLevel (webhook and/or API).

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

1. **Sanity project:** `5emjihiz`, dataset `production` (already created; it is the default in `sanity/env.ts`, so no env var is needed).
2. **CORS (done):** `http://localhost:3000`, `https://www.pinedasroofing.com` and `https://pinedasroofing.com` are allowed with credentials. Once the Vercel project exists, add its preview URL too (sanity.io/manage > API > CORS origins).
3. **Local env:** copy `.env.example` to `.env.local` (the defaults already point at `5emjihiz`).
4. **Load the content into Sanity (once):** create an Editor token (sanity.io/manage > API > Tokens) and put it in `.env.local` as `SANITY_WRITE_TOKEN`, then:
   ```bash
   npm install
   npm run seed            # creates every page, service, area, review, FAQ and uploads the photos
   ```
   Running it again only adds missing documents. `npm run seed -- --force` overwrites the CMS with the built-in content, and `npm run seed -- --dry-run` checks everything without writing.
5. **Run:** `npm run dev`, then open http://localhost:3000 and http://localhost:3000/cms.
6. **Vercel:** import the repo, add the env vars from `.env.example` (not `SANITY_WRITE_TOKEN`), deploy, add the domain.
7. **Publish webhook:** in Sanity, go to API > Webhooks and add `https://www.pinedasroofing.com/api/revalidate`, triggers create/update/delete, projection `{_type, slug}`, and the same secret as `SANITY_REVALIDATE_SECRET`. Published changes then show on the site within seconds (otherwise within 5 minutes).
8. **GoHighLevel:** set `GHL_WEBHOOK_URL` (and optionally `GHL_LOCATION_ID` + `GHL_API_KEY`). For the website chat, set `NEXT_PUBLIC_GHL_CHAT_WIDGET_ID`.

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
- `lib/content.ts`: GROQ queries plus the merge over fallbacks.
- `components/sections/FeatureSection.tsx`: the main building block.
- `sanity/schemaTypes`: CMS schema.
