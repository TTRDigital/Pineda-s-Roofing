/** Pill links that jump to sections further down the page. */
export function JumpChips({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav aria-label="On this page" className="border-b border-line bg-white">
      <ul className="container-x flex gap-2.5 overflow-x-auto py-4 [scrollbar-width:none]">
        {items.map((i) => (
          <li key={i.href} className="shrink-0">
            <a href={i.href} className="inline-flex min-h-10 items-center rounded-full border-2 border-line px-4 text-sm font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:border-cyan hover:bg-cyan-50">
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
