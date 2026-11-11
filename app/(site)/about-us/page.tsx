import type { Metadata } from "next";
import Image from "next/image";
import { counties, getAboutPage, getLocations, getProjects, getSiteSettings, getTestimonials } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/data/images";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { CardGrid } from "@/components/sections/CardGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BbbBadge } from "@/components/ui/BbbBadge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage();
  return pageMetadata(page.seo, "/about-us", page.hero.image);
}

export default async function AboutPage() {
  const [page, settings, testimonials, locations, projects] = await Promise.all([getAboutPage(), getSiteSettings(), getTestimonials(), getLocations(), getProjects()]);
  return (
    <>
      <PageHero hero={page.hero} crumbs={[{ label: "About us", href: "/about-us" }]} />
      {page.facts.length ? (
        <section className="border-b border-line bg-white">
          <dl className="container-x grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-5">
            {page.facts.map((f) => (
              <div key={f.label} className="bg-white px-2 py-7 text-center">
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-meta">{f.label}</dt>
                <dd className="mt-1.5 font-display text-xl font-bold uppercase text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="container-x flex flex-wrap items-center justify-center gap-3 border-t border-line py-6">
            <BbbBadge bbb={settings.bbb} />
            {settings.reviewsUrl && settings.googleRating ? (
              <a href={settings.reviewsUrl} target="_blank" rel="noopener" data-track="google_reviews" className="inline-flex items-center gap-3 rounded-[var(--radius-card)] border border-line bg-white px-4 py-3 text-sm font-bold text-ink transition-colors hover:border-cyan">
                <span className="font-display text-2xl leading-none">{settings.googleRating}</span>
                <span>
                  Google rating{settings.reviewCount ? ` · ${settings.reviewCount} reviews` : ""}
                  <span className="block text-[0.8125rem] font-semibold text-cyan-deep">Read our reviews on Google</span>
                </span>
              </a>
            ) : null}
          </div>
        </section>
      ) : null}
      {page.sections.slice(0, 1).map((b, i) => (
        <FeatureSection key={b.title} block={b} index={i} tone="white" />
      ))}

      {page.team.length ? (
        <section id="team" className="section bg-mist">
          <div className="container-x">
            <SectionHeading {...page.teamIntro} />
            {page.teamPhoto ? (
              <figure className="mx-auto mt-12 max-w-md overflow-hidden rounded-[var(--radius-card)] border border-line bg-white" data-reveal>
                <Image src={page.teamPhoto.src} alt={page.teamPhoto.alt} width={page.teamPhoto.width} height={page.teamPhoto.height} sizes="(min-width: 768px) 28rem, 100vw" className="h-auto w-full" />
                <figcaption className="px-5 py-3 text-center text-sm font-semibold text-ink">Roberto and Fredy Pineda</figcaption>
              </figure>
            ) : null}
            <ul className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
              {page.team.map((p, i) => (
                <li key={p.name} className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white" data-reveal style={{ "--i": i } as React.CSSProperties}>
                  {p.image ? (
                    <div className="relative aspect-[872/816] bg-mist">
                      <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 768px) 32rem, 100vw" className="object-cover" />
                    </div>
                  ) : null}
                  <div className="p-7">
                    <p className="eyebrow plain">{p.role}</p>
                    <h3 className="mt-2 text-h3 uppercase text-ink">
                      <Link href={`/about-us/${p.slug}`} className="hover:text-cyan-deep">
                        {p.name}
                      </Link>
                    </h3>
                    {p.text ? <p className="mt-3 text-body">{p.text}</p> : null}
                    <Link href={`/about-us/${p.slug}`} className="mt-5 inline-flex items-center gap-2 font-bold uppercase tracking-[0.08em] text-cyan-deep hover:underline">
                      Meet {p.name.split(" ")[0]}
                      <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section id="don-eagle" className="section overflow-hidden bg-white">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {page.mascot.image ? (
            <div className="relative mx-auto w-full max-w-sm" data-reveal>
              <span aria-hidden="true" className="absolute inset-x-4 bottom-0 top-16 -z-0 rounded-[var(--radius-card)] bg-cyan-50" />
              <Image
                src={page.mascot.image.src}
                alt={page.mascot.image.alt}
                width={page.mascot.image.width}
                height={page.mascot.image.height}
                sizes="(min-width: 1024px) 24rem, 80vw"
                className="relative mx-auto h-auto w-4/5 drop-shadow-[0_24px_30px_rgb(11_13_16/0.25)]"
              />
            </div>
          ) : null}
          <div>
            {page.mascot.eyebrow ? <p className="eyebrow">{page.mascot.eyebrow}</p> : null}
            <h2 className="mt-3 text-h2 uppercase text-ink">{page.mascot.heading}</h2>
            <span aria-hidden="true" className="mt-5 block h-1 w-16 rounded-full bg-cyan" />
            {page.mascot.lead ? <p className="mt-6 text-lg text-ink">{page.mascot.lead}</p> : null}
            {page.mascot.paragraphs.map((t) => (
              <p key={t} className="mt-4 text-body">
                {t}
              </p>
            ))}
            {page.mascot.verse ? (
              <figure className="mt-8 border-l-4 border-cyan bg-cyan-50 px-6 py-5">
                <blockquote className="text-lg italic text-ink">“{page.mascot.verse.text}”</blockquote>
                <figcaption className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-cyan-deep">{page.mascot.verse.reference}</figcaption>
              </figure>
            ) : null}
          </div>
        </div>
      </section>

      <CardGrid intro={page.valuesIntro} cards={page.values} tone="dark" />

      {page.sections.slice(1).map((b, i) => (
        <FeatureSection key={b.title} block={b} index={i + 1} tone={i % 2 ? "mist" : "white"} />
      ))}
      <section className="bg-cyan-50 py-14">
        <figure className="container-x flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          <Image src={images.eagleDoubleThumbs.src} alt="" width={images.eagleDoubleThumbs.width} height={images.eagleDoubleThumbs.height} sizes="120px" className="h-36 w-auto" />
          <div>
            <blockquote className="font-display text-h3 uppercase text-ink">“Everyone who hears these words of mine and puts them into practice is like a wise man who built his house on the rock.”</blockquote>
            <figcaption className="mt-2 font-bold uppercase tracking-[0.16em] text-cyan-deep">Matthew 7:24</figcaption>
          </div>
        </figure>
      </section>
      <Testimonials items={testimonials} settings={settings} />
      <ServiceAreas counties={counties} locations={locations} phone={settings.phone} projects={projects} />
      <CtaBand heading="Ready to talk?" text="Free inspection, no pressure. We will tell you straight what your roof actually needs." phone={settings.phone} phoneHref={settings.phoneHref} />
    </>
  );
}
