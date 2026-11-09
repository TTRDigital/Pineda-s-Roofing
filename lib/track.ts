/*
 * Analytics events for reporting: every call click, form submit, Google
 * reviews click and BBB click carries the page it happened on, plus the
 * service and the service area (city/county page) when there is one, so
 * reports can show which services and locations bring inquiries.
 * Sent to GA4 (gtag) and/or Google Tag Manager (dataLayer), whichever is installed.
 */
export type PageContext = { page_path: string; page_type: string; service?: string; area?: string };

export function pageContext(pathname: string): PageContext {
  const path = pathname.replace(/\/+$/, "") || "/";
  const [, first, second] = path.split("/");
  if (first === "services" && second) return { page_path: path, page_type: "service", service: second };
  if (first === "service-area" && second) return { page_path: path, page_type: "service_area", area: second };
  if (first === "about-us" && second) return { page_path: path, page_type: "team" };
  if (path === "/") return { page_path: path, page_type: "home" };
  return { page_path: path, page_type: first || "home" };
}

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const data = { ...pageContext(window.location.pathname), ...params };
  const w = window as unknown as { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
  w.gtag?.("event", event, data);
  w.dataLayer?.push({ event, ...data });
}
