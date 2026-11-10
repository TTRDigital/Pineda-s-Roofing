import { ExternalLink, PenLine, Quote, Star } from "lucide-react";
import type { SiteSettings, Testimonial } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BbbBadge } from "@/components/ui/BbbBadge";
import { EmbedHtml } from "@/components/ui/EmbedHtml";

function Stars({ n, className = "h-4 w-4" }: { n: number; className?: string }) {
  return (
    <span className="flex gap-0.5 text-cyan" aria-label={`${n} out of 5 stars`} role="img">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={className} fill={i < n ? "currentColor" : "none"} strokeWidth={1.5} aria-hidden="true" />
      ))}
    </span>
  );
}

/** Google reviews on black: the overall rating, a clear link to read every review on Google, and the BBB rating. */
/** A different pair of reviews per page, picked from the page key so the same page always shows the same pair. */
function pick(items: Testimonial[], page?: string) {
  if (!page || items.length <= 2) return items.slice(0, 4);
  // FNV-1a hash of the page key, then one of every possible pair.
  let h = 2166136261;
  for (const ch of page) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
  const pairs: [number, number][] = [];
  for (let a = 0; a < items.length; a++) for (let b = a + 1; b < items.length; b++) pairs.push([a, b]);
  const [a, b] = pairs[h % pairs.length];
  return [items[a], items[b]];
}

export function Testimonials({ items, settings, page }: { items: Testimonial[]; settings: SiteSettings; /** Page key (e.g. its slug); omit to show every review. */ page?: string }) {
  if (!items.length && !settings.reviewsWidget) return null;
  const googleUrl = settings.reviewsUrl;
  const shown = pick(items, page);
  return (
    <section id="reviews" className="section on-dark bg-ink">
      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
          <SectionHeading
            eyebrow="Reviews"
            heading="Hear it from our customers"
            text="Real reviews from homeowners and businesses on our Google Business Profile. Read them all on Google, where you can also see our photos and business details."
            align="left"
            dark
          />
          {settings.googleRating ? (
            <a
              href={googleUrl ?? "#"}
              target="_blank"
              rel="noopener"
              data-track="google_reviews"
              className="flex items-center gap-5 rounded-[var(--radius-card)] border border-ink-line bg-ink-2 px-6 py-5 transition-colors hover:border-cyan"
            >
              <span className="font-display text-6xl font-bold leading-none text-white">{settings.googleRating}</span>
              <span>
                <Stars n={Math.round(Number(settings.googleRating))} className="h-5 w-5" />
                <span className="mt-1.5 block text-sm font-semibold text-white">{settings.reviewCount ? `${settings.reviewCount} reviews on Google` : "Reviews on Google"}</span>
                <span className="mt-0.5 block text-xs text-on-dark-meta">Google Business Profile</span>
              </span>
            </a>
          ) : null}
        </div>
        {settings.reviewsWidget ? (
          <EmbedHtml html={settings.reviewsWidget} className="mt-12 overflow-hidden rounded-[var(--radius-card)] bg-white p-4" />
        ) : (
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {shown.map((t, i) => (
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
        )}
        <div className="mt-10 flex flex-col gap-5 rounded-[var(--radius-card)] border border-cyan/40 bg-ink-2 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            {googleUrl ? (
              <a
                href={googleUrl}
                target="_blank"
                rel="noopener"
                data-track="google_reviews"
                className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-lg bg-cyan px-7 text-[0.9375rem] font-bold uppercase tracking-[0.08em] text-ink shadow-[0_10px_30px_-12px_rgb(0_180_240/0.7)] transition-colors hover:bg-cyan-hi"
              >
                Read all our reviews on Google
                <ExternalLink className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
              </a>
            ) : null}
            {settings.writeReviewUrl ? (
              <a
                href={settings.writeReviewUrl}
                target="_blank"
                rel="noopener"
                data-track="google_write_review"
                className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-lg border-2 border-white/70 px-7 text-[0.9375rem] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:border-cyan hover:text-cyan"
              >
                <PenLine className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                Leave us a review
              </a>
            ) : null}
          </div>
          <BbbBadge bbb={settings.bbb} tone="dark" />
        </div>
      </div>
    </section>
  );
}
