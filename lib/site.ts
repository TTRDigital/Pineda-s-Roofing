/**
 * Public site URL, used for canonical links, the sitemap, schema and Open
 * Graph. NEXT_PUBLIC_SITE_URL overrides the default.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.pinedasroofing.com").replace(/\/$/, "");

export const absoluteUrl = (path = "/") => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
