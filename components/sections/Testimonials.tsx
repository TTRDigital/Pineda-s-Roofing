import { ExternalLink, Quote, Star } from "lucide-react";
import type { SiteSettings, Testimonial } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

function Stars({ n, className = "h-4 w-4" }: { n: number; className?: string }) {
  return (
    <span className="flex gap-0.5 text-cyan" aria-label={`${n} out of 5 stars`} role="img">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={className} fill={i < n ? "currentColor" : "none"} strokeWidth={1.5} aria-hidden="true" />
      ))}
    </span>
  );
}

/**
 * Reviews on black: the Google rating, real customer quotes and a clear button
 * to the Google Business Profile. Quotes are shown as customers wrote them.
 */
export function Testimonials({ items, settings, heading = "Hear it from our customers", id = "reviews" }: { items: Testimonial[]; settings: SiteSettings; heading?: string; id?: string }) {
  if (!items.length) return null;
  const profile = settings.googleProfileUrl ?? settings.reviewsUrl;
  return (
    <section id={id} className="section on-dark bg-ink">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Google reviews" heading={heading} text="These are reviews customers left on our Google Business Profile. You can read them all there." align="left" dark />
          {settings.googleRating ? (
            <div className="flex items-center gap-4 rounded-[var(--radius-card)] border border-ink-line bg-ink-2 px-5 py-4">
              <span className="font-display text-5xl font-bold text-white">{settings.googleRating}</span>
              <span>
                <Stars n={Math.round(Number(settings.googleRating))} className="h-5 w-5" />
                <span className="mt-1 block text-sm text-on-dark">{settings.reviewCount ? `${settings.reviewCount} Google reviews` : "Google reviews"}</span>
              </span>
            </div>
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
        {profile ? (
          <div className="mt-12 flex flex-col items-start gap-4 border-t border-ink-line pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-on-dark">Want to see more? Every review is on our Google Business Profile, along with photos, hours and directions.</p>
            <Button href={profile} variant="primary" track="google_profile_click">
              Read all reviews on Google
              <ExternalLink className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
