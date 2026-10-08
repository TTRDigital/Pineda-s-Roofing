"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import type { Img } from "@/lib/types";

/** Drag (or use arrow keys) to compare before and after photos. */
export function BeforeAfter({ before, after, sizes = "(min-width: 1024px) 50vw, 100vw" }: { before: Img; after: Img; sizes?: string }) {
  const [pos, setPos] = useState(50);
  const id = useId();
  return (
    <div className="relative aspect-[4/3] select-none overflow-hidden rounded-[var(--radius-card)] bg-mist">
      <Image src={after.src} alt={after.alt} fill sizes={sizes} className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before.src} alt={before.alt} fill sizes={sizes} className="object-cover" />
      </div>
      <span className="absolute left-3 top-3 rounded-md bg-ink/85 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white">Before</span>
      <span className="absolute right-3 top-3 rounded-md bg-cyan px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-ink">After</span>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-white shadow-[0_0_12px_rgb(0_0_0/0.4)]" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg">
          <MoveHorizontal className="h-5 w-5" strokeWidth={2.25} />
        </span>
      </div>
      <label htmlFor={id} className="sr-only">
        Compare before and after
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="ba-range absolute inset-0 h-full w-full opacity-0"
      />
    </div>
  );
}
