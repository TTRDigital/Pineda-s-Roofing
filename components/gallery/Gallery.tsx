"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { Project, ServiceCategory } from "@/lib/types";
import { BeforeAfter } from "@/components/gallery/BeforeAfter";

const labels: Record<ServiceCategory, string> = { residential: "Residential", commercial: "Commercial", repair: "Repairs & storm", exterior: "Gutters & exterior" };

/** Filterable project grid with a keyboard-friendly lightbox. Projects with before/after photos get a slider. */
export function Gallery({ projects, filters = true, limit }: { projects: Project[]; filters?: boolean; limit?: number }) {
  const [filter, setFilter] = useState<ServiceCategory | "all">("all");
  const [open, setOpen] = useState<number | null>(null);

  const cats = useMemo(() => Array.from(new Set(projects.map((p) => p.category))), [projects]);
  const shown = useMemo(() => {
    const list = filter === "all" ? projects : projects.filter((p) => p.category === filter);
    return limit ? list.slice(0, limit) : list;
  }, [projects, filter, limit]);

  // Flatten to one slide per photo for the lightbox.
  const slides = useMemo(() => shown.flatMap((p) => [...(p.after ? [p.after] : []), ...p.images].map((img) => ({ img, project: p }))), [shown]);
  const firstSlide = (p: Project) => slides.findIndex((s) => s.project.id === p.id);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? null : (i + d + slides.length) % slides.length)), [slides.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const withBa = shown.filter((p) => p.before && p.after);

  return (
    <div>
      {filters && cats.length > 1 ? (
        <div className="mb-10 flex flex-wrap justify-center gap-2.5" role="group" aria-label="Filter projects">
          {(["all", ...cats] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={`min-h-11 rounded-full border-2 px-5 text-sm font-bold uppercase tracking-[0.08em] transition-colors ${filter === c ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink"}`}
            >
              {c === "all" ? "All work" : labels[c]}
            </button>
          ))}
        </div>
      ) : null}

      {withBa.length ? (
        <div className="mb-10 grid gap-6 md:grid-cols-2">
          {withBa.map((p) => (
            <figure key={`ba-${p.id}`}>
              <BeforeAfter before={p.before!} after={p.after!} />
              <figcaption className="mt-3 font-bold text-ink">
                {p.title}
                {p.location ? <span className="font-normal text-meta"> · {p.location}</span> : null}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : null}

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => {
          const cover = p.after ?? p.images[0];
          if (!cover) return null;
          const count = (p.after ? 1 : 0) + p.images.length;
          return (
            <li key={p.id}>
              <button type="button" onClick={() => setOpen(firstSlide(p))} className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] bg-mist text-left">
                <Image src={cover.src} alt={cover.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-md bg-cyan px-2.5 py-1 text-xs font-bold uppercase tracking-[0.1em] text-ink">{labels[p.category]}</span>
                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 transition-opacity group-hover:opacity-100">
                  <Expand className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
                </span>
                <span className="absolute inset-x-4 bottom-4 text-white">
                  <span className="block font-display text-xl font-bold uppercase">{p.title}</span>
                  <span className="text-sm text-on-dark">
                    {p.location ? `${p.location} · ` : ""}
                    {count} {count === 1 ? "photo" : "photos"}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {open !== null && slides[open] ? (
        <div role="dialog" aria-modal="true" aria-label={slides[open].project.title} className="fixed inset-0 z-[70] flex flex-col bg-ink/95" onClick={close}>
          <div className="container-x flex h-16 shrink-0 items-center justify-between text-white" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm font-semibold">
              {slides[open].project.title} <span className="text-on-dark-meta">· {open + 1} of {slides.length}</span>
            </p>
            <button type="button" onClick={close} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" autoFocus>
              <X className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="relative flex-1">
            <Image src={slides[open].img.src} alt={slides[open].img.alt} fill sizes="100vw" className="object-contain p-4 sm:p-10" onClick={(e) => e.stopPropagation()} />
            {slides.length > 1 ? (
              <>
                <button type="button" onClick={(e) => (e.stopPropagation(), step(-1))} className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink sm:left-6">
                  <ChevronLeft className="h-6 w-6" strokeWidth={2.25} aria-hidden="true" />
                  <span className="sr-only">Previous photo</span>
                </button>
                <button type="button" onClick={(e) => (e.stopPropagation(), step(1))} className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink sm:right-6">
                  <ChevronRight className="h-6 w-6" strokeWidth={2.25} aria-hidden="true" />
                  <span className="sr-only">Next photo</span>
                </button>
              </>
            ) : null}
          </div>
          <p className="container-x py-4 text-center text-sm text-on-dark" onClick={(e) => e.stopPropagation()}>
            {slides[open].img.alt}
          </p>
        </div>
      ) : null}
    </div>
  );
}
