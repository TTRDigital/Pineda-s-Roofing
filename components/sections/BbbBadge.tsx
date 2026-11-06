import { ShieldCheck } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

/**
 * BBB accreditation and rating, linked to the business's BBB profile.
 * Text badge on purpose: the official BBB seal artwork must come from BBB.
 */
export function BbbBadge({ settings, variant = "band" }: { settings: SiteSettings; variant?: "band" | "inline" }) {
  if (!settings.bbbUrl) return null;
  const rating = settings.bbbRating ?? "A+";
  const link = (
    <a
      href={settings.bbbUrl}
      target="_blank"
      rel="noopener"
      className="inline-flex min-h-13 items-center justify-center rounded-lg border-2 border-ink px-6 text-[0.9375rem] font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-ink hover:text-white"
    >
      See our BBB profile
    </a>
  );
  if (variant === "inline") {
    return (
      <a href={settings.bbbUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-cyan">
        <ShieldCheck className="h-4 w-4 text-cyan" aria-hidden="true" strokeWidth={2.25} />
        BBB Accredited · {rating} rating
      </a>
    );
  }
  return (
    <section className="border-y border-line bg-white" aria-labelledby="bbb-heading">
      <div className="container-x flex flex-col items-start gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <span className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-ink text-white" aria-hidden="true">
            <span className="font-display text-3xl font-bold leading-none text-cyan">{rating}</span>
            <span className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.14em]">BBB</span>
          </span>
          <div>
            <h2 id="bbb-heading" className="font-display text-h3 uppercase text-ink">
              BBB Accredited Business, {rating} rating
            </h2>
            <p className="mt-1 max-w-xl text-body">
              Pineda&apos;s Construction LLC is listed with the Better Business Bureau. Read the profile, ratings and customer feedback on bbb.org.
            </p>
          </div>
        </div>
        {link}
      </div>
    </section>
  );
}
