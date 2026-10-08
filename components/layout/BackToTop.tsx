"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Round back-to-top button, shown after scrolling one screen. Sits left of the chat widget. */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-24 right-4 z-40 sm:bottom-6 sm:right-24 flex h-13 w-13 items-center justify-center rounded-full border border-line bg-white text-ink shadow-[var(--shadow-card)] transition-[opacity,transform,background-color] duration-300 hover:bg-cyan ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
    </button>
  );
}
