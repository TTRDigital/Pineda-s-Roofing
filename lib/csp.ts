/*
 * Content-Security-Policy for the site. Production uses LIVE_CSP exactly
 * (identical, byte for byte, to the policy in the old SiteGround .htaccess).
 * Staging previews add the TTR portal for the editing bar and its pictures.
 * The studio at /cms is left out (it talks to many Sanity hosts and is
 * protected by Sanity login instead).
 */
export const LIVE_CSP = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.googletagmanager.com https://*.leadconnectorhq.com https://*.msgsndr.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://*.leadconnectorhq.com https://*.msgsndr.com https://fonts.googleapis.com https://fonts.bunny.net; img-src 'self' data: blob: https:; font-src 'self' data: https://*.leadconnectorhq.com https://*.msgsndr.com https://fonts.gstatic.com https://fonts.bunny.net; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.leadconnectorhq.com https://*.msgsndr.com wss://*.leadconnectorhq.com https://*.googleapis.com https://challenges.cloudflare.com; frame-src 'self' https://www.googletagmanager.com https://www.google.com https://maps.google.com https://*.leadconnectorhq.com https://*.msgsndr.com https://challenges.cloudflare.com; media-src 'self' blob: https:; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests";

const PREVIEW_ADD: Record<string, string> = {
  "script-src": "https://portal.ttrdigitalmarketing.com https://ttr-portal.vercel.app",
  "connect-src": "https://portal.ttrdigitalmarketing.com https://ttr-portal.vercel.app",
  "img-src": "https://*.blob.vercel-storage.com",
};

export const PREVIEW_CSP = LIVE_CSP.split("; ")
  .map((d) => {
    const name = d.split(" ")[0];
    return PREVIEW_ADD[name] ? `${d} ${PREVIEW_ADD[name]}` : d;
  })
  .join("; ");
