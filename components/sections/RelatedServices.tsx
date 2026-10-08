import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/types";
import { IconTile } from "@/components/ui/Icon";

/** Strip of service link cards. */
export function RelatedServices({ services, heading = "Related services" }: { services: Service[]; heading?: string }) {
  if (!services.length) return null;
  return (
    <section className="section bg-white">
      <div className="container-x">
        <h2 className="text-h3 uppercase text-ink">{heading}</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="group flex h-full items-start gap-5 rounded-[var(--radius-card)] border border-line p-6 transition-[border-color,box-shadow] hover:border-cyan hover:shadow-[var(--shadow-card)]">
                <IconTile name={s.icon} size="sm" />
                <span className="flex-1">
                  <span className="flex items-center justify-between gap-3 font-bold text-ink">
                    {s.title}
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={2.25} aria-hidden="true" />
                  </span>
                  <span className="mt-1.5 block text-[0.95rem] text-body">{s.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
