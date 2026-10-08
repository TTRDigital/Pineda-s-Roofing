import { Quote, Star } from "lucide-react";
import type { SiteSettings, Testimonial } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";

function Stars({ n, className = "h-4 w-4" }: { n: number; className?: string }) {
  return (
    <span className="flex gap-0.5 text-cyan" aria-label={`${n} out of 5 stars`} role="img">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={className} fill={i < n ? "currentColor" : "none"} strokeWidth={1.5} aria-hidden="true" />
      ))}
    </span>
  );
}

/** Google reviews on black, with the overall rating. */
export function Testimonials({ items, settings }: { items: Testimonial[]; settings: SiteSettings }) {
  if (!items.length) return null;
  return (
    <section className="section on-dark bg-ink">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Reviews" heading="Hear it from our customers" align="left" dark />
          {settings.googleRating ? (
            <a href={settings.reviewsUrl ?? "#"} target="_blank" rel="noopener" className="flex items-center gap-4 rounded-[var(--radius-card)] border border-ink-line bg-ink-2 px-5 py-4 transition-colors hover:border-cyan">
              <span className="font-display text-5xl font-bold text-white">{settings.googleRating}</span>
              <span>
                <Stars n={Math.round(Number(settings.googleRating))} className="h-5 w-5" />
                <span className="mt-1 block text-sm text-on-dark">
                  {settings.reviewCount ? `${settings.reviewCount} Google reviews` : "Google reviews"}
                </span>
              </span>
            </a>
          ) : null}
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {items.slice(0, 4).map((t, i) => (
            <li key={t.name} className="relative flex flex-col rounded-[var(--radius-card)] border border-ink-line bg-ink-2 p-7" data-reveal style={{ "--i": i } as React.CSSProperties}>
              <Quote className="absolute right-6 top-6 h-10 w-10 text-cyan/20" strokeWidth={1.5} aria-hidden="true" />
              <Stars n={t.rating} />
              <blockquote className="mt-4 flex-1 text-[1.0625rem] leading-relaxed text-white">“{t.quote}”</blockquote>
              <p className="mt-5 text-sm font-bold uppercase tracking-[0.12em] text-cyan">
                {t.name}
                {t.location ? <span className="font-semibold normal-case tracking-normal text-on-dark-meta"> · {t.location}</span> : null}
                {t.source ? <span className="font-semibold normal-case tracking-normal text-on-dark-meta"> · {t.source}</span> : null}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
