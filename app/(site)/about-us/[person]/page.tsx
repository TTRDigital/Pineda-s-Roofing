import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteSettings, getTestimonials } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, siteUrl } from "@/lib/site";
import { images } from "@/lib/data/images";
import { people } from "@/lib/data/people";
import { PageHero } from "@/components/sections/PageHero";
import { HighlightBoxes } from "@/components/ui/HighlightBoxes";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Testimonials } from "@/components/sections/Testimonials";
import { BbbBadge } from "@/components/sections/BbbBadge";
import { ContactSection } from "@/components/sections/ContactSection";

export function generateStaticParams() {
  return people.map((p) => ({ person: p.slug }));
}

export async function generateMetadata(props: PageProps<"/about-us/[person]">): Promise<Metadata> {
  const { person } = await props.params;
  const p = people.find((x) => x.slug === person);
  if (!p) return {};
  return pageMetadata(
    {
      title: `${p.name}, ${p.role} | Pineda's Roofing, Silver Spring, MD`,
      description: `Meet ${p.name}, ${p.role.toLowerCase()} of Pineda's Roofing, a family-owned roofing contractor in Silver Spring, MD serving Maryland and Washington, DC.`,
    },
    `/about-us/${p.slug}`,
    p.image,
  );
}

export default async function PersonPage(props: PageProps<"/about-us/[person]">) {
  const { person } = await props.params;
  const p = people.find((x) => x.slug === person);
  if (!p) notFound();
  const [settings, testimonials] = await Promise.all([getSiteSettings(), getTestimonials()]);
  const other = people.filter((x) => x.slug !== p.slug);
  const path = `/about-us/${p.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": `${absoluteUrl(path)}#person`,
          name: p.name,
          jobTitle: p.role,
          url: absoluteUrl(path),
          worksFor: { "@id": `${siteUrl}/#business` },
          ...(p.image ? { image: absoluteUrl(p.image.src) } : {}),
        }}
      />
      <PageHero
        hero={{ eyebrow: p.role, heading: p.name, text: `${p.name} is part of the family behind Pineda's Roofing in Silver Spring, MD.`, image: images.crew }}
        crumbs={[
          { label: "About us", href: "/about-us" },
          { label: p.name, href: path },
        ]}
      />
      <section className="section bg-white">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="relative isolate" data-reveal>
            {p.image ? (
              <div className="relative aspect-[872/816] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-photo)]">
                <Photo image={{ ...p.image, alt: `${p.name}, ${p.role} of Pineda's Roofing` }} sizes="(min-width: 1024px) 40vw, 100vw" priority />
              </div>
            ) : (
              <div className="flex aspect-[872/816] items-center justify-center rounded-[var(--radius-card)] border-2 border-dashed border-line bg-mist p-8 text-center text-meta">[PHOTO PLACEHOLDER: photo of {p.name}]</div>
            )}
            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line">
              {p.facts.map((f) => (
                <div key={f.label} className="bg-white p-4">
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-meta">{f.label}</dt>
                  <dd className="mt-1 font-semibold text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="eyebrow">About {p.name.split(" ")[0]}</p>
            <h2 className="mt-4 text-h2 uppercase text-ink">{p.name}, {p.role.toLowerCase()} at Pineda&apos;s Roofing</h2>
            <span className="accent-rule mt-5" aria-hidden="true" />
            <div className="prose-short mt-6 text-body">
              {p.bio.map((t) => (
                <p key={t.slice(0, 40)}>{t}</p>
              ))}
            </div>
            <div className="mt-8">
              <HighlightBoxes items={p.focus} label={`What ${p.name.split(" ")[0]} handles`} />
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/contact-us" variant="dark" arrow>
                Talk to the Pinedas
              </Button>
              <Button href="/about-us" variant="outline">
                Back to About us
              </Button>
            </div>
          </div>
        </div>
      </section>
      {other.length ? (
        <section className="bg-mist py-14">
          <div className="container-x">
            <h2 className="text-h3 uppercase text-ink">Meet the rest of the family business</h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {other.map((o) => (
                <li key={o.slug}>
                  <Link href={`/about-us/${o.slug}`} className="inline-flex min-h-11 items-center rounded-full border-2 border-line bg-white px-5 font-semibold text-ink hover:border-cyan hover:bg-cyan-50">
                    {o.name}, {o.role}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <BbbBadge settings={settings} />
      <Testimonials items={testimonials} settings={settings} />
      <ContactSection settings={settings} />
    </>
  );
}
