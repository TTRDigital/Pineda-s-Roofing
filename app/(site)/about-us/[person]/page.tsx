import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone } from "lucide-react";
import { getAboutPage, getSiteSettings } from "@/lib/content";
import { fallbackAbout } from "@/lib/data/pages";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, siteUrl } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { BbbBadge } from "@/components/ui/BbbBadge";

export async function generateStaticParams() {
  return fallbackAbout.team.map((p) => ({ person: p.slug }));
}

async function getPerson(slug: string) {
  const about = await getAboutPage();
  return about.team.find((p) => p.slug === slug) ?? null;
}

export async function generateMetadata(props: PageProps<"/about-us/[person]">): Promise<Metadata> {
  const { person: slug } = await props.params;
  const p = await getPerson(slug);
  if (!p) return {};
  return pageMetadata(
    {
      title: `${p.name}, ${p.role} | Pineda's Roofing`,
      description: `Meet ${p.name}, ${p.role.toLowerCase()} of Pineda's Roofing, the family-owned Maryland roofing contractor.`,
      image: p.image,
      noIndex: p.noIndex,
    },
    `/about-us/${slug}`,
  );
}

export default async function PersonPage(props: PageProps<"/about-us/[person]">) {
  const { person: slug } = await props.params;
  const [about, settings] = await Promise.all([getAboutPage(), getSiteSettings()]);
  const p = about.team.find((x) => x.slug === slug);
  if (!p) notFound();
  const others = about.team.filter((x) => x.slug !== slug);

  return (
    <>
      <PageHero
        hero={{ eyebrow: p.role, heading: p.name, text: p.text }}
        crumbs={[
          { label: "About us", href: "/about-us" },
          { label: p.name, href: `/about-us/${slug}` },
        ]}
      />
      <section className="section bg-white">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {p.image ? (
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-line" data-reveal>
              <Image src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} sizes="(min-width: 1024px) 40vw, 100vw" className="h-auto w-full" priority />
            </div>
          ) : null}
          <div>
            <p className="eyebrow">{p.role}, Pineda&apos;s Roofing</p>
            <h2 className="mt-3 text-h2 uppercase text-ink">About {p.name.split(" ")[0]}</h2>
            <span aria-hidden="true" className="mt-5 block h-1 w-16 rounded-full bg-cyan" />
            {(p.bio?.length ? p.bio : p.text ? [p.text] : []).map((t) => (
              <p key={t} className="mt-5 text-lg text-body">
                {t}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={settings.phoneHref} data-track="click_to_call" className="inline-flex min-h-13 items-center gap-2.5 rounded-lg bg-cyan px-7 font-bold uppercase tracking-[0.08em] text-ink hover:bg-cyan-hi">
                <Phone className="h-4.5 w-4.5" strokeWidth={2.25} aria-hidden="true" />
                {settings.phone}
              </a>
              <BbbBadge bbb={settings.bbb} />
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 font-semibold">
              <Link href="/about-us" className="inline-flex items-center gap-2 text-cyan-deep hover:underline">
                <ArrowLeft className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
                About Pineda&apos;s Roofing
              </Link>
              {others.map((o) => (
                <Link key={o.slug} href={`/about-us/${o.slug}`} className="text-cyan-deep hover:underline">
                  Meet {o.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ContactSection settings={settings} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: p.name,
          jobTitle: p.role,
          url: absoluteUrl(`/about-us/${slug}`),
          ...(p.image ? { image: absoluteUrl(p.image.src) } : {}),
          worksFor: { "@id": `${siteUrl}/#business` },
        }}
      />
    </>
  );
}
