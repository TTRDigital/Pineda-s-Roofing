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
  title: "Service Area: Maryland, D.C. & Northern Virginia | Pineda's Roofing",
  description: "Roofing contractor serving Baltimore County, Baltimore City, Howard, Anne Arundel and Prince George's County, plus Carroll, Frederick, Montgomery and Washington, D.C. solar.",
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
          text: "Family-owned roofing contractor serving Baltimore, Howard, Anne Arundel and Prince George's County, plus Carroll, Frederick and Montgomery County, from our Silver Spring home base. Solar in Washington, D.C. too.",
          image: images.homeNewRoofAerial,
        }}
        crumbs={[{ label: "Service area", href: "/service-area" }]}
      />
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Local pages" heading="Find your area" />
          {[1, 2].map((tier) => (
            <div key={tier} className="mt-12">
              <h2 className="eyebrow plain">{tier === 1 ? "Main service areas" : "Also serving"}</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {counties
                  .filter((c) => c.tier === tier)
                  .map((c) => {
                    const countyPage = pages.find((l) => l.slug === c.page);
                    const cityPages = pages.filter((l) => l.kind !== "county" && l.county === c.name);
                    return (
                      <div key={c.name} className={`rounded-[var(--radius-card)] border p-5 ${tier === 1 ? "border-cyan bg-cyan-50/50" : "border-line"}`}>
                        {countyPage ? (
                          <Link
                            href={`/service-area/${countyPage.slug}`}
                            className="group flex items-center justify-between gap-3 font-display text-xl font-bold uppercase text-ink hover:text-cyan-deep"
                          >
                            {countyPage.heading ?? `Roofing in ${c.name}`}
                            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
                          </Link>
                        ) : (
                          <p className="font-display text-xl font-bold uppercase text-ink">{c.name}</p>
                        )}
                        {cityPages.length ? (
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {cityPages.map((l) => (
                              <li key={l.slug}>
                                <Link
                                  href={`/service-area/${l.slug}`}
                                  className="inline-flex min-h-9 items-center rounded-full bg-white px-3.5 text-sm font-semibold text-ink ring-1 ring-line transition-colors hover:bg-cyan hover:ring-cyan"
                                >
                                  Roofing in {l.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
          <p className="mt-10 text-body">
            Looking for the overview?{" "}
            <Link href="/service-area/roofing-service-maryland" className="font-semibold text-cyan-deep underline underline-offset-4">
              Roofing services across Maryland
            </Link>
          </p>
        </div>
      </section>
      <ServiceAreas counties={counties} locations={locations} tone="mist" phone={settings.phone} />
      <ContactSection settings={settings} />
    </>
  );
}
