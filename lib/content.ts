import "server-only";
import { cache } from "react";
import { sanityFetch } from "@/lib/sanity/fetch";
import { merge } from "@/lib/merge";
import { fallbackFaqs, fallbackPartners, fallbackProjects, fallbackSettings, fallbackTestimonials } from "@/lib/data/site";
import { fallbackAbout, fallbackAtlas, fallbackHome, fallbackInsurance, fallbackRoofing } from "@/lib/data/pages";
import { fallbackServices } from "@/lib/data/services";
import { counties, fallbackLocations } from "@/lib/data/locations";
import { localLogos } from "@/lib/data/logos";
import type {
  AboutContent,
  AtlasContent,
  Faq,
  HomeContent,
  InsuranceContent,
  Location,
  Partners,
  Project,
  RoofingContent,
  Service,
  SiteSettings,
  Testimonial,
} from "@/lib/types";

/* ==========================================================================
   Content layer
   Every page reads through these functions. Sanity values win when present;
   anything missing falls back to lib/data, so the site works before the
   CMS is filled in, and an empty field never breaks a page.
   ========================================================================== */

export { counties };

/* ---------- GROQ fragments ---------- */

const IMG = `{ "src": asset->url, alt, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }`;
const LOGO = `{ "src": asset->url, "alt": "", "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }`;
const SEO = `seo{ title, description, noIndex, "image": ogImage${IMG} }`;
const HERO = `hero{ eyebrow, heading, text, "image": image${IMG} }`;
const HEADING = `{ eyebrow, heading, text }`;
const CARD = `{ icon, title, text, href }`;
const FAQ = `{ question, answer, category }`;
const FEATURE = `{ "anchor": anchor.current, icon, eyebrow, title, lead, paragraphs, highlightsLabel, highlights, imageSide, ctas[]{ label, href }, "image": image${IMG} }`;

/* ---------- Settings ---------- */

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const cms = await sanityFetch<Partial<SiteSettings>>(
    `*[_id == "siteSettings"][0]{ name, legalName, phone, email, license, street, city, region, postalCode, hours[]{ label, value }, emergencyText, foundedYear, googleRating, reviewCount, reviewsUrl, mapsUrl, social[]{ network, href }, headerCta{ label, href }, "logo": logo${LOGO} }`,
    {},
    ["siteSettings"],
  );
  const s = merge(fallbackSettings, cms);
  // tel: link always follows the displayed phone number.
  const digits = s.phone.replace(/\D/g, "");
  return { ...s, phoneHref: `tel:+${digits.length === 10 ? `1${digits}` : digits}` };
});

export const getPartners = cache(async (): Promise<Partners> => {
  const cms = await sanityFetch<Partial<Partners>>(
    `*[_id == "partners"][0]{ brandsHeading, brandsText, brands[]{ name, url, "logo": logo${LOGO} }, insuranceHeading, insuranceText, insurers[]{ name, url, "logo": logo${LOGO} } }`,
    {},
    ["partners"],
  );
  return withLocalLogos(merge(fallbackPartners, cms));
});

/** Logo files bundled in /public/images/logos are used until a logo is uploaded in /cms. */
function withLocalLogos(p: Partners): Partners {
  const fill = (list: Partners["brands"]) => list.map((x) => (x.logo ? x : { ...x, logo: localLogos[x.name.toLowerCase()] }));
  return { ...p, brands: fill(p.brands), insurers: fill(p.insurers) };
}

/* ---------- Collections ---------- */

const SERVICE = `{ "slug": slug.current, title, category, icon, summary, order, ${HERO}, sections[]${FEATURE}, faqs[]${FAQ}, ${SEO} }`;

export const getServices = cache(async (): Promise<Service[]> => {
  const cms = await sanityFetch<Partial<Service>[]>(`*[_type == "service" && defined(slug.current)] | order(order asc) ${SERVICE}`, {}, ["service"]);
  if (!cms?.length) return fallbackServices;
  // CMS services merge over the matching fallback; new CMS-only services are added.
  const bySlug = new Map(fallbackServices.map((s) => [s.slug, s]));
  const merged = cms.map((c) => {
    const base = bySlug.get(c.slug ?? "");
    return base ? merge(base, c) : merge({ ...fallbackServices[0], sections: [], faqs: [], slug: c.slug ?? "" }, c);
  });
  const missing = fallbackServices.filter((f) => !cms.some((c) => c.slug === f.slug));
  return [...merged, ...missing].sort((a, b) => a.order - b.order);
});

export async function getService(slug: string) {
  return (await getServices()).find((s) => s.slug === slug) ?? null;
}

const LOCATION = `{ "slug": slug.current, name, county, state, featured, lead, paragraphs, highlights, neighborhoods, order, ${SEO} }`;

export const getLocations = cache(async (): Promise<Location[]> => {
  const cms = await sanityFetch<(Partial<Location> & { order?: number })[]>(`*[_type == "location" && defined(slug.current)] | order(order asc) ${LOCATION}`, {}, ["location"]);
  if (!cms?.length) return fallbackLocations;
  const bySlug = new Map(fallbackLocations.map((l) => [l.slug, l]));
  const merged = cms.map((c) => merge(bySlug.get(c.slug ?? "") ?? { slug: c.slug ?? "", name: c.name ?? "", state: "MD", featured: true }, c));
  const missing = fallbackLocations.filter((f) => !cms.some((c) => c.slug === f.slug));
  return [...merged, ...missing];
});

export async function getLocation(slug: string) {
  return (await getLocations()).find((l) => l.slug === slug && l.featured) ?? null;
}

export const getProjects = cache(async (): Promise<Project[]> => {
  const cms = await sanityFetch<Project[]>(
    `*[_type == "project"] | order(date desc){ "id": _id, title, location, category, summary, featured, "before": before${IMG}, "after": after${IMG}, "images": images[]${IMG} }`,
    {},
    ["project"],
  );
  if (!cms?.length) return fallbackProjects;
  return cms.map((p) => merge({ id: p.id, title: p.title, category: "residential" as const, images: [] }, p));
});

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const cms = await sanityFetch<Testimonial[]>(`*[_type == "testimonial"] | order(_createdAt asc){ quote, name, location, rating, source }`, {}, ["testimonial"]);
  return cms?.length ? cms.map((t) => ({ ...t, rating: t.rating ?? 5 })) : fallbackTestimonials;
});

export const getFaqs = cache(async (): Promise<(Faq & { onHome?: boolean })[]> => {
  const cms = await sanityFetch<(Faq & { onHome?: boolean })[]>(`*[_type == "faq"] | order(order asc){ question, answer, category, onHome }`, {}, ["faq"]);
  return cms?.length ? cms : fallbackFaqs.map((f, i) => ({ ...f, onHome: i < 8 }));
});

/* ---------- Pages ---------- */

export const getHome = cache(async (): Promise<HomeContent> => {
  const cms = await sanityFetch<Partial<HomeContent>>(
    `*[_id == "homePage"][0]{
      hero{ eyebrow, heading, text, badges, "image": image${IMG} },
      stats[]{ value, label },
      servicesIntro${HEADING}, serviceCards[]${CARD},
      sections[]${FEATURE},
      anatomyIntro${HEADING}, anatomy[]${CARD},
      whyIntro${HEADING}, why[]${CARD},
      processIntro${HEADING}, process[]${CARD},
      faqIntro${HEADING}, "faqs": faqs[]->${FAQ},
      ${SEO}
    }`,
    {},
    ["homePage", "faq"],
  );
  const home = merge(fallbackHome, cms);
  if (!home.faqs.length) home.faqs = (await getFaqs()).filter((f) => f.onHome).slice(0, 8);
  return home;
});

export const getRoofingPage = cache(async (): Promise<RoofingContent> => {
  const cms = await sanityFetch<Partial<RoofingContent>>(`*[_id == "roofingPage"][0]{ ${HERO}, sections[]${FEATURE}, faqs[]${FAQ}, ${SEO} }`, {}, ["roofingPage"]);
  const page = merge(fallbackRoofing, cms);
  if (!page.faqs.length) page.faqs = (await getFaqs()).filter((f) => ["General", "Roof replacement", "Commercial"].includes(f.category ?? "")).slice(0, 6);
  return page;
});

export const getAtlasPage = cache(async (): Promise<AtlasContent> => {
  const cms = await sanityFetch<Partial<AtlasContent>>(
    `*[_id == "atlasPage"][0]{ ${HERO}, "badge": badge${IMG}, sections[]${FEATURE}, productsIntro${HEADING}, products[]{ name, tagline, text, highlights, "image": image${IMG} }, warrantyIntro${HEADING}, warranties[]${CARD}, faqs[]${FAQ}, ${SEO} }`,
    {},
    ["atlasPage"],
  );
  return merge(fallbackAtlas, cms);
});

export const getInsurancePage = cache(async (): Promise<InsuranceContent> => {
  const cms = await sanityFetch<Partial<InsuranceContent>>(
    `*[_id == "insurancePage"][0]{ ${HERO}, sections[]${FEATURE}, stepsIntro${HEADING}, steps[]${CARD}, signsIntro${HEADING}, signs[]${CARD}, faqs[]${FAQ}, ${SEO} }`,
    {},
    ["insurancePage"],
  );
  const page = merge(fallbackInsurance, cms);
  if (!page.faqs.length) page.faqs = (await getFaqs()).filter((f) => f.category === "Insurance");
  return page;
});

export const getAboutPage = cache(async (): Promise<AboutContent> => {
  const cms = await sanityFetch<Partial<AboutContent>>(
    `*[_id == "aboutPage"][0]{ ${HERO}, facts[]{ label, value }, sections[]${FEATURE}, valuesIntro${HEADING}, values[]${CARD}, ${SEO} }`,
    {},
    ["aboutPage"],
  );
  return merge(fallbackAbout, cms);
});
