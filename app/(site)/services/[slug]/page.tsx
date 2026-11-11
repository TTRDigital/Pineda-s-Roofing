import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getPartners, getService, getServices, getSiteSettings, getTestimonials } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";
import { serviceOptions } from "@/lib/lead-options";
import { fallbackServices } from "@/lib/data/services";
import { solarMarkets } from "@/lib/data/solar";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { LogoMarquee } from "@/components/sections/LogoStrip";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { ContactSection } from "@/components/sections/ContactSection";
import { JsonLd } from "@/components/ui/JsonLd";


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
  "solar-panel-installation": "Solar installation",
};

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const [service, services, settings, partners, testimonials] = await Promise.all([getService(slug), getServices(), getSiteSettings(), getPartners(), getTestimonials()]);
  if (!service) notFound();

  const roofing = service.category !== "exterior" && service.category !== "solar";
  const related =
    service.category === "solar"
      ? services.filter((s) => ["roof-replacement", "roof-repair", "commercial-roofing"].includes(s.slug))
      : services.filter((s) => s.slug !== slug && (s.category === service.category || (roofing && s.category !== "exterior" && s.category !== "solar"))).slice(0, 3);
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
          { label: service.category === "solar" ? "Request a Solar Assessment" : "Get a free estimate", href: "#estimate" },
          { label: settings.phone, href: settings.phoneHref },
        ]}
      />
      {service.category === "solar" ? (
        <section className="section bg-white">
          <div className="container-x">
            <p className="eyebrow">Choose your area</p>
            <h2 className="mt-3 text-h2 uppercase text-ink">Where is your home?</h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-2">
              {solarMarkets.map((m) => (
                <li key={m.slug}>
                  <Link href={`/solar/${m.slug}`} className="group flex h-full flex-col rounded-[var(--radius-card)] border-2 border-line bg-white p-8 transition-colors hover:border-cyan hover:bg-cyan-50">
                    <span className="font-display text-h3 uppercase text-ink">{m.name}</span>
                    <span className="mt-2 font-semibold text-cyan-deep">{m.hero.heading}</span>
                    <span className="mt-3 flex-1 text-body">{m.chooserText}</span>
                    <span className="mt-6 inline-flex items-center gap-2 font-bold uppercase tracking-[0.08em] text-ink">
                      Solar in {m.name}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      {service.sections.map((b, i) => (
        <FeatureSection key={b.title} block={b} index={i} tone={i % 2 ? "mist" : "white"} />
      ))}
      {roofing ? <LogoMarquee label="Brands we install" items={partners.brands} /> : null}
      <Testimonials items={testimonials} settings={settings} page={slug} />
      <FaqSection intro={{ eyebrow: "FAQ", heading: `${service.title} questions` }} items={service.faqs} tone="mist" />
      <RelatedServices services={related} />
      <ContactSection settings={settings} defaultService={formService[slug] ?? (service.category === "exterior" ? "Other" : undefined)} />
    </>
  );
}
