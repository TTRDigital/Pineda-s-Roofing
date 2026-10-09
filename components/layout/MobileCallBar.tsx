import Link from "next/link";
import { Phone } from "lucide-react";
import type { Cta } from "@/lib/types";
import { chatWidgetId } from "@/lib/chat";

/** Sticky call / estimate bar on phones only. The chat bubble sits in its right end when the widget is on. */
export function MobileCallBar({ phoneHref, cta }: { phoneHref: string; cta: Cta }) {
  return (
    <>
      <div aria-hidden="true" className="h-16 sm:hidden" />
      <div className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-ink-line bg-ink p-2 sm:hidden ${chatWidgetId ? "pr-[72px]" : ""}`}>
        <a href={phoneHref} data-track="click_to_call" className="flex min-h-12 items-center justify-center gap-2 rounded-l-lg font-bold uppercase tracking-[0.08em] text-white">
          <Phone className="h-4 w-4 text-cyan" strokeWidth={2.25} aria-hidden="true" />
          Call now
        </a>
        <Link href={cta.href} className="flex min-h-12 items-center justify-center rounded-lg bg-cyan font-bold uppercase tracking-[0.08em] text-ink">
          {cta.label}
        </Link>
      </div>
    </>
  );
}
