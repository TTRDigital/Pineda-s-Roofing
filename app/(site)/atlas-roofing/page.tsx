import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { getAtlasPage, getHome, getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { CardGrid } from "@/components/sections/CardGrid";
import { RoofDiagram } from "@/components/sections/RoofDiagram";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionHeading } from "@/components/ui/SectionHeading";


export async function generateMetadata(): Promise<Metadata> {
  const page = await getAtlasPage();
  return pageMetadata(page.seo, "/atlas-roofing", page.hero.image);
}

export default async function AtlasPage() {
  const [page, settings, home] = await Promise.all([getAtlasPage(), getSiteSettings(), getHome()]);
  return (
    <>
      <PageHero
        hero={page.hero}
        crumbs={[
          { label: "Roofing", href: "/services/roofing" },
          { label: "Atlas Roofing", href: "/atlas-roofing" },
        ]}
        ctas={[
          { label: "Get a free estimate", href: "#estimate" },
          { label: settings.phone, href: settings.phoneHref },
        ]}
      >
        {page.badge ? (
          <div className="mt-10 inline-flex items-center gap-5 rounded-[var(--radius-card)] bg-white py-4 pl-5 pr-7 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.6)]">
            <Image src={page.badge.src} alt={page.badge.alt} width={page.badge.width} height={page.badge.height} sizes="128px" className="h-20 w-auto" />
            <span className="border-l border-line pl-5">
              <span className="block text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-cyan-deep">Shingles we install</span>
              <span className="mt-1 block font-display text-2xl uppercase leading-none text-ink">Atlas Roofing</span>
            </span>
          </div>
        ) : null}
      </PageHero>

      {page.sections.slice(0, 1).map((b, i) => (
        <FeatureSection key={b.title} block={b} index={i} tone="white" />
      ))}

      {page.qualities.length ? <CardGrid intro={page.qualitiesIntro} cards={page.qualities} tone="dark" /> : null}

      {page.sections.slice(1).map((b, i) => (
        <FeatureSection key={b.title} block={b} index={i + 1} tone={i % 2 ? "white" : "mist"} />
      ))}

      {page.jobPhotos.length ? (
        <section className={`section ${page.sections.length % 2 ? "bg-mist" : "bg-white"}`}>
          <div className="container-x">
            <SectionHeading {...page.jobPhotosIntro} />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {page.jobPhotos.map((img, i) => (
                <li key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]" data-reveal style={{ "--i": i } as React.CSSProperties}>
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {page.products.length ? (
        <section className={`section ${page.jobPhotos.length ? (page.sections.length % 2 ? "bg-white" : "bg-mist") : page.sections.length % 2 ? "bg-mist" : "bg-white"}`}>
          <div className="container-x">
            <SectionHeading {...page.productsIntro} />
            <ul className="mt-12 grid gap-6 md:grid-cols-3">
              {page.products.map((p, i) => (
                <li key={p.name} className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white" data-reveal style={{ "--i": i } as React.CSSProperties}>
                  {p.image ? (
                    <div className="relative aspect-[16/10]">
                      <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-7">
                    {p.tagline ? <p className="eyebrow plain">{p.tagline}</p> : null}
                    <h3 className="mt-2 text-h3 uppercase text-ink">{p.name}</h3>
                    {p.text ? <p className="mt-3 text-body">{p.text}</p> : null}
                    {p.highlights?.length ? (
                      <ul className="mt-5 grid gap-2.5">
                        {p.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-3 rounded-lg bg-cyan-50 px-3.5 py-2.5 text-[0.95rem] font-semibold text-ink">
                            <Check className="h-4 w-4 shrink-0 text-cyan-deep" strokeWidth={3} aria-hidden="true" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CardGrid intro={page.warrantyIntro} cards={page.warranties} tone="dark" />
      <RoofDiagram intro={home.anatomyIntro} layers={home.anatomy} />
      <FaqSection intro={{ eyebrow: "FAQ", heading: "Atlas shingle questions" }} items={page.faqs} />
      <ContactSection settings={settings} defaultService="Roof replacement" />
    </>
  );
}
