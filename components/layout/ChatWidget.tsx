"use client";

import { useEffect } from "react";
import { chatWidgetId } from "@/lib/chat";

/* On phones the chat bubble sits inside the right end of the sticky call bar
   instead of on top of its "Free estimate" button. The widget renders in a
   shadow root, so the rule is injected there. */
const MOBILE_BUBBLE_CSS = "@media (max-width: 639.98px){#lc_text-widget--btn{bottom:4px!important;right:8px!important}}";

/**
 * GoHighLevel (LeadConnector) website chat. Loads after the first
 * interaction or 4 seconds, so it never slows the first paint.
 */
export function ChatWidget() {
  useEffect(() => {
    if (!chatWidgetId) return;
    let done = false;
    let poll = 0;
    const placeBubble = () => {
      const root = document.querySelector("chat-widget")?.shadowRoot;
      if (!root) return false;
      if (!root.querySelector("style[data-pr]")) {
        const style = document.createElement("style");
        style.dataset.pr = "";
        style.textContent = MOBILE_BUBBLE_CSS;
        root.appendChild(style);
      }
      return true;
    };
    const load = () => {
      if (done) return;
      done = true;
      const s = document.createElement("script");
      s.src = "https://widgets.leadconnectorhq.com/loader.js";
      s.async = true;
      s.dataset.resourcesUrl = "https://widgets.leadconnectorhq.com/chat-widget/loader.js";
      s.dataset.widgetId = chatWidgetId;
      document.body.appendChild(s);
      // Wait for the widget's shadow root (up to ~30 s), then adjust the bubble.
      let tries = 0;
      poll = window.setInterval(() => {
        if (placeBubble() || ++tries > 60) window.clearInterval(poll);
      }, 500);
    };
    const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }));
    const t = window.setTimeout(load, 4000);
    return () => {
      window.clearTimeout(t);
      window.clearInterval(poll);
      events.forEach((e) => window.removeEventListener(e, load));
    };
  }, []);
  return null;
}
