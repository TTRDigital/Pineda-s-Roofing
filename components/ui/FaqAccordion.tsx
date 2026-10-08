"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/lib/types";

/**
 * Accessible accordion (button + aria-expanded). Answers stay in the HTML
 * so search engines and AI crawlers can read them; collapsed panels are
 * visually hidden and removed from the tab order.
 */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <ul className="grid gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <li key={item.question} className={`rounded-[var(--radius-card)] border bg-white transition-colors ${isOpen ? "border-cyan" : "border-line"}`}>
            <h3 className="font-sans text-base">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left text-[1.0625rem] font-bold text-ink sm:px-6"
              >
                {item.question}
                <span
                  aria-hidden="true"
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-[transform,background-color] duration-300 ${isOpen ? "rotate-45 bg-cyan text-ink" : "bg-mist text-ink"}`}
                >
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity,visibility] duration-300 ${isOpen ? "visible grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl px-5 pb-6 text-body sm:px-6">{item.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
