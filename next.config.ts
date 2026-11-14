import type { NextConfig } from "next";
import { LIVE_CSP, PREVIEW_CSP } from "./lib/csp";

/*
 * Pineda's Roofing runs as a normal Next.js app on Vercel, with content in
 * Sanity (project 5emjihiz). What the old SiteGround .htaccess did lives here
 * and in vercel.json: security headers (CSP) and caching here; the 301
 * redirects for old addresses in vercel.json (they run before Next, so
 * /about goes straight to /about-us/ in one hop).
 * - the estimate form: app/api/lead.php/route.ts (webhook in LEAD_WEBHOOK_URL)
 * - publishing in Sanity: webhook to /api/revalidate (SANITY_REVALIDATE_SECRET)
 * - images: WebP copies made before the build by scripts/optimize-images.mjs,
 *   picked by lib/image-loader.ts
 */
const isPreview = process.env.VERCEL_ENV === "preview";
const csp = isPreview ? PREVIEW_CSP : LIVE_CSP;

const nextConfig: NextConfig = {
  // /about-us/ (matches the old WordPress URLs).
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    // Keep in sync with WIDTHS in scripts/optimize-images.mjs.
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [96, 256, 384],
  },
  async headers() {
    const security = [
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), geolocation=(), browsing-topics=()" },
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    ];
    return [
      { source: "/:path*", headers: security },
      // Everything except the studio.
      { source: "/((?!cms(?:/|$)).*)", headers: [{ key: "Content-Security-Policy", value: csp }] },
      // Staging addresses are never indexed (the real domain is).
      { source: "/:path*", has: [{ type: "host", value: ".*\\.vercel\\.app" }], headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/_img/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000" }] },
    ];
  },
};

export default nextConfig;
