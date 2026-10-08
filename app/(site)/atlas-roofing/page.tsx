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

export const revalidate = 300;

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
          <div className="mt-10 inline-flex items-center gap-5 rounded-[var(--radius-card)] bg-white p-4 pr-6">
            <span className="relative block h-20 w-20">
              <Image src={page.badge.src} alt={page.badge.alt} fill sizes="80px" className="object-contain" />
            </span>
            <span className="font-bold text-ink">{page.badge.alt}</span>
          </div>
        ) : null}
      </PageHero>

      {page.sections.map((b, i) => (
        <FeatureSection key={b.title} block={b} index={i} tone={i % 2 ? "mist" : "white"} />
      ))}

      {page.products.length ? (
        <section className={`section ${page.sections.length % 2 ? "bg-mist" : "bg-white"}`}>
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
