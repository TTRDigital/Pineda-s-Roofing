import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { counties, getLocation, getLocations, getPosts, getProjects, getServices, getSiteSettings, getTestimonials } from "@/lib/content";
import { projectsFor } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/data/images";
import { fallbackLocations } from "@/lib/data/locations";
import type { Location } from "@/lib/types";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { CardGrid } from "@/components/sections/CardGrid";
import { FaqSection } from "@/components/sections/FaqSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Gallery } from "@/components/gallery/Gallery";

export async function generateStaticParams() {
  return fallbackLocations.filter((l) => l.featured).map((l) => ({ slug: l.slug }));
}

/* "Roofing Contractor in Bowie, MD": the plain service + place term people search for. */
function headingFor(loc: Location) {
  if (loc.heading) return loc.heading;
  const withState = loc.state === "MD" && loc.kind !== "region";
  return `Roofing Contractor in ${loc.name}${withState ? ", MD" : ""}`;
}

export async function generateMetadata(props: PageProps<"/service-area/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const loc = await getLocation(slug);
  if (!loc) return {};
  const seo = loc.seo ?? {
    title: `${headingFor(loc)} | Pineda's Roofing`,
    description: `Roofing contractor in ${loc.name}: roof replacement, roof repair and storm restoration. Family-owned, MHIC# 142024. Free inspections.`,
  };
  return pageMetadata(seo, `/service-area/${slug}`);
}

/* Real job photos, rotated so neighbouring city pages don't all show the same house. */
const heroPhotos = [images.homeNewRoofAerial, images.aerialNewShingleRoof, images.rooferOnRidge, images.crew, images.underlaymentInstall, images.shingleRepairPatch];

export default async function LocationPage(props: PageProps<"/service-area/[slug]">) {
  const { slug } = await props.params;
  const [loc, locations, services, settings, testimonials, projects] = await Promise.all([
    getLocation(slug),
    getLocations(),
    getServices(),
    getSiteSettings(),
    getTestimonials(),
    getProjects(),
  ]);
  if (!loc) notFound();
  const posts = (await getPosts()).filter((p) => p.areas?.includes(slug));
  const pastProjects = projectsFor(loc, projects, locations);

  const isCounty = loc.kind === "county";
  const pages = locations.filter((l) => l.featured);
  const county = counties.find((c) => c.page === slug || c.name === loc.county);
  const countyPage = !isCounty && county?.page && county.page !== slug ? pages.find((l) => l.slug === county.page) : undefined;
  // County pages list their city pages; city pages link to neighbours in the same county.
  const cityPagesHere = isCounty ? pages.filter((l) => l.county === loc.name) : [];
  const nearby = isCounty ? [] : pages.filter((l) => l.slug !== slug && l.county && l.county === loc.county).slice(0, 6);
  const solar = services.find((s) => s.category === "solar");
  const solarFirst = loc.heading?.toLowerCase().startsWith("solar");
  const roofing = services.filter((s) => s.category !== "exterior" && s.category !== "solar");
  const serviceCards = [...(solar && solarFirst ? [solar] : []), ...roofing, ...(solar && !solarFirst ? [solar] : [])].map((s) => ({
    icon: s.icon,
    title: s.title,
    text: s.summary,
    href: `/services/${s.slug}`,
  }));

  return (
    <>
      <PageHero
        hero={{
          eyebrow: loc.county ?? (isCounty ? (loc.tier === 1 ? "Main service area" : "Service area") : "Service area"),
          heading: headingFor(loc),
          text: loc.lead,
          image: heroPhotos[locations.findIndex((l) => l.slug === slug) % heroPhotos.length],
        }}
        crumbs={[
          { label: "Service area", href: "/service-area" },
          ...(countyPage ? [{ label: countyPage.name, href: `/service-area/${countyPage.slug}` }] : []),
          { label: loc.name, href: `/service-area/${slug}` },
        ]}
        ctas={[
          { label: solarFirst ? "Get a free solar assessment" : "Get a free estimate", href: "#estimate" },
          { label: settings.phone, href: settings.phoneHref },
        ]}
      />
      <FeatureSection
        block={{
          icon: "map-pin",
          eyebrow: solarFirst ? `Solar and roofing in ${loc.name}` : `Roofing in ${loc.name}`,
          title: solarFirst ? `Your local solar company in ${loc.name}` : `Your local roofing contractor in ${loc.name}`,
          paragraphs: loc.paragraphs,
          highlightsLabel: "What you get",
          highlights: loc.highlights,
          image: images.rooferOnRidge,
        }}
      />

      {loc.sections?.length ? (
        <section className="section bg-mist">
          <div className="container-x grid gap-6 lg:grid-cols-2">
            {loc.sections.map((sec, i) => (
              <article key={sec.heading} className={`rounded-[var(--radius-card)] border border-line bg-white p-7 sm:p-9 ${loc.sections!.length % 2 && i === loc.sections!.length - 1 ? "lg:col-span-2" : ""}`} data-reveal style={{ "--i": i } as React.CSSProperties}>
                <span aria-hidden="true" className="block h-1 w-12 rounded-full bg-cyan" />
                <h2 className="mt-5 text-h3 uppercase text-ink">{sec.heading}</h2>
                {sec.paragraphs.map((t) => (
                  <p key={t} className="mt-4 text-body">
                    {t}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {pastProjects.length ? (
        <section id="past-projects" className="section bg-white">
          <div className="container-x">
            <SectionHeading
              eyebrow="Past projects"
              heading={`Past roofing projects in ${loc.name}`}
              text={`Real jobs we've completed in ${loc.name}: what the problem was and what we did. Tap a project to see every photo.`}
            />
            <div className="mt-12">
              <Gallery projects={pastProjects} filters={false} />
            </div>
          </div>
        </section>
      ) : null}

      {loc.neighborhoods?.length ? (
        <section className="border-y border-line bg-white py-10">
          <div className="container-x flex flex-wrap items-center gap-3">
            <p className="eyebrow plain mr-2">{isCounty ? `Communities we serve in ${loc.name}` : "Neighborhoods we serve"}</p>
            {loc.neighborhoods.map((n) => {
              const page = pages.find((l) => l.name === n && l.slug !== slug);
              return page ? (
                <Link key={n} href={`/service-area/${page.slug}`} className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-ink ring-1 ring-cyan-100 transition-colors hover:bg-cyan hover:ring-cyan">
                  {n}
                </Link>
              ) : (
                <span key={n} className="rounded-full bg-mist px-4 py-2 text-sm font-semibold text-ink ring-1 ring-line">
                  {n}
                </span>
              );
            })}
          </div>
        </section>
      ) : null}

      {cityPagesHere.length ? (
        <section className="section bg-white">
          <div className="container-x">
            <SectionHeading eyebrow={loc.name} heading={`Roofing contractor near you in ${loc.name}`} />
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cityPagesHere.map((l) => (
                <li key={l.slug}>
                  <Link href={`/service-area/${l.slug}`} className="group flex min-h-16 items-center justify-between gap-4 rounded-[var(--radius-card)] border border-line px-5 py-4 transition-colors hover:border-cyan hover:bg-cyan-50">
                    <span className="font-bold text-ink">Roofing contractor in {l.name}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CardGrid
        intro={{
          eyebrow: "Services",
          heading: solarFirst ? `Solar and roofing services in ${loc.name}` : `Roofing services in ${loc.name}`,
        }}
        cards={serviceCards}
      />
      {loc.faqs?.length ? <FaqSection intro={{ eyebrow: "FAQ", heading: `${loc.name} roofing questions` }} items={loc.faqs} /> : null}
      {posts.length ? (
        <section className="bg-mist py-14">
          <div className="container-x">
            <h2 className="text-h3 uppercase text-ink">From our blog: {loc.name}</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-6 transition-colors hover:border-cyan">
                    <span className="font-display text-xl font-bold uppercase text-ink group-hover:text-cyan-deep">{p.title}</span>
                    <span className="mt-2 text-body">{p.excerpt}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <Testimonials items={testimonials} settings={settings} />
      {nearby.length || countyPage ? (
        <section className="bg-white py-14">
          <div className="container-x">
            <h2 className="text-h3 uppercase text-ink">Nearby areas</h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {countyPage ? (
                <li>
                  <Link href={`/service-area/${countyPage.slug}`} className="inline-flex min-h-11 items-center rounded-full border-2 border-cyan bg-cyan-50 px-5 font-semibold text-ink hover:bg-cyan">
                    All of {countyPage.name}
                  </Link>
                </li>
              ) : null}
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
      <ContactSection settings={settings} heading={solarFirst ? `Free solar assessment in ${loc.name}` : `Free roof estimate in ${loc.name}`} />
    </>
  );
}
