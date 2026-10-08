import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";

/** Cyan call-to-action band with black text. */
export function CtaBand({
  heading = "Ready for a roof you never have to think about?",
  text = "Get a free, no-pressure estimate. We inspect, photograph everything and walk you through your options.",
  phone,
  phoneHref,
}: {
  heading?: string;
  text?: string;
  phone: string;
  phoneHref: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-cyan">
      <svg aria-hidden="true" className="absolute -right-10 bottom-0 -z-10 h-[140%] text-ink/[0.07]" viewBox="0 0 400 300" fill="currentColor">
        <path d="M200 20 400 180v120H0V180Z" />
      </svg>
      <div className="container-x flex flex-col items-start justify-between gap-8 py-14 lg:flex-row lg:items-center lg:py-16">
        <div className="max-w-2xl">
          <h2 className="text-h2 uppercase text-ink">{heading}</h2>
          <p className="mt-4 text-lead text-ink/80">{text}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button href="/contact" variant="dark" arrow>
            Get a free estimate
          </Button>
          <a
            href={phoneHref}
            data-track="click_to_call"
            className="inline-flex min-h-13 items-center gap-2.5 rounded-lg border-2 border-ink px-7 text-[0.9375rem] font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-ink hover:text-white"
          >
            <Phone className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
            {phone}
          </a>
        </div>
      </div>
    </section>
  );
}
