import type { ReactNode } from "react";
import { PageHero } from "@/components/sections/PageHero";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHero hero={{ eyebrow: `Last updated ${updated}`, heading: title }} />
      <section className="section bg-white">
        <div className="container-x max-w-3xl text-body [&_h2]:mt-10 [&_h2]:text-h3 [&_h2]:uppercase [&_h2]:text-ink [&_p]:mt-4 [&_a]:font-semibold [&_a]:text-cyan-deep [&_a]:underline">{children}</div>
      </section>
    </>
  );
}
