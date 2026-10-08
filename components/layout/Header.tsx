"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Phone, TriangleAlert, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import type { Cta } from "@/lib/types";

export type NavItem = { label: string; href: string; children?: { label: string; href: string; note?: string }[] };

/**
 * Black top bar (license, phone, emergency), white sticky header with a cyan
 * scroll-progress line, dropdowns on desktop and a full-screen menu on mobile.
 */
export function Header({
  nav,
  cta,
  phone,
  phoneHref,
  license,
  emergencyText,
}: {
  nav: NavItem[];
  cta: Cta;
  phone: string;
  phoneHref: string;
  license: string;
  emergencyText: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        barRef.current?.style.setProperty("--progress", String(p));
        setScrolled(window.scrollY > 40);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Close menus on navigation (state adjusted during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setOpenDrop(null);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setOpenDrop(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (item: NavItem) =>
    pathname === item.href ||
    !!item.children?.some((c) => pathname === c.href) ||
    (item.href !== "/" && !item.children && pathname.startsWith(`${item.href}/`));

  return (
    <>
      {/* Top bar */}
      <div className="bg-ink text-[0.8125rem] text-on-dark">
        <div className="container-x flex min-h-10 items-center justify-between gap-4">
          <p className="hidden sm:block">
            Licensed, insured &amp; bonded <span className="text-on-dark-meta">·</span> <span className="font-semibold text-white">{license}</span>
          </p>
          <div className="flex w-full items-center justify-between gap-5 sm:w-auto sm:justify-end">
            <a href={phoneHref} data-track="click_to_call" className="inline-flex items-center gap-2 font-semibold text-white hover:text-cyan">
              <Phone className="h-4 w-4 text-cyan" strokeWidth={2} aria-hidden="true" />
              {phone}
            </a>
            <Link href="/services/emergency-roof-repair" className="inline-flex items-center gap-2 font-semibold text-cyan hover:text-cyan-hi">
              <TriangleAlert className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              {emergencyText}
            </Link>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-shadow duration-300 ${scrolled ? "border-transparent shadow-[0_8px_30px_-12px_rgb(11_13_16/0.25)]" : "border-line"}`}>
        <div className="container-x flex h-[76px] items-center justify-between gap-4 lg:h-[88px]">
          <Link href="/" aria-label="Pineda's Roofing home" className="shrink-0">
            <Logo className="h-11 w-auto lg:h-13" />
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center">
              {nav.map((item) => {
                const active = isActive(item);
                if (!item.children?.length) {
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className={`relative inline-flex h-11 items-center whitespace-nowrap px-3 text-[0.875rem] font-bold uppercase tracking-[0.05em] transition-colors hover:text-cyan-deep ${active ? "text-cyan-deep" : "text-ink"}`}
                      >
                        {item.label}
                        <span aria-hidden="true" className={`absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full bg-cyan transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0"}`} />
                      </Link>
                    </li>
                  );
                }
                const dropOpen = openDrop === item.label;
                return (
                  <li key={item.href} className="relative" onMouseEnter={() => setOpenDrop(item.label)} onMouseLeave={() => setOpenDrop(null)}>
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        className={`relative inline-flex h-11 items-center whitespace-nowrap pl-3 pr-0.5 text-[0.875rem] font-bold uppercase tracking-[0.05em] transition-colors hover:text-cyan-deep ${active ? "text-cyan-deep" : "text-ink"}`}
                      >
                        {item.label}
                        <span aria-hidden="true" className={`absolute inset-x-3 -bottom-0.5 right-0.5 h-[3px] rounded-full bg-cyan transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0"}`} />
                      </Link>
                      <button
                        type="button"
                        aria-expanded={dropOpen}
                        aria-label={`${item.label} menu`}
                        onClick={() => setOpenDrop(dropOpen ? null : item.label)}
                        className="inline-flex h-11 w-8 items-center justify-center text-ink hover:text-cyan-deep"
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`} strokeWidth={2.25} aria-hidden="true" />
                      </button>
                    </div>
                    <div className={`absolute left-0 top-full pt-3 transition-[opacity,transform,visibility] duration-200 ${dropOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}>
                      <ul className="w-80 overflow-hidden rounded-[var(--radius-card)] border border-line bg-white p-2 shadow-[0_24px_60px_-20px_rgb(11_13_16/0.35)]">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} className="block rounded-lg px-4 py-3 transition-colors hover:bg-cyan-50">
                              <span className="block font-semibold text-ink">{c.label}</span>
                              {c.note ? <span className="mt-0.5 block text-[0.8125rem] leading-snug text-meta">{c.note}</span> : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={cta.href}
              className="hidden min-h-12 items-center whitespace-nowrap rounded-lg bg-cyan px-5 text-[0.875rem] font-bold uppercase tracking-[0.08em] text-ink shadow-[0_10px_30px_-12px_rgb(0_180_240/0.7)] transition-colors hover:bg-cyan-hi sm:inline-flex"
            >
              {cta.label}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-ink text-white xl:hidden"
            >
              <Menu className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>
        <div ref={barRef} aria-hidden="true" className="scroll-progress absolute inset-x-0 -bottom-px h-[3px] bg-cyan" />
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={`fixed inset-0 z-[60] flex flex-col bg-ink text-white transition-[opacity,visibility] duration-300 xl:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="container-x flex h-[76px] shrink-0 items-center justify-between">
          <Logo className="h-11 w-auto" dark />
          <button type="button" onClick={() => setOpen(false)} className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
            <X className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <nav aria-label="Mobile" className="container-x flex-1 overflow-y-auto pb-8">
          <ul className="divide-y divide-ink-line border-y border-ink-line">
            {nav.map((item) => (
              <li key={item.href}>
                {item.children?.length ? (
                  <details className="group">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between font-display text-2xl uppercase">
                      {item.label}
                      <ChevronDown className="h-5 w-5 text-cyan transition-transform group-open:rotate-180" strokeWidth={2.25} aria-hidden="true" />
                    </summary>
                    <ul className="pb-4">
                      <li>
                        <Link href={item.href} className="block py-2.5 font-semibold text-cyan">
                          All {item.label.toLowerCase()}
                        </Link>
                      </li>
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className="block py-2.5 text-on-dark hover:text-white">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link href={item.href} className="flex min-h-14 items-center font-display text-2xl uppercase">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link href={cta.href} className="inline-flex min-h-14 items-center justify-center rounded-lg bg-cyan font-bold uppercase tracking-[0.08em] text-ink">
              {cta.label}
            </Link>
            <a href={phoneHref} data-track="click_to_call" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg border-2 border-white/30 font-bold uppercase tracking-[0.08em]">
              <Phone className="h-5 w-5 text-cyan" strokeWidth={2} aria-hidden="true" />
              Call {phone}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
