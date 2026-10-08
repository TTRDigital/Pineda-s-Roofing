import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPartners, getService, getServices, getSiteSettings, getTestimonials } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";
import { serviceOptions } from "@/lib/lead-options";
import { fallbackServices } from "@/lib/data/services";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { LogoMarquee } from "@/components/sections/LogoStrip";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { ContactSection } from "@/components/sections/ContactSection";
import { JsonLd } from "@/components/ui/JsonLd";

export const revalidate = 300;

export async function generateStaticParams() {
  return fallbackServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const service = await getService(slug);
  if (!service) return {};
  return pageMetadata(service.seo, `/services/${slug}`, service.hero.image);
}

/* Which lead-form option to preselect for each service. */
const formService: Record<string, (typeof serviceOptions)[number]> = {
  "roof-replacement": "Roof replacement",
  "residential-roofing": "Roof replacement",
  "roof-repair": "Roof repair",
  "emergency-roof-repair": "Emergency / leak repair",
  "storm-restoration": "Storm damage / insurance claim",
  "roof-maintenance": "Free roof inspection",
  "commercial-roofing": "Commercial roofing",
  "gutter-installation-replacement": "Gutters",
  siding: "Siding",
};

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const [service, services, settings, partners, testimonials] = await Promise.all([getService(slug), getServices(), getSiteSettings(), getPartners(), getTestimonials()]);
  if (!service) notFound();

  const roofing = service.category !== "exterior";
  const related = services.filter((s) => s.slug !== slug && (s.category === service.category || (roofing && s.category !== "exterior"))).slice(0, 3);
  const path = `/services/${slug}`;

  return (
    <>
      <JsonLd data={serviceSchema(service, path)} />
      <PageHero
        hero={service.hero}
        crumbs={[
          roofing ? { label: "Roofing", href: "/services/roofing" } : { label: "Services", href: "/services" },
          { label: service.title, href: path },
        ]}
        ctas={[
          { label: "Get a free estimate", href: "#estimate" },
          { label: settings.phone, href: settings.phoneHref },
        ]}
      />
      {service.sections.map((b, i) => (
        <FeatureSection key={b.title} block={b} index={i} tone={i % 2 ? "mist" : "white"} />
      ))}
      {roofing ? <LogoMarquee label="Brands we install" items={partners.brands} /> : null}
      <Testimonials items={testimonials} settings={settings} />
      <FaqSection intro={{ eyebrow: "FAQ", heading: `${service.title} questions` }} items={service.faqs} tone="mist" />
      <RelatedServices services={related} />
      <ContactSection settings={settings} defaultService={formService[slug] ?? (service.category === "exterior" ? "Other" : undefined)} />
    </>
  );
}
