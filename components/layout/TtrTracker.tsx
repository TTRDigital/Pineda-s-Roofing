import Script from "next/script";

/** Public site key from TTR OS (it is visible in the page source anyway). Nothing loads when it is empty. */
const SITE_KEY = process.env.NEXT_PUBLIC_TTR_TRACKER_KEY;

/** TTR OS tracker: <script async src=".../api/site/script" data-site="KEY">. */
export function TtrTracker() {
  if (!SITE_KEY) return null;
  return <Script src="https://ttr-portal.vercel.app/api/site/script" data-site={SITE_KEY} strategy="afterInteractive" />;
}
