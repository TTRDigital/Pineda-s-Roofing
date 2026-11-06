import type { ReactNode } from "react";
import { getLocations, getServices, getSiteSettings, getTestimonials } from "@/lib/content";
import { businessSchema } from "@/lib/schema";
import { revealScript } from "@/lib/reveal-script";
import type { Location, Service } from "@/lib/types";
import { JsonLd } from "@/components/ui/JsonLd";
import { Header, type NavItem } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { ChatWidget } from "@/components/layout/ChatWidget";
import { Analytics } from "@/components/layout/Analytics";
import { HydrationSignal } from "@/components/layout/HydrationSignal";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { AttributionCapture } from "@/components/forms/AttributionCapture";

function buildNav(services: Service[], locations: Location[]): NavItem[] {
  const areas = locations.filter((l) => l.featured && l.kind === "county" && l.tier && l.tier <= 2).sort((a, b) => (a.tier ?? 9) - (b.tier ?? 9));
  const roofing = services.filter((s) => s.category !== "exterior" && s.category !== "solar");
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
    { label: "Solar", href: "/services/solar" },
    { label: "Atlas", href: "/atlas-roofing" },
    { label: "Insurance", href: "/roofing-insurance" },
    { label: "Gallery", href: "/gallery" },
    {
      label: "About",
      href: "/about-us",
      children: [
        { label: "About us", href: "/about-us" },
        { label: "Roberto Pineda", href: "/about-us/roberto-pineda", note: "Owner" },
        { label: "Fredy Pineda", href: "/about-us/fredy-pineda", note: "Partner" },
        { label: "Meet Don Eagle", href: "/about-us#don-eagle", note: "Our mascot and what he stands for" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      label: "Service Areas",
      href: "/service-area",
      children: [
        ...areas.map((l) => ({ label: l.name, href: `/service-area/${l.slug}` })),
        { label: "Solar in Washington, DC", href: "/service-area/washington-dc" },
        { label: "All service areas", href: "/service-area" },
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
      <Header nav={buildNav(services, locations)} cta={settings.headerCta} phone={settings.phone} phoneHref={settings.phoneHref} license={settings.license} emergencyText={settings.emergencyText} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer settings={settings} services={services.filter((s) => s.category !== "exterior" && s.category !== "solar")} />
      <BackToTop />
      <MobileCallBar phoneHref={settings.phoneHref} cta={settings.headerCta} />
      <ChatWidget />
      <AttributionCapture />
      <HydrationSignal />
      <Analytics />
      <script dangerouslySetInnerHTML={{ __html: revealScript }} />
    </>
  );
}
