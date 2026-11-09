import { BadgeCheck, ExternalLink } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

/**
 * BBB accreditation and rating, linking to the public BBB profile so
 * visitors can verify it themselves. Text badge (not the BBB seal artwork):
 * swap in the official seal code from the BBB business portal if wanted.
 */
export function BbbBadge({ bbb, tone = "light", className = "" }: { bbb: SiteSettings["bbb"]; tone?: "light" | "dark"; className?: string }) {
  if (!bbb?.url) return null;
  const dark = tone === "dark";
  return (
    <a
      href={bbb.url}
      target="_blank"
      rel="noopener"
      data-track="bbb_profile"
      className={`group inline-flex items-center gap-3.5 rounded-[var(--radius-card)] border px-4 py-3 transition-colors ${
        dark ? "border-ink-line bg-ink-2 hover:border-cyan" : "border-line bg-white hover:border-cyan"
      } ${className}`}
    >
      <span className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-md bg-[#005a78] font-display leading-none text-white">
        <span className="text-[0.95rem] font-bold tracking-wide">BBB</span>
        <span className="mt-0.5 text-[0.6rem] font-bold uppercase tracking-[0.08em]">{bbb.rating}</span>
      </span>
      <span className="text-left">
        <span className={`flex items-center gap-1.5 text-sm font-bold ${dark ? "text-white" : "text-ink"}`}>
          <BadgeCheck className="h-4 w-4 text-cyan" strokeWidth={2.25} aria-hidden="true" />
          BBB Accredited Business
        </span>
        <span className={`mt-0.5 flex items-center gap-1.5 text-[0.8125rem] ${dark ? "text-on-dark" : "text-meta"}`}>
          {bbb.rating} rating{bbb.accreditedSince ? ` · Accredited since ${bbb.accreditedSince}` : ""}
          <span className={`inline-flex items-center gap-1 font-semibold group-hover:underline ${dark ? "text-cyan" : "text-cyan-deep"}`}>
            · Verify on BBB
            <ExternalLink className="h-3 w-3" strokeWidth={2.25} aria-hidden="true" />
          </span>
        </span>
      </span>
    </a>
  );
}
