import type { MetadataRoute } from "next";
import { getAboutPage, getLocations, getServices } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, locations, about] = await Promise.all([getServices(), getLocations(), getAboutPage()]);
  const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({ url: absoluteUrl(path), changeFrequency, priority });
  return [
    entry("/", 1, "weekly"),
    entry("/services/roofing", 0.95),
    entry("/services", 0.8),
    ...services.map((s) => entry(`/services/${s.slug}`, 0.9)),
    entry("/atlas-roofing", 0.8),
    entry("/roofing-insurance", 0.85),
    entry("/gallery", 0.7, "weekly"),
    entry("/about-us", 0.7),
    ...about.team.filter((p) => !p.noIndex).map((p) => entry(`/about-us/${p.slug}`, 0.5)),
    entry("/faq", 0.6),
    entry("/service-area", 0.7),
    ...locations.filter((l) => l.featured).map((l) => entry(`/service-area/${l.slug}`, 0.7)),
    entry("/contact-us", 0.7),
    entry("/privacy", 0.1, "yearly"),
    entry("/terms", 0.1, "yearly"),
  ];
}
