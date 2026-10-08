import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { counties, getLocations, getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/data/images";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const revalidate = 300;

const seo = {
  title: "Service Area: Maryland, D.C. & Northern Virginia | Pineda's Roofing",
  description: "Pineda's Roofing serves Montgomery, Prince George's, Howard, Frederick, Anne Arundel and Baltimore counties, Washington D.C. and Northern Virginia.",
};

export const metadata: Metadata = pageMetadata(seo, "/service-area", images.homeNewRoofAerial);

export default async function ServiceAreaPage() {
  const [locations, settings] = await Promise.all([getLocations(), getSiteSettings()]);
  const pages = locations.filter((l) => l.featured);
  return (
    <>
      <PageHero
        hero={{
          eyebrow: "Service area",
          heading: "Roofing across Maryland & the DMV",
          text: "Headquartered in Silver Spring, with local crews serving homes and businesses across Maryland, Washington D.C. and Northern Virginia.",
          image: images.homeNewRoofAerial,
        }}
        crumbs={[{ label: "Service area", href: "/service-area" }]}
      />
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Local pages" heading="Find your area" />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map((l) => (
              <li key={l.slug}>
                <Link href={`/service-area/${l.slug}`} className="group flex min-h-16 items-center justify-between gap-4 rounded-[var(--radius-card)] border border-line px-5 py-4 transition-colors hover:border-cyan hover:bg-cyan-50">
                  <span>
                    <span className="block font-bold text-ink">Roofing in {l.name}</span>
                    {l.county ? <span className="text-sm text-meta">{l.county}</span> : null}
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ServiceAreas counties={counties} locations={locations} tone="mist" phone={settings.phone} />
      <ContactSection settings={settings} />
    </>
  );
}
