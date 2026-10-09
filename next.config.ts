import type { NextConfig } from "next";
import { redirects } from "./redirects";

const isDev = process.env.NODE_ENV !== "production";

// Inline scripts are needed for Next's streamed payload and static (ISR)
// pages, which rule out per-request nonces. Third parties are limited to
// Google Analytics / Tag Manager, Vercel Analytics, Sanity images, Google
// Maps and the GoHighLevel (LeadConnector) chat widget (which loads its
// font from fonts.bunny.net). If you add tags in
// GTM that load other scripts, add their domains here.
const leadConnector = "https://*.leadconnectorhq.com https://*.msgsndr.com";
// Cloudflare Turnstile: the chat widget's anti-spam check when a visitor opens the chat.
const turnstile = "https://challenges.cloudflare.com";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://*.googletagmanager.com https://va.vercel-scripts.com ${leadConnector} ${turnstile}`,
  `style-src 'self' 'unsafe-inline' ${leadConnector} https://fonts.googleapis.com https://fonts.bunny.net`,
  "img-src 'self' data: blob: https:",
  `font-src 'self' data: ${leadConnector} https://fonts.gstatic.com https://fonts.bunny.net`,
  `connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://vitals.vercel-insights.com https://va.vercel-scripts.com ${leadConnector} wss://*.leadconnectorhq.com https://*.googleapis.com ${turnstile}`,
  `frame-src 'self' https://www.googletagmanager.com https://www.google.com https://maps.google.com ${leadConnector} ${turnstile}`,
  "media-src 'self' blob: https:",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  // Only on Vercel (HTTPS); locally it would upgrade http://localhost requests and break them.
  ...(process.env.VERCEL ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // The site gets a strict CSP. The studio at /cms talks to many Sanity
      // hosts and is protected by Sanity login instead.
      { source: "/((?!cms).*)", headers: [{ key: "Content-Security-Policy", value: csp }] },
    ];
  },
  async redirects() {
    return redirects;
  },
};

export default nextConfig;
