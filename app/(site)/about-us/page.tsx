import type { Metadata } from "next";
import Image from "next/image";
import { counties, getAboutPage, getLocations, getSiteSettings, getTestimonials } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/data/images";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { CardGrid } from "@/components/sections/CardGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { CtaBand } from "@/components/sections/CtaBand";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage();
  return pageMetadata(page.seo, "/about-us", page.hero.image);
}

export default async function AboutPage() {
  const [page, settings, testimonials, locations] = await Promise.all([getAboutPage(), getSiteSettings(), getTestimonials(), getLocations()]);
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
        </section>
      ) : null}
      {page.sections.map((b, i) => (
        <FeatureSection key={b.title} block={b} index={i} tone={i % 2 ? "mist" : "white"} />
      ))}
      <CardGrid intro={page.valuesIntro} cards={page.values} tone="dark" />
      <section className="bg-cyan-50 py-14">
        <figure className="container-x flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          <Image src={images.eagleDoubleThumbs.src} alt="" width={images.eagleDoubleThumbs.width} height={images.eagleDoubleThumbs.height} sizes="120px" className="h-36 w-auto" />
          <div>
            <blockquote className="font-display text-h3 uppercase text-ink">“Serve wholeheartedly, as if you were serving the Lord, not people.”</blockquote>
            <figcaption className="mt-2 font-bold uppercase tracking-[0.16em] text-cyan-deep">Ephesians 6:7</figcaption>
          </div>
        </figure>
      </section>
      <Testimonials items={testimonials} settings={settings} />
      <ServiceAreas counties={counties} locations={locations} phone={settings.phone} />
      <CtaBand heading="Ready to talk?" text="Free inspection, no pressure. We will tell you straight what your roof actually needs." phone={settings.phone} phoneHref={settings.phoneHref} />
    </>
  );
}
