"use client";

import { useEffect, useRef } from "react";

/**
 * Renders third-party embed code pasted into /cms (Atlas Pro snippet, a
 * Google reviews widget...). React doesn't run <script> tags set as HTML,
 * so scripts are re-created so the browser executes them. Only for code
 * from trusted editors in the CMS. If a widget loads from a new domain,
 * allow it in the CSP in public/.htaccess.
 */
export function EmbedHtml({ html, className = "" }: { html: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = html;
    el.querySelectorAll("script").forEach((old) => {
      const s = document.createElement("script");
      for (const attr of Array.from(old.attributes)) s.setAttribute(attr.name, attr.value);
      s.text = old.text;
      old.replaceWith(s);
    });
  }, [html]);
  return <div ref={ref} className={className} />;
}
