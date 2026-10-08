import { Check } from "lucide-react";

/** Highlight boxes: short phrases with a check, in a 1 or 2 column grid. */
export function HighlightBoxes({ items, columns = 2, label }: { items: string[]; columns?: 1 | 2 | 3; label?: string }) {
  if (!items.length) return null;
  const grid = columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : columns === 2 ? "sm:grid-cols-2" : "";
  return (
    <div>
      {label ? <p className="eyebrow plain mb-4">{label}</p> : null}
      <ul className={`grid gap-3.5 ${grid}`}>
        {items.map((item, i) => (
          <li key={item} className="hl-box" data-reveal style={{ "--i": Math.min(i, 6) } as React.CSSProperties}>
            <span className="mt-px flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan text-ink">
              <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
