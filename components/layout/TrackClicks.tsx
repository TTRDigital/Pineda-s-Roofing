"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/** Sends a tracking event for every click on an element with data-track (calls, reviews, BBB...), with where on the page it was. */
export function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-track]");
      if (!el) return;
      const placement = el.closest("header") ? "header" : el.closest("footer") ? "footer" : el.closest("[data-mobile-bar]") ? "mobile_bar" : "page";
      track(el.getAttribute("data-track") ?? "click", { link_url: (el as HTMLAnchorElement).href ?? "", placement });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
