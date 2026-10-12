"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { chatWidgetId } from "@/lib/chat";
import { images } from "@/lib/data/images";

/*
 * Styles injected into the widget's shadow root (normal CSS cannot reach it):
 * - the round chat button shows Don Eagle's head instead of the stock icon;
 * - on phones the button sits at the right end of the sticky call bar
 *   instead of on top of its "Free estimate" button.
 */
const WIDGET_CSS = `
#lc_text-widget--btn{
  width:64px!important;height:64px!important;padding:0!important;
  background:#00b4f0 url(/images/mascot/eagle-head.png) center/cover no-repeat!important;
  border:3px solid #fff!important;box-shadow:0 10px 28px -8px rgba(11,13,16,.55)!important;
}
#lc_text-widget--btn .icon{opacity:0!important}
@media (max-width: 639.98px){
  #lc_text-widget--btn{width:56px!important;height:56px!important;bottom:4px!important;right:8px!important}
}`;

/**
 * GoHighLevel (LeadConnector) website chat with the Pineda's mascot:
 * his head on the chat button, and his whole body beside the chat window
 * while it is open (desktop). Loads after the first interaction or 4 seconds,
 * so it never slows the first paint.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!chatWidgetId) return;
    let done = false;
    let poll = 0;
    let observer: MutationObserver | null = null;

    const attach = () => {
      const host = document.querySelector("chat-widget");
      const root = host?.shadowRoot;
      if (!host || !root?.querySelector("#lc_text-widget--btn")) return false;
      if (!root.querySelector("style[data-pr]")) {
        const style = document.createElement("style");
        style.dataset.pr = "";
        style.textContent = WIDGET_CSS;
        root.appendChild(style);
      }
      // The widget flags its open state on the host element.
      observer = new MutationObserver(() => setOpen(host.getAttribute("data-active") === "true"));
      observer.observe(host, { attributes: true, attributeFilter: ["data-active"] });
      setReady(true);
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
      // Wait for the widget (up to ~30 s), then restyle it.
      let tries = 0;
      poll = window.setInterval(() => {
        if (attach() || ++tries > 60) window.clearInterval(poll);
      }, 500);
    };

    const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }));
    const t = window.setTimeout(load, 4000);
    return () => {
      window.clearTimeout(t);
      window.clearInterval(poll);
      observer?.disconnect();
      events.forEach((e) => window.removeEventListener(e, load));
    };
  }, []);

  if (!chatWidgetId || !ready) return null;
  const eagle = images.eaglePhone;
  return (
    // Don Eagle, full body, standing beside the open chat window. Desktop only:
    // on smaller screens the chat window takes the whole width.
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed bottom-0 right-[372px] z-[99999998] hidden w-[300px] transition-[opacity,transform] duration-500 ease-out lg:block ${
        open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <Image src={eagle.src} alt="" width={eagle.width} height={eagle.height} sizes="300px" className="h-auto w-full drop-shadow-[0_20px_30px_rgb(0_0_0/0.35)]" />
    </div>
  );
}
