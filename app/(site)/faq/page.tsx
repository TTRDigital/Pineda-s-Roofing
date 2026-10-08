import type { Metadata } from "next";
import { getFaqs, getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/data/images";
import { PageHero } from "@/components/sections/PageHero";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { JsonLd, faqPageSchema } from "@/components/ui/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";

export const revalidate = 300;

const seo = {
  title: "Roofing FAQ | Pineda's Roofing",
  description: "Answers about roof replacement, repairs, insurance claims, warranties, timelines and service areas from Pineda's Roofing in Silver Spring, MD.",
};

export const metadata: Metadata = pageMetadata(seo, "/faq", images.rooferOnRidge);

export default async function FaqPage() {
  const [faqs, settings] = await Promise.all([getFaqs(), getSiteSettings()]);
  const groups = Array.from(new Set(faqs.map((f) => f.category ?? "General")));
  return (
    <>
      <PageHero
        hero={{ eyebrow: "FAQ", heading: "Straight answers", text: `Can't find your question? Call ${settings.phone} and talk to a person.` }}
        crumbs={[{ label: "FAQ", href: "/faq" }]}
      />
      <section className="section bg-mist">
        <div className="container-x grid gap-14">
          {groups.map((g) => (
            <div key={g} className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
              <h2 className="text-h3 uppercase text-ink lg:sticky lg:top-36 lg:self-start">{g}</h2>
              <FaqAccordion items={faqs.filter((f) => (f.category ?? "General") === g)} />
            </div>
          ))}
        </div>
      </section>
      <JsonLd data={faqPageSchema(faqs)} />
      <CtaBand phone={settings.phone} phoneHref={settings.phoneHref} />
    </>
  );
}
