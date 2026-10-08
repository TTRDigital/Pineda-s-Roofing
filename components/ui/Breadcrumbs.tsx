import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/ui/JsonLd";
import { absoluteUrl } from "@/lib/site";

export type Crumb = { label: string; href: string };

/** Visible breadcrumbs on dark headers, plus BreadcrumbList schema. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-on-dark-meta">
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 ? <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" /> : null}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-white">
                  {c.label}
                </span>
              ) : (
                <Link href={c.href} className="hover:text-cyan">
                  {c.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: absoluteUrl(c.href) })),
        }}
      />
    </>
  );
}
