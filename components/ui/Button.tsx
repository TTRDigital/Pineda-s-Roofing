import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "dark" | "outline" | "outline-light" | "link";

const styles: Record<Variant, string> = {
  primary: "bg-cyan text-ink hover:bg-cyan-hi shadow-[0_10px_30px_-12px_rgb(0_180_240/0.7)]",
  dark: "bg-ink text-white hover:bg-ink-3",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-white",
  "outline-light": "border-2 border-white/70 text-white hover:border-cyan hover:text-cyan",
  link: "text-cyan-deep underline-offset-4 hover:underline !px-0 !min-h-0",
};

/** Uppercase, bold buttons. External and tel: links render as plain anchors. */
export function Button({
  href,
  children,
  variant = "primary",
  arrow = false,
  className = "",
  track,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  track?: string;
}) {
  const cls = `group/btn inline-flex min-h-13 items-center justify-center gap-2.5 rounded-lg px-7 text-[0.9375rem] font-bold uppercase tracking-[0.08em] transition-[background-color,color,border-color,box-shadow] duration-200 ${styles[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow ? <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={2.25} aria-hidden="true" /> : null}
    </>
  );
  if (/^(https?:|tel:|mailto:)/.test(href)) {
    const external = href.startsWith("http");
    return (
      <a href={href} className={cls} data-track={track} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-track={track}>
      {inner}
    </Link>
  );
}
