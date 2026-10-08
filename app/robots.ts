import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/site";

// Search and AI crawlers are welcome; only the studio, API and thank-you page are off limits.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/cms", "/api/", "/thank-you"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
