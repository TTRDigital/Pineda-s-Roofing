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


const seo = {
  title: "Service Area: Baltimore, Howard, Anne Arundel, Prince George's & More | Pineda's Roofing",
  description: "Roofing contractor serving Baltimore County, Baltimore City, Howard, Anne Arundel and Prince George's counties, plus Carroll, Frederick and Montgomery. Solar in Washington, DC.",
};

export const metadata: Metadata = pageMetadata(seo, "/service-area", images.homeNewRoofAerial);

export default async function ServiceAreaPage() {
  const [locations, settings] = await Promise.all([getLocations(), getSiteSettings()]);
  const pages = locations.filter((l) => l.featured);
  const groups = [
    { label: "Main service areas", note: "Where we focus most of our roofing work", list: pages.filter((l) => l.kind === "county" && l.tier === 1) },
    { label: "Also serving", note: "Second tier counties and our home county", list: pages.filter((l) => l.kind === "county" && l.tier === 2) },
    { label: "Solar and more", note: "Washington, DC is a main focus for solar", list: pages.filter((l) => l.slug === "washington-dc") },
  ];
  const cityPages = (county: string) => pages.filter((l) => l.kind !== "county" && l.county === county);
  return (
    <>
      <PageHero
        hero={{
          eyebrow: "Service area",
          heading: "Roofing contractor across Maryland",
          text: "Based in Silver Spring, MD. We serve Baltimore County, Baltimore City, Howard, Anne Arundel and Prince George's counties, plus Carroll, Frederick and Montgomery. Solar in Washington, DC and Maryland.",
          image: images.homeNewRoofAerial,
        }}
        crumbs={[{ label: "Service area", href: "/service-area" }]}
      />
      {groups.map((g, gi) => (
        <section key={g.label} className={`section ${gi % 2 ? "bg-mist" : "bg-white"}`}>
          <div className="container-x">
            <SectionHeading eyebrow={g.note} heading={g.label} />
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {g.list.map((l) => (
                <li key={l.slug} className="rounded-[var(--radius-card)] border border-line bg-white p-6">
                  <Link href={`/service-area/${l.slug}`} className="group flex items-center justify-between gap-4">
                    <span className="font-display text-xl font-bold uppercase text-ink group-hover:text-cyan-deep">{l.slug === "washington-dc" ? "Solar & roofing in Washington, DC" : `Roofing contractor in ${l.name}`}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
                  </Link>
                  {cityPages(l.name).length ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {cityPages(l.name).map((c) => (
                        <li key={c.slug}>
                          <Link href={`/service-area/${c.slug}`} className="inline-flex min-h-9 items-center rounded-full bg-cyan-50 px-3.5 text-sm font-semibold text-ink ring-1 ring-cyan-100 hover:bg-cyan hover:ring-cyan">
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="More local pages" heading="Other areas we serve" />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pages
              .filter((l) => !l.county && l.kind !== "county" && l.slug !== "washington-dc")
              .map((l) => (
                <li key={l.slug}>
                  <Link href={`/service-area/${l.slug}`} className="group flex min-h-16 items-center justify-between gap-4 rounded-[var(--radius-card)] border border-line px-5 py-4 hover:border-cyan hover:bg-cyan-50">
                    <span className="font-bold text-ink">Roofing in {l.name}</span>
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
