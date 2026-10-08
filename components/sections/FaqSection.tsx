import type { Faq, Heading } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { JsonLd, faqPageSchema } from "@/components/ui/JsonLd";

export function FaqSection({ intro, items, tone = "mist", schema = true }: { intro: Heading; items: Faq[]; tone?: "white" | "mist"; schema?: boolean }) {
  if (!items.length) return null;
  return (
    <section className={`section ${tone === "mist" ? "bg-mist" : "bg-white"}`}>
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <SectionHeading {...intro} align="left" className="lg:sticky lg:top-36 lg:self-start" />
        <FaqAccordion items={items} />
      </div>
      {schema ? <JsonLd data={faqPageSchema(items)} /> : null}
    </section>
  );
}
