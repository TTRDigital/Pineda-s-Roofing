import Image from "next/image";
import type { Partner } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";

function Tile({ p }: { p: Partner }) {
  const body = p.logo ? (
    <span className="relative block h-14 w-full">
      <Image src={p.logo.src} alt={p.name} fill sizes="200px" className="object-contain" />
    </span>
  ) : (
    <span className="text-center font-display text-xl font-bold uppercase tracking-[0.04em] text-ink">{p.name}</span>
  );
  return p.url ? (
    <a href={p.url} target="_blank" rel="noopener" className="logo-tile" aria-label={p.name}>
      {body}
    </a>
  ) : (
    <div className="logo-tile">{body}</div>
  );
}

/** Grid of brand or insurance company logos. Names show as text until a logo is uploaded in /cms. */
export function LogoGrid({
  eyebrow,
  heading,
  text,
  items,
  tone = "white",
  id,
}: {
  eyebrow?: string;
  heading: string;
  text?: string;
  items: Partner[];
  tone?: "white" | "mist";
  id?: string;
}) {
  if (!items.length) return null;
  return (
    <section id={id} className={`section ${tone === "mist" ? "bg-mist" : "bg-white"}`}>
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} heading={heading} text={text} />
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((p, i) => (
            <li key={p.name} data-reveal style={{ "--i": Math.min(i, 8) } as React.CSSProperties}>
              <Tile p={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Slim scrolling strip of names/logos for the home page. */
export function LogoMarquee({ label, items }: { label: string; items: Partner[] }) {
  if (!items.length) return null;
  const row = [...items, ...items];
  return (
    <section aria-label={label} className="border-y border-line bg-white py-8">
      <div className="container-x flex flex-col items-center gap-6 lg:flex-row lg:gap-10">
        <p className="eyebrow plain shrink-0">{label}</p>
        <div className="marquee relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <ul className="marquee-track flex w-max items-center gap-12">
            {row.map((p, i) => (
              <li key={`${p.name}-${i}`} aria-hidden={i >= items.length ? true : undefined} className="flex h-12 shrink-0 items-center">
                {p.logo ? (
                  <span className="relative block h-10 w-32">
                    <Image src={p.logo.src} alt={i >= items.length ? "" : p.name} fill sizes="128px" className="object-contain grayscale transition hover:grayscale-0" />
                  </span>
                ) : (
                  <span className="whitespace-nowrap font-display text-xl font-bold uppercase tracking-[0.06em] text-meta">{p.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
