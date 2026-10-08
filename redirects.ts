import type { Redirect } from "next/dist/lib/load-custom-routes";

/* Old WordPress paths that changed. Every other old URL (/services/..., /about-us, /contact-us, /service-area, /roofing-insurance) is unchanged. */
export const redirects: Redirect[] = [
  { source: "/emergency-roof-repair", destination: "/services/emergency-roof-repair", permanent: true },
  { source: "/home-v2", destination: "/", permanent: true },
  { source: "/atlas", destination: "/atlas-roofing", permanent: true },
  { source: "/insurance-claims", destination: "/roofing-insurance", permanent: true },
  { source: "/about", destination: "/about-us", permanent: true },
  { source: "/contact", destination: "/contact-us", permanent: true },
  { source: "/roofing", destination: "/services/roofing", permanent: true },
  { source: "/services/gutters", destination: "/services/gutter-installation-replacement", permanent: true },
];
