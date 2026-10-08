import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocation, getLocations, getServices, getSiteSettings, getTestimonials } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/data/images";
import { fallbackLocations } from "@/lib/data/locations";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { CardGrid } from "@/components/sections/CardGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactSection } from "@/components/sections/ContactSection";

export const revalidate = 300;

export async function generateStaticParams() {
  return fallbackLocations.filter((l) => l.featured).map((l) => ({ slug: l.slug }));
}

export async function generateMetadata(props: PageProps<"/service-area/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const loc = await getLocation(slug);
  if (!loc) return {};
  const seo = loc.seo ?? {
    title: `Roofing in ${loc.name} | Pineda's Roofing`,
    description: `Roof replacement, repair and storm restoration in ${loc.name}. Family-owned since 1992, MHIC# 142024. Free inspections.`,
  };
  return pageMetadata(seo, `/service-area/${slug}`);
}

export default async function LocationPage(props: PageProps<"/service-area/[slug]">) {
  const { slug } = await props.params;
  const [loc, locations, services, settings, testimonials] = await Promise.all([getLocation(slug), getLocations(), getServices(), getSiteSettings(), getTestimonials()]);
  if (!loc) notFound();
  const nearby = locations.filter((l) => l.featured && l.slug !== slug && l.county && l.county === loc.county).slice(0, 6);

  return (
    <>
      <PageHero
        hero={{ eyebrow: loc.county ?? "Service area", heading: `Roofing in ${loc.name}`, text: loc.lead, image: images.homeNewRoofAerial }}
        crumbs={[
          { label: "Service area", href: "/service-area" },
          { label: loc.name, href: `/service-area/${slug}` },
        ]}
        ctas={[
          { label: "Get a free estimate", href: "#estimate" },
          { label: settings.phone, href: settings.phoneHref },
        ]}
      />
      <FeatureSection
        block={{
          icon: "map-pin",
          eyebrow: `${loc.name} roofers`,
          title: `Your local roofer in ${loc.name}`,
          paragraphs: loc.paragraphs,
          highlightsLabel: "What you get",
          highlights: loc.highlights,
          image: images.rooferOnRidge,
        }}
      />
      {loc.neighborhoods?.length ? (
        <section className="bg-mist py-10">
          <div className="container-x flex flex-wrap items-center gap-3">
            <p className="eyebrow plain mr-2">Neighborhoods we serve</p>
            {loc.neighborhoods.map((n) => (
              <span key={n} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink ring-1 ring-line">
                {n}
              </span>
            ))}
          </div>
        </section>
      ) : null}
      <CardGrid
        intro={{ eyebrow: "Services", heading: `Roofing services in ${loc.name}` }}
        cards={services.filter((s) => s.category !== "exterior").map((s) => ({ icon: s.icon, title: s.title, text: s.summary, href: `/services/${s.slug}` }))}
      />
      <Testimonials items={testimonials} settings={settings} />
      {nearby.length ? (
        <section className="bg-white py-14">
          <div className="container-x">
            <h2 className="text-h3 uppercase text-ink">Nearby areas</h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {nearby.map((l) => (
                <li key={l.slug}>
                  <Link href={`/service-area/${l.slug}`} className="inline-flex min-h-11 items-center rounded-full border-2 border-line px-5 font-semibold text-ink hover:border-cyan hover:bg-cyan-50">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <ContactSection settings={settings} heading={`Free roof estimate in ${loc.name}`} />
    </>
  );
}
