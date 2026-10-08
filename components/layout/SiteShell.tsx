import type { ReactNode } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getLocations, getServices, getSiteSettings, getTestimonials } from "@/lib/content";
import { businessSchema } from "@/lib/schema";
import { revealScript } from "@/lib/reveal-script";
import type { Service } from "@/lib/types";
import { JsonLd } from "@/components/ui/JsonLd";
import { Header, type NavItem } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { ChatWidget } from "@/components/layout/ChatWidget";
import { Analytics } from "@/components/layout/Analytics";
import { HydrationSignal } from "@/components/layout/HydrationSignal";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { AttributionCapture } from "@/components/forms/AttributionCapture";

const onVercel = !!process.env.VERCEL;

function buildNav(services: Service[]): NavItem[] {
  const roofing = services.filter((s) => s.category !== "exterior");
  const exterior = services.filter((s) => s.category === "exterior");
  return [
    { label: "Home", href: "/" },
    {
      label: "Roofing",
      href: "/services/roofing",
      children: roofing.map((s) => ({ label: s.title, href: `/services/${s.slug}`, note: s.summary })),
    },
    {
      label: "Services",
      href: "/services",
      children: [...exterior.map((s) => ({ label: s.title, href: `/services/${s.slug}` })), { label: "All services", href: "/services" }],
    },
    { label: "Atlas", href: "/atlas-roofing" },
    { label: "Insurance Claims", href: "/roofing-insurance" },
    { label: "Gallery", href: "/gallery" },
    {
      label: "About",
      href: "/about-us",
      children: [
        { label: "About us", href: "/about-us" },
        { label: "FAQ", href: "/faq" },
        { label: "Service areas", href: "/service-area" },
      ],
    },
    { label: "Contact", href: "/contact-us" },
  ];
}

/** Header, footer and site-wide behaviors. Used by the site layout and the 404 page. */
export async function SiteShell({ children }: { children: ReactNode }) {
  const [settings, services, testimonials, locations] = await Promise.all([getSiteSettings(), getServices(), getTestimonials(), getLocations()]);
  return (
    <>
      <JsonLd data={businessSchema(settings, testimonials, locations.map((l) => l.name))} />
      <a href="#main" className="sr-only z-[100] rounded-lg bg-cyan px-5 py-3 font-bold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <Header nav={buildNav(services)} cta={settings.headerCta} phone={settings.phone} phoneHref={settings.phoneHref} license={settings.license} emergencyText={settings.emergencyText} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer settings={settings} services={services.filter((s) => s.category !== "exterior")} />
      <BackToTop />
      <MobileCallBar phoneHref={settings.phoneHref} cta={settings.headerCta} />
      <ChatWidget />
      <AttributionCapture />
      <HydrationSignal />
      <Analytics />
      {onVercel ? (
        <>
          <VercelAnalytics />
          <SpeedInsights />
        </>
      ) : null}
      <script dangerouslySetInnerHTML={{ __html: revealScript }} />
    </>
  );
}
