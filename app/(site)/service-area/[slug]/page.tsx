import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { counties, getLocation, getLocations, getServices, getSiteSettings, getTestimonials } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { locationSchema } from "@/lib/schema";
import { images } from "@/lib/data/images";
import { fallbackLocations } from "@/lib/data/locations";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { CardGrid } from "@/components/sections/CardGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { JsonLd } from "@/components/ui/JsonLd";

export async function generateStaticParams() {
  return fallbackLocations.filter((l) => l.featured).map((l) => ({ slug: l.slug }));
}

export async function generateMetadata(props: PageProps<"/service-area/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const loc = await getLocation(slug);
  if (!loc) return {};
  const seo = loc.seo ?? {
    title: `Roofing Contractor in ${loc.name} | Pineda's Roofing`,
    description: `Roof replacement, repair and storm restoration in ${loc.name}. Family-owned roofing contractor in Silver Spring, MD. Free inspections.`,
  };
  return pageMetadata(seo, `/service-area/${slug}`);
}

/* Real job photos, rotated so neighbouring city pages don't all show the same house. */
const heroPhotos = [images.homeNewRoofAerial, images.aerialNewShingleRoof, images.rooferOnRidge, images.crew, images.underlaymentInstall, images.shingleRepairPatch];

export default async function LocationPage(props: PageProps<"/service-area/[slug]">) {
  const { slug } = await props.params;
  const [loc, locations, services, settings, testimonials] = await Promise.all([getLocation(slug), getLocations(), getServices(), getSiteSettings(), getTestimonials()]);
  if (!loc) notFound();

  const path = `/service-area/${slug}`;
  const isCounty = loc.kind === "county";
  const isDc = loc.state === "DC";
  // "Baltimore County, MD" / "Washington, D.C."
  const place = isDc ? loc.name : `${loc.name}, ${loc.state}`;
  const shortPlace = loc.name === "Washington, D.C." ? "Washington, DC" : loc.name;

  const countyEntry = counties.find((c) => c.slug === slug);
  const countyPage = !isCounty && loc.county ? locations.find((l) => l.kind === "county" && l.name === loc.county) : undefined;
  const cityLinks = isCounty
    ? (countyEntry?.cities ?? []).map((name) => ({ name, page: locations.find((l) => l.featured && l.kind !== "county" && l.name.toLowerCase() === name.toLowerCase()) }))
    : [];
  const siblings = locations.filter((l) => l.featured && l.slug !== slug && l.kind !== "county" && l.county && l.county === loc.county).slice(0, 6);
  const otherCounties = isCounty ? locations.filter((l) => l.kind === "county" && l.slug !== slug && (l.tier ?? 3) <= 2) : [];

  const h1 = isDc ? "Solar company and roofing contractor in Washington, DC" : `Roofing contractor in ${place}`;
  const roofingCards = services.filter((s) => s.category !== "exterior" && s.category !== "solar");
  const solar = services.find((s) => s.category === "solar");

  return (
    <>
      <JsonLd data={locationSchema(loc, path)} />
      <PageHero
        hero={{ eyebrow: loc.county ?? (isCounty ? "Service area" : "Service area"), heading: h1, text: loc.lead, image: heroPhotos[locations.findIndex((l) => l.slug === slug) % heroPhotos.length] }}
        crumbs={[
          { label: "Service area", href: "/service-area" },
          ...(countyPage ? [{ label: countyPage.name, href: `/service-area/${countyPage.slug}` }] : []),
          { label: loc.name, href: path },
        ]}
        ctas={[
          { label: "Get a free estimate", href: "#estimate" },
          { label: settings.phone, href: settings.phoneHref },
        ]}
      />
      <FeatureSection
        block={{
          icon: "map-pin",
          eyebrow: `${shortPlace} roofers`,
          title: isDc ? "Your local roofer and solar company in Washington, DC" : `Your local roofing contractor in ${shortPlace}`,
          paragraphs: loc.paragraphs,
          highlightsLabel: "What you get",
          highlights: loc.highlights,
          image: images.rooferOnRidge,
        }}
      />
      {loc.neighborhoods?.length ? (
        <section className="bg-mist py-10">
          <div className="container-x flex flex-wrap items-center gap-3">
            <p className="eyebrow plain mr-2">Neighborhoods we serve in {shortPlace}</p>
            {loc.neighborhoods.map((n) => (
              <span key={n} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink ring-1 ring-line">
                {n}
              </span>
            ))}
          </div>
        </section>
      ) : null}
      {cityLinks.length ? (
        <section className="bg-white py-14">
          <div className="container-x">
            <h2 className="text-h3 uppercase text-ink">Roofing in the cities and towns of {loc.name}</h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {cityLinks.map(({ name, page }) => (
                <li key={name}>
                  {page ? (
                    <Link href={`/service-area/${page.slug}`} className="inline-flex min-h-11 items-center rounded-full border-2 border-line px-5 font-semibold text-ink hover:border-cyan hover:bg-cyan-50">
                      Roofing contractor in {name}
                    </Link>
                  ) : (
                    <span className="inline-flex min-h-11 items-center rounded-full bg-mist px-5 text-body">{name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      {loc.sections?.map((b, i) => (
        <FeatureSection key={b.title} block={b} index={i + 1} tone={i % 2 ? "white" : "mist"} />
      ))}
      <CardGrid
        intro={{ eyebrow: "Services", heading: `Roofing and solar services in ${shortPlace}`, text: `Roof repair, roof replacement, storm damage restoration and more for homes and businesses in ${shortPlace}.` }}
        cards={[
          ...roofingCards.map((s) => ({ icon: s.icon, title: `${s.title} in ${shortPlace}`, text: s.summary, href: `/services/${s.slug}` })),
          ...(solar ? [{ icon: solar.icon, title: `${solar.title} in ${shortPlace}`, text: solar.summary, href: `/services/${solar.slug}` }] : []),
        ]}
      />
      <Testimonials items={testimonials} settings={settings} />
      <FaqSection intro={{ eyebrow: "FAQ", heading: `${shortPlace} roofing questions` }} items={loc.faqs ?? []} tone="white" />
      {countyPage || siblings.length || otherCounties.length ? (
        <section className="bg-mist py-14">
          <div className="container-x">
            <h2 className="text-h3 uppercase text-ink">{isCounty ? "Other areas we serve" : "Nearby areas"}</h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {countyPage ? (
                <li>
                  <Link href={`/service-area/${countyPage.slug}`} className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 font-semibold text-white hover:bg-ink-3">
                    All of {countyPage.name}
                  </Link>
                </li>
              ) : null}
              {[...siblings, ...otherCounties].map((l) => (
                <li key={l.slug}>
                  <Link href={`/service-area/${l.slug}`} className="inline-flex min-h-11 items-center rounded-full border-2 border-line bg-white px-5 font-semibold text-ink hover:border-cyan hover:bg-cyan-50">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <section className="bg-white py-10">
        <div className="container-x flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-xl text-body">Want to see how we work? Look at our project examples to see the problem, what we did and photos from real jobs.</p>
          <Link href="/projects" className="inline-flex min-h-11 items-center rounded-full border-2 border-line px-5 font-semibold text-ink hover:border-cyan hover:bg-cyan-50">
            Roofing project examples
          </Link>
        </div>
      </section>
      <ContactSection settings={settings} heading={`Free ${isDc ? "solar and roof" : "roof"} estimate in ${shortPlace}`} defaultService={isDc ? "Solar" : undefined} />
    </>
  );
}
