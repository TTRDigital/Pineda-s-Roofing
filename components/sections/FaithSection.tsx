import { Quote } from "lucide-react";
import type { FeatureBlock, Verse } from "@/lib/types";
import { IconTile } from "@/components/ui/Icon";
import { HighlightBoxes } from "@/components/ui/HighlightBoxes";

/** "Our foundation": the faith behind the business, with scripture cards beside it. */
export function FaithSection({ faith }: { faith: FeatureBlock & { verses: Verse[] } }) {
  const [main, ...more] = faith.verses;
  return (
    <section id={faith.anchor} className="section bg-mist">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <div>
          {faith.icon ? (
            <div data-reveal>
              <IconTile name={faith.icon} />
            </div>
          ) : null}
          {faith.eyebrow ? (
            <p className="eyebrow mt-6" data-reveal>
              {faith.eyebrow}
            </p>
          ) : null}
          <h2 className="mt-4 text-h2 uppercase text-ink" data-reveal>
            {faith.title}
          </h2>
          <span className="accent-rule mt-5" aria-hidden="true" />
          {faith.lead ? (
            <p className="mt-6 text-lead text-ink" data-reveal>
              {faith.lead}
            </p>
          ) : null}
          {faith.paragraphs?.length ? (
            <div className="prose-short mt-5 text-body" data-reveal>
              {faith.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          ) : null}
          {faith.highlights?.length ? (
            <div className="mt-8">
              <HighlightBoxes items={faith.highlights} label={faith.highlightsLabel} />
            </div>
          ) : null}
        </div>

        {main ? (
          <div className="grid gap-4">
            <figure className="on-dark relative overflow-hidden rounded-[var(--radius-card)] bg-ink p-8 sm:p-10" data-reveal>
              <Quote className="absolute -right-2 -top-2 h-28 w-28 text-cyan/15" strokeWidth={1.5} aria-hidden="true" />
              <blockquote className="relative font-display text-[clamp(1.6rem,1.3rem+1.2vw,2.25rem)] uppercase leading-tight text-white">“{main.text}”</blockquote>
              <figcaption className="relative mt-5 font-bold uppercase tracking-[0.16em] text-cyan">{main.reference}</figcaption>
            </figure>
            {more.map((v, i) => (
              <figure key={v.reference} className="rounded-[var(--radius-card)] border border-cyan-100 bg-white p-6" data-reveal style={{ "--i": i + 1 } as React.CSSProperties}>
                <blockquote className="text-[1.0625rem] font-semibold leading-relaxed text-ink">“{v.text}”</blockquote>
                <figcaption className="mt-3 text-sm font-bold uppercase tracking-[0.14em] text-cyan-deep">{v.reference}</figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
