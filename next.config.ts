import type { NextConfig } from "next";

/*
 * Static export for SiteGround (Apache) hosting: `npm run build` writes plain
 * HTML/CSS/JS to `out/`, which goes into public_html.
 *
 * What a static host has no Node server for lives elsewhere:
 * - redirects, security headers (CSP) and caching: public/.htaccess
 * - the estimate form: public/api/lead.php (PHP, forwards to GoHighLevel)
 * - images: WebP copies made before the build by scripts/optimize-images.mjs,
 *   picked by lib/image-loader.ts
 * - CMS updates: rebuild and upload (.github/workflows/deploy-siteground.yml),
 *   started by a push, a Sanity webhook or the "Run workflow" button
 */
// Vercel (the current domain host) can't run lead.php, so there the site is a
// normal Next.js build with one server route for the estimate form
// (app/api/lead/route.vercel.ts). Everywhere else it stays a static export.
const onVercel = !!process.env.VERCEL;

const nextConfig: NextConfig = {
  ...(onVercel
    ? {
        pageExtensions: ["tsx", "ts", "jsx", "js", "vercel.ts"],
        // The form posts to /api/lead.php on every host; on Vercel that is the route above
        // (beforeFiles also stops Vercel serving the PHP file's source).
        async rewrites() {
          return { beforeFiles: [{ source: "/api/lead.php", destination: "/api/lead" }], afterFiles: [], fallback: [] };
        },
      }
    : { output: "export" as const }),
  // /about-us/ -> about-us/index.html, which Apache serves as is
  // (and matches the old WordPress URLs).
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    // Keep in sync with WIDTHS in scripts/optimize-images.mjs.
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [96, 256, 384],
    // 75 for every photo; 60 only for page heroes' phone-size copies (lib/image-loader.ts).
    qualities: [60, 75],
  },
};

export default nextConfig;
