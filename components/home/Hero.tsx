import Image from "next/image";
import { Phone, ShieldCheck } from "lucide-react";
import type { HomeContent, SiteSettings, Stat } from "@/lib/types";
import { images } from "@/lib/data/images";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";

/** Black hero over a real job photo, with Don Eagle and the trust badges. */
export function Hero({ hero, stats, settings }: { hero: HomeContent["hero"]; stats: Stat[]; settings: SiteSettings }) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink">
      <div className="absolute inset-0 -z-20">
        <Photo image={hero.image} sizes="100vw" priority className="opacity-60" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#0b0d10_0%,rgb(11_13_16/0.9)_42%,rgb(11_13_16/0.35)_100%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="container-x grid items-end gap-10 pt-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:pt-20">
        <div className="pb-14 lg:pb-24">
          <p className="eyebrow on-dark">{hero.eyebrow}</p>
          <h1 className="mt-5 text-h1 uppercase text-white">{hero.heading}</h1>
          <span className="accent-rule mt-6" aria-hidden="true" />
          <p className="mt-6 max-w-xl text-lead text-on-dark">{hero.text}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/contact-us" arrow>
              Get a free estimate
            </Button>
            <a
              href={settings.phoneHref}
              data-track="click_to_call"
              className="inline-flex min-h-13 items-center gap-2.5 rounded-lg border-2 border-white/70 px-7 text-[0.9375rem] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:border-cyan hover:text-cyan"
            >
              <Phone className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              {settings.phone}
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white">
            {hero.badges.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <ShieldCheck className="h-4.5 w-4.5 text-cyan" strokeWidth={2.25} aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto hidden w-full max-w-[330px] self-end lg:block">
          <Image src={images.eagleArmsCrossed.src} alt={images.eagleArmsCrossed.alt} width={images.eagleArmsCrossed.width} height={images.eagleArmsCrossed.height} priority sizes="330px" className="h-auto w-full drop-shadow-[0_30px_40px_rgb(0_0_0/0.6)]" />
        </div>
      </div>

      {stats.length ? (
        <div className="border-t border-ink-line bg-ink/80 backdrop-blur">
          <dl className="container-x grid grid-cols-2 divide-ink-line lg:grid-cols-4 lg:divide-x">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 py-6 text-center">
                <dt className="order-2 text-xs font-bold uppercase tracking-[0.16em] text-on-dark-meta">{s.label}</dt>
                <dd className="order-1 font-display text-4xl font-bold text-cyan">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </section>
  );
}
