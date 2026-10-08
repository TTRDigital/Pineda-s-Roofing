import type { PageHero as Hero, Cta } from "@/lib/types";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";

/** Black page header with an optional darkened photo behind it. */
export function PageHero({ hero, crumbs, ctas, children }: { hero: Hero; crumbs?: Crumb[]; ctas?: Cta[]; children?: React.ReactNode }) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink">
      {hero.image ? (
        <>
          <div className="absolute inset-0 -z-20">
            <Photo image={hero.image} sizes="100vw" priority />
          </div>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(11_13_16/0.94)_0%,rgb(11_13_16/0.82)_45%,rgb(11_13_16/0.45)_100%)]" />
        </>
      ) : (
        <div aria-hidden="true" className="absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-cyan/15 blur-3xl" />
      )}
      <div className="container-x py-16 lg:py-24">
        {crumbs ? <Breadcrumbs items={crumbs} /> : null}
        <div className="max-w-3xl">
          {hero.eyebrow ? <p className="eyebrow on-dark mt-8">{hero.eyebrow}</p> : null}
          <h1 className="mt-4 text-h1 uppercase text-white">{hero.heading}</h1>
          <span className="accent-rule mt-6" aria-hidden="true" />
          {hero.text ? <p className="mt-6 max-w-2xl text-lead text-on-dark">{hero.text}</p> : null}
          {ctas?.length ? (
            <div className="mt-9 flex flex-wrap gap-4">
              {ctas.map((c, i) => (
                <Button key={c.href} href={c.href} variant={i === 0 ? "primary" : "outline-light"} arrow={i === 0}>
                  {c.label}
                </Button>
              ))}
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
