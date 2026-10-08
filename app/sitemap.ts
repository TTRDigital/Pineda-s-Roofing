import type { MetadataRoute } from "next";
import { getLocations, getServices } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, locations] = await Promise.all([getServices(), getLocations()]);
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
    entry("/faq", 0.6),
    entry("/service-area", 0.7),
    ...locations.filter((l) => l.featured).map((l) => entry(`/service-area/${l.slug}`, 0.7)),
    entry("/contact-us", 0.7),
    entry("/privacy", 0.1, "yearly"),
    entry("/terms", 0.1, "yearly"),
  ];
}
