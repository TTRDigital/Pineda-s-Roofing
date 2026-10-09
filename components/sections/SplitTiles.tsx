import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Heading, Img } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { IconTile } from "@/components/ui/Icon";

type Tile = { href: string; eyebrow: string; title: string; text: string; image: Img; icon: string };

/** Two large photo tiles: residential and commercial roofing. */
export function SplitTiles({ intro, tiles, tone = "white" }: { intro?: Heading; tiles: Tile[]; tone?: "white" | "mist" }) {
  return (
    <section className={`section ${tone === "mist" ? "bg-mist" : "bg-white"}`}>
      {intro ? (
        <div className="container-x mb-12">
          <SectionHeading {...intro} />
        </div>
      ) : null}
      <div className="container-x grid gap-5 md:grid-cols-2">
        {tiles.map((t, i) => (
          <Link key={t.href} href={t.href} className="group relative isolate flex min-h-[440px] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] p-8 text-white lg:min-h-[520px] lg:p-10" data-reveal style={{ "--i": i } as React.CSSProperties}>
            <div className="absolute inset-0 -z-20 transition-transform duration-700 group-hover:scale-105">
              <Photo image={t.image} sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
            <IconTile name={t.icon} dark />
            <p className="eyebrow on-dark mt-6">{t.eyebrow}</p>
            <h3 className="mt-3 text-h2 uppercase">{t.title}</h3>
            <p className="mt-3 max-w-md text-on-dark">{t.text}</p>
            <span className="mt-6 inline-flex items-center gap-2 font-bold uppercase tracking-[0.08em] text-cyan">
              Learn more <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
