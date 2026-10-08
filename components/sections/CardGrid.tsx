import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Card, Heading } from "@/lib/types";
import { IconTile } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Icon cards in a grid. Numbered variant is used for process steps. */
export function CardGrid({
  intro,
  cards,
  tone = "white",
  numbered = false,
  columns = 3,
  id,
}: {
  intro?: Heading;
  cards: Card[];
  tone?: "white" | "mist" | "dark";
  numbered?: boolean;
  columns?: 2 | 3 | 4;
  id?: string;
}) {
  if (!cards.length) return null;
  const dark = tone === "dark";
  const cols = columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <section id={id} className={`section ${dark ? "on-dark bg-ink" : tone === "mist" ? "bg-mist" : "bg-white"}`}>
      <div className="container-x">
        {intro ? <SectionHeading {...intro} dark={dark} /> : null}
        <ul className={`grid gap-5 ${intro ? "mt-14" : ""} ${cols}`}>
          {cards.map((c, i) => {
            const inner = (
              <>
                <div className="flex items-center justify-between gap-4">
                  {numbered ? (
                    <span className={`font-display text-5xl font-bold leading-none ${dark ? "text-cyan" : "text-cyan-deep"}`}>{String(i + 1).padStart(2, "0")}</span>
                  ) : (
                    <IconTile name={c.icon} dark={dark} size="sm" />
                  )}
                  {c.href ? <ArrowRight className={`h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 ${dark ? "text-cyan" : "text-ink"}`} strokeWidth={2.25} aria-hidden="true" /> : null}
                </div>
                <h3 className={`mt-6 font-sans text-[1.1875rem] font-bold leading-snug ${dark ? "text-white" : "text-ink"}`}>{c.title}</h3>
                {c.text ? <p className={`mt-2.5 text-[0.98rem] ${dark ? "text-on-dark" : "text-body"}`}>{c.text}</p> : null}
              </>
            );
            const cls = `group block h-full rounded-[var(--radius-card)] border p-7 transition-[border-color,transform,box-shadow] duration-300 ${
              dark ? "border-ink-line bg-ink-2 hover:border-cyan" : `border-line ${tone === "mist" ? "bg-white" : "bg-white"} hover:-translate-y-1 hover:border-cyan hover:shadow-[var(--shadow-card)]`
            }`;
            return (
              <li key={c.title} data-reveal style={{ "--i": Math.min(i, 6) } as React.CSSProperties}>
                {c.href ? (
                  <Link href={c.href} className={cls}>
                    {inner}
                  </Link>
                ) : (
                  <div className={cls}>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
