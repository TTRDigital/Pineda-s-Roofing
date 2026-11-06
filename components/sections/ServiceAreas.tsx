import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Location } from "@/lib/types";
import type { County } from "@/lib/data/locations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceAreaMap } from "@/components/sections/ServiceAreaMap";

/** Map of the service area plus every county with its cities; cities with a page link to it. */
export function ServiceAreas({
  counties,
  locations,
  tone = "white",
  phone,
}: {
  counties: County[];
  locations: Location[];
  tone?: "white" | "mist";
  phone: string;
}) {
  const pageFor = (city: string) => locations.find((l) => l.featured && l.kind !== "county" && l.name.toLowerCase() === city.toLowerCase());
  const hasCountyPage = (slug: string) => locations.some((l) => l.featured && l.slug === slug);
  const groups = [
    { label: "Main service areas", list: counties.filter((c) => c.tier === 1) },
    { label: "Also serving", list: counties.filter((c) => c.tier === 2) },
    { label: "Solar and more", list: counties.filter((c) => c.tier === 3) },
  ].filter((g) => g.list.length);
  return (
    <section className={`section ${tone === "mist" ? "bg-mist" : "bg-white"}`}>
      <div className="container-x">
        <SectionHeading
          eyebrow="Service area"
          heading="Roofing contractor across Maryland, county by county"
          text={`Based in Silver Spring, MD and serving Baltimore County, Baltimore City, Howard, Anne Arundel and Prince George's counties, plus Carroll, Frederick and Montgomery. Not sure if you're in our area? Call ${phone} and we'll tell you straight away.`}
        />
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-28" data-reveal>
            <ServiceAreaMap counties={counties} locations={locations} />
          </div>
          <div className="grid gap-8">
            {groups.map((g) => (
              <div key={g.label}>
                <h3 className="eyebrow plain mb-4">{g.label}</h3>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {g.list.map((c, i) => (
                    <li key={c.name} className="rounded-[var(--radius-card)] border border-line bg-white p-5" data-reveal style={{ "--i": Math.min(i, 6) } as React.CSSProperties}>
                      <p className="flex items-center gap-2.5 font-display text-xl font-bold uppercase text-ink">
                        <MapPin className="h-5 w-5 shrink-0 text-cyan-deep" strokeWidth={2.25} aria-hidden="true" />
                        {hasCountyPage(c.slug) ? (
                          <Link href={`/service-area/${c.slug}`} className="hover:text-cyan-deep">
                            {c.name}
                          </Link>
                        ) : (
                          c.name
                        )}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {c.cities.map((city) => {
                          const page = pageFor(city);
                          return (
                            <li key={city}>
                              {page ? (
                                <Link href={`/service-area/${page.slug}`} className="inline-flex min-h-9 items-center rounded-full bg-cyan-50 px-3.5 text-sm font-semibold text-ink ring-1 ring-cyan-100 transition-colors hover:bg-cyan hover:ring-cyan">
                                  {city}
                                </Link>
                              ) : (
                                <span className="inline-flex min-h-9 items-center rounded-full bg-mist px-3.5 text-sm text-body">{city}</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
