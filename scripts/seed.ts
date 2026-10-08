/**
 * Loads the built-in content (lib/data) and its photos into Sanity, so the
 * CMS starts full instead of empty.
 *
 *   SANITY_WRITE_TOKEN=... npm run seed            # create documents that don't exist yet
 *   SANITY_WRITE_TOKEN=... npm run seed -- --force # overwrite everything with the built-in content
 *   npm run seed -- --dry-run                      # build every document without uploading or writing
 *
 * Reads NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET from the
 * environment or .env.local. The token needs Editor rights (sanity.io/manage
 * > API > Tokens). Without --force, anything an editor already changed is kept.
 */
import { createReadStream, existsSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { createClient } from "@sanity/client";
import type { Card, FeatureBlock, Img, Partner } from "../lib/types";
import { fallbackFaqs, fallbackPartners, fallbackProjects, fallbackSettings, fallbackTestimonials } from "../lib/data/site.ts";
import { fallbackAbout, fallbackAtlas, fallbackHome, fallbackInsurance, fallbackRoofing } from "../lib/data/pages.ts";
import { fallbackServices } from "../lib/data/services.ts";
import { fallbackLocations } from "../lib/data/locations.ts";
import { localLogos } from "../lib/data/logos.ts";

const root = new URL("..", import.meta.url).pathname;

// Minimal .env.local reader so the script works without extra packages.
if (existsSync(join(root, ".env.local"))) {
  for (const line of readFileSync(join(root, ".env.local"), "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;
const force = process.argv.includes("--force");
const dryRun = process.argv.includes("--dry-run");

if (!dryRun && (!projectId || !token)) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN (in .env.local or the environment).");
  process.exit(1);
}

const client = createClient({ projectId: projectId || "dry-run", dataset, token, apiVersion: "2025-02-19", useCdn: false });

/* ---------- helpers ---------- */

let keyN = 0;
const key = () => `k${(keyN++).toString(36)}`;
const uploaded = new Map<string, string>();

async function asset(src: string) {
  if (uploaded.has(src)) return uploaded.get(src)!;
  const file = join(root, "public", src);
  if (dryRun) {
    if (!existsSync(file)) throw new Error(`Missing image file: ${file}`);
    uploaded.set(src, `image-dry-${uploaded.size}`);
    return uploaded.get(src)!;
  }
  const doc = await client.assets.upload("image", createReadStream(file), { filename: basename(file) });
  uploaded.set(src, doc._id);
  process.stdout.write(".");
  return doc._id;
}

async function altImage(img?: Img) {
  if (!img) return undefined;
  return { _type: "altImage", alt: img.alt, asset: { _type: "reference", _ref: await asset(img.src) } };
}

async function plainImage(img?: Img) {
  if (!img) return undefined;
  return { _type: "image", asset: { _type: "reference", _ref: await asset(img.src) } };
}

const cards = (list: Card[]) => list.map((c) => ({ _type: "card", _key: key(), ...c }));
const faqItems = (list: { question: string; answer: string }[]) => list.map((f) => ({ _type: "faqItem", _key: key(), question: f.question, answer: f.answer }));

async function feature(b: FeatureBlock) {
  const { anchor, image, ctas, ...rest } = b;
  return {
    _type: "featureSection",
    _key: key(),
    ...rest,
    ...(anchor ? { anchor: { _type: "slug", current: anchor } } : {}),
    image: await altImage(image),
    ctas: ctas?.map((c) => ({ _type: "cta", _key: key(), ...c })),
  };
}
const features = (list: FeatureBlock[]) => Promise.all(list.map(feature));

async function partnerList(list: Partner[]) {
  return Promise.all(
    list.map(async (p) => ({ _type: "partner", _key: key(), name: p.name, url: p.url, logo: await plainImage(localLogos[p.name.toLowerCase()]) })),
  );
}

async function hero(h: { eyebrow?: string; heading: string; text?: string; image?: Img }) {
  return { _type: "pageHero", eyebrow: h.eyebrow, heading: h.heading, text: h.text, image: await altImage(h.image) };
}

const seo = (s: { title: string; description: string }) => ({ _type: "seo", title: s.title, description: s.description });

/* ---------- documents ---------- */

async function build() {
  const docs: Record<string, unknown>[] = [];
  const s = fallbackSettings;

  docs.push({
    _id: "siteSettings",
    _type: "siteSettings",
    name: s.name,
    legalName: s.legalName,
    phone: s.phone,
    email: s.email,
    license: s.license,
    street: s.street,
    city: s.city,
    region: s.region,
    postalCode: s.postalCode,
    hours: s.hours.map((h) => ({ _type: "fact", _key: key(), ...h })),
    emergencyText: s.emergencyText,
    foundedYear: s.foundedYear,
    googleRating: s.googleRating,
    reviewCount: s.reviewCount,
    reviewsUrl: s.reviewsUrl,
    mapsUrl: s.mapsUrl,
    social: s.social.map((x) => ({ _type: "socialLink", _key: key(), ...x })),
    headerCta: { _type: "cta", ...s.headerCta },
  });

  const p = fallbackPartners;
  docs.push({
    _id: "partners",
    _type: "partners",
    brandsHeading: p.brandsHeading,
    brandsText: p.brandsText,
    brands: await partnerList(p.brands),
    insuranceHeading: p.insuranceHeading,
    insuranceText: p.insuranceText,
    insurers: await partnerList(p.insurers),
  });

  const h = fallbackHome;
  docs.push({
    _id: "homePage",
    _type: "homePage",
    hero: { eyebrow: h.hero.eyebrow, heading: h.hero.heading, text: h.hero.text, badges: h.hero.badges, image: await altImage(h.hero.image) },
    stats: h.stats.map((x) => ({ _type: "stat", _key: key(), ...x })),
    servicesIntro: h.servicesIntro,
    serviceCards: cards(h.serviceCards),
    sections: await features(h.sections),
    anatomyIntro: h.anatomyIntro,
    anatomy: cards(h.anatomy),
    whyIntro: h.whyIntro,
    why: cards(h.why),
    processIntro: h.processIntro,
    process: cards(h.process),
    faqIntro: h.faqIntro,
    seo: seo(h.seo),
  });

  const r = fallbackRoofing;
  docs.push({ _id: "roofingPage", _type: "roofingPage", hero: await hero(r.hero), sections: await features(r.sections), faqs: faqItems(r.faqs), seo: seo(r.seo) });

  const a = fallbackAtlas;
  docs.push({
    _id: "atlasPage",
    _type: "atlasPage",
    hero: await hero(a.hero),
    sections: await features(a.sections),
    productsIntro: a.productsIntro,
    products: await Promise.all(a.products.map(async (x) => ({ _type: "atlasProduct", _key: key(), ...x, image: await altImage(x.image) }))),
    warrantyIntro: a.warrantyIntro,
    warranties: cards(a.warranties),
    faqs: faqItems(a.faqs),
    seo: seo(a.seo),
  });

  const i = fallbackInsurance;
  docs.push({
    _id: "insurancePage",
    _type: "insurancePage",
    hero: await hero(i.hero),
    sections: await features(i.sections),
    stepsIntro: i.stepsIntro,
    steps: cards(i.steps),
    signsIntro: i.signsIntro,
    signs: cards(i.signs),
    faqs: faqItems(i.faqs),
    seo: seo(i.seo),
  });

  const ab = fallbackAbout;
  docs.push({
    _id: "aboutPage",
    _type: "aboutPage",
    hero: await hero(ab.hero),
    facts: ab.facts.map((f) => ({ _type: "fact", _key: key(), ...f })),
    sections: await features(ab.sections),
    valuesIntro: ab.valuesIntro,
    values: cards(ab.values),
    seo: seo(ab.seo),
  });

  for (const sv of fallbackServices) {
    docs.push({
      _id: `service-${sv.slug}`,
      _type: "service",
      title: sv.title,
      slug: { _type: "slug", current: sv.slug },
      category: sv.category,
      icon: sv.icon,
      summary: sv.summary,
      order: sv.order,
      hero: await hero(sv.hero),
      sections: await features(sv.sections),
      faqs: faqItems(sv.faqs),
      seo: seo(sv.seo),
    });
  }

  fallbackLocations.forEach((l, n) => {
    docs.push({
      _id: `location-${l.slug}`,
      _type: "location",
      name: l.name,
      slug: { _type: "slug", current: l.slug },
      county: l.county,
      state: l.state,
      featured: l.featured,
      lead: l.lead,
      paragraphs: l.paragraphs,
      highlights: l.highlights,
      neighborhoods: l.neighborhoods,
      order: n + 1,
      ...(l.seo ? { seo: seo(l.seo) } : {}),
    });
  });

  for (const pr of fallbackProjects) {
    docs.push({
      _id: `project-${pr.id}`,
      _type: "project",
      title: pr.title,
      location: pr.location,
      category: pr.category,
      summary: pr.summary,
      featured: !!pr.featured,
      before: await altImage(pr.before),
      after: await altImage(pr.after),
      images: await Promise.all(pr.images.map(async (img) => ({ ...(await altImage(img)), _key: key() }))),
    });
  }

  fallbackTestimonials.forEach((t, n) => docs.push({ _id: `testimonial-${n + 1}`, _type: "testimonial", ...t }));
  fallbackFaqs.forEach((f, n) => docs.push({ _id: `faq-${n + 1}`, _type: "faq", ...f, onHome: n < 8, order: n + 1 }));

  return docs;
}

const clean = (v: unknown): unknown =>
  Array.isArray(v) ? v.map(clean) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).filter(([, x]) => x !== undefined).map(([k, x]) => [k, clean(x)])) : v;

console.log(`Seeding ${projectId}/${dataset}${force ? " (overwriting)" : " (keeping existing documents)"}. Uploading photos`);
const docs = (await build()).map((d) => clean(d) as { _id: string; _type: string });
console.log(`\n${uploaded.size} photos uploaded. Writing ${docs.length} documents…`);
if (dryRun) {
  const counts = docs.reduce<Record<string, number>>((a, d) => ((a[d._type] = (a[d._type] ?? 0) + 1), a), {});
  console.log("Dry run, nothing written:", counts);
  process.exit(0);
}

const tx = client.transaction();
for (const d of docs) {
  if (force) tx.createOrReplace(d);
  else tx.createIfNotExists(d);
}
await tx.commit();
console.log("Done. Open /cms to see the content.");
