import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ExternalLink } from "lucide-react";
import { getSiteSettings, getTestimonials } from "@/lib/content";
import { solarMarkets } from "@/lib/data/solar";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactSection } from "@/components/sections/ContactSection";

export function generateStaticParams() {
  return solarMarkets.map((m) => ({ market: m.slug }));
}

export async function generateMetadata(props: PageProps<"/solar/[market]">): Promise<Metadata> {
  const { market } = await props.params;
  const m = solarMarkets.find((x) => x.slug === market);
  return m ? pageMetadata(m.seo, `/solar/${m.slug}`) : {};
}

export default async function SolarMarketPage(props: PageProps<"/solar/[market]">) {
  const { market } = await props.params;
  const m = solarMarkets.find((x) => x.slug === market);
  if (!m) notFound();
  const [settings, testimonials] = await Promise.all([getSiteSettings(), getTestimonials()]);
  const other = solarMarkets.find((x) => x.slug !== m.slug);

  return (
    <>
      <PageHero
        hero={m.hero}
        crumbs={[
          { label: "Solar", href: "/services/solar-panel-installation" },
          { label: m.name, href: `/solar/${m.slug}` },
        ]}
        ctas={[
          { label: "Request a Solar Assessment", href: "#estimate" },
          { label: settings.phone, href: settings.phoneHref },
        ]}
      >
        {other ? (
          <p className="mt-8 text-sm text-on-dark">
            Home in {other.name}?{" "}
            <Link href={`/solar/${other.slug}`} className="font-semibold text-cyan underline underline-offset-4 hover:text-cyan-hi">
              See solar in {other.name}
            </Link>
          </p>
        ) : null}
      </PageHero>

      {m.sections.map((sec, i) => (
        <section key={sec.heading} className={`section ${i % 2 ? "bg-mist" : "bg-white"}`}>
          <div className="container-x max-w-4xl">
            <span aria-hidden="true" className="block h-1 w-16 rounded-full bg-cyan" />
            <h2 className="mt-5 text-h2 uppercase text-ink">{sec.heading}</h2>
            {sec.paragraphs.map((t) => (
              <p key={t} className="mt-5 text-lg text-body">
                {t}
              </p>
            ))}
            {sec.highlights?.length ? (
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {sec.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 rounded-lg bg-cyan-50 px-4 py-3 font-semibold text-ink">
                    <Check className="h-5 w-5 shrink-0 text-cyan-deep" strokeWidth={3} aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            ) : null}
            {sec.links?.length ? (
              <ul className="mt-7 flex flex-wrap gap-3">
                {sec.links.map((l) => {
                  const external = l.href.startsWith("http");
                  return (
                    <li key={l.label}>
                      {external ? (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener"
                          data-track="solar_program_link"
                          className="inline-flex min-h-12 items-center gap-2 rounded-lg border-2 border-ink px-5 font-bold text-ink transition-colors hover:bg-ink hover:text-white"
                        >
                          {l.label}
                          <ExternalLink className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
                        </a>
                      ) : (
                        <Link href={l.href} className="inline-flex min-h-12 items-center gap-2 rounded-lg border-2 border-ink px-5 font-bold text-ink transition-colors hover:bg-ink hover:text-white">
                          {l.label}
                          <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </section>
      ))}

      <section className="on-dark bg-ink py-14 text-white">
        <div className="container-x flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow">Solar in {m.name}</p>
            <h2 className="mt-3 text-h3 uppercase">Request a Solar Assessment</h2>
            <p className="mt-2 text-on-dark">Our solar operations team will walk you through your options. Free, no obligation.</p>
          </div>
          <a href="#estimate" className="inline-flex min-h-13 items-center gap-2.5 rounded-lg bg-cyan px-7 font-bold uppercase tracking-[0.08em] text-ink hover:bg-cyan-hi">
            Request a Solar Assessment
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>
      </section>

      <FaqSection intro={{ eyebrow: "FAQ", heading: `Solar in ${m.name}: questions` }} items={m.faqs} />
      <Testimonials items={testimonials} settings={settings} page={`solar-${m.slug}`} />
      <ContactSection
        settings={settings}
        heading="Request a Solar Assessment"
        text={`Tell us about your ${m.name} home. We'll call you back to set up your solar assessment and check your roof.`}
        defaultService="Solar installation"
        defaultMarket={m.formMarket}
      />
    </>
  );
}
