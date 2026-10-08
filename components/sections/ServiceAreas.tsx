import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Location } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Counties with their cities; cities with a page link to it. */
export function ServiceAreas({
  counties,
  locations,
  tone = "white",
  phone,
}: {
  counties: { name: string; state: string; cities: string[] }[];
  locations: Location[];
  tone?: "white" | "mist";
  phone: string;
}) {
  const pageFor = (city: string) => locations.find((l) => l.featured && l.name.toLowerCase() === city.toLowerCase());
  return (
    <section className={`section ${tone === "mist" ? "bg-mist" : "bg-white"}`}>
      <div className="container-x">
        <SectionHeading
          eyebrow="Service area"
          heading="Maryland & the DMV, county by county"
          text={`Local crews and three decades in these communities. Not sure if you're in our area? Call ${phone} and we'll tell you straight away.`}
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {counties.map((c, i) => (
            <li key={c.name} className="rounded-[var(--radius-card)] border border-line bg-white p-6" data-reveal style={{ "--i": Math.min(i, 6) } as React.CSSProperties}>
              <p className="flex items-center gap-2.5 font-display text-xl font-bold uppercase text-ink">
                <MapPin className="h-5 w-5 text-cyan-deep" strokeWidth={2.25} aria-hidden="true" />
                {c.name}
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
    </section>
  );
}
