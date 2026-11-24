import type { Service, SiteSettings } from "@/lib/types";
import { absoluteUrl, siteUrl } from "@/lib/site";
import { images } from "@/lib/data/images";

const dayMap: Record<string, string[]> = {
  "monday to friday": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  saturday: ["Saturday"],
  sunday: ["Sunday"],
};

function to24h(t: string) {
  const m = t.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
  if (!m) return null;
  let h = Number(m[1]) % 12;
  if (m[3].toUpperCase() === "PM") h += 12;
  return `${String(h).padStart(2, "0")}:${m[2] ?? "00"}`;
}

/** RoofingContractor (a LocalBusiness) for the whole site. */
export function businessSchema(s: SiteSettings, areas: string[] = []) {
  const hours = s.hours
    .map((h) => {
      const days = dayMap[h.label.toLowerCase()];
      const [open, close] = h.value.split(/\s+to\s+/i).map(to24h);
      return days && open && close ? { "@type": "OpeningHoursSpecification", dayOfWeek: days, opens: open, closes: close } : null;
    })
    .filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "@id": `${siteUrl}/#business`,
    name: s.name,
    legalName: s.legalName,
    url: siteUrl,
    telephone: s.phone,
    email: s.email,
    logo: absoluteUrl(images.logo.src),
    image: absoluteUrl(images.aerialNewShingleRoof.src),
    foundingDate: String(s.foundedYear),
    founder: { "@type": "Person", name: "German Pineda" },
    // Service-area business: city and state only, never the street address.
    address: { "@type": "PostalAddress", addressLocality: s.city, addressRegion: s.region, addressCountry: "US" },
    openingHoursSpecification: hours,
    areaServed: areas.map((name) => ({ "@type": "Place", name })),
    sameAs: [...s.social.map((x) => x.href), ...(s.bbb?.url ? [s.bbb.url] : [])],
    // No AggregateRating, Review or Rating here (TTR hard rule, SOP on-page-seo step 7): the testimonials stay visible on the page only.
    // The Google rating and reviews shown on the site come from Google, which also rules out marking them up as our own.
  };
}

export function serviceSchema(service: Service, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.seo.description,
    url: absoluteUrl(path),
    provider: { "@id": `${siteUrl}/#business` },
    areaServed: { "@type": "State", name: "Maryland" },
  };
}
