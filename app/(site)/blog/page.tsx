import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPosts, getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/text";
import { images } from "@/lib/data/images";
import { PageHero } from "@/components/sections/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";

const seo = {
  title: "Roofing & Solar Blog | Pineda's Roofing",
  description: "Roofing and solar advice for homeowners in Baltimore, Howard, Anne Arundel and Prince George's County, Maryland, and Washington, DC.",
};

export const metadata: Metadata = pageMetadata(seo, "/blog", images.rooferOnRidge);

export default async function BlogPage() {
  const [posts, settings] = await Promise.all([getPosts(), getSiteSettings()]);
  return (
    <>
      <PageHero
        hero={{
          eyebrow: "Blog",
          heading: "Roofing and solar advice",
          text: "Straight answers for homeowners in Maryland and Washington, DC, from a family-owned roofing company.",
        }}
        crumbs={[{ label: "Blog", href: "/blog" }]}
      />
      <section className="section bg-white">
        <div className="container-x">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <li key={p.slug} className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white" data-reveal style={{ "--i": i } as React.CSSProperties}>
                {p.image ? (
                  <div className="relative aspect-[16/10]">
                    <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
                  </div>
                ) : (
                  <div aria-hidden="true" className="aspect-[16/10] bg-[linear-gradient(135deg,#0b0d10,#12303d)]" />
                )}
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-sm font-semibold text-meta">{formatDate(p.date)}</p>
                  <h2 className="mt-2 text-h3 uppercase text-ink">
                    <Link href={`/blog/${p.slug}`} className="hover:text-cyan-deep">
                      {p.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-body">{p.excerpt}</p>
                  <Link href={`/blog/${p.slug}`} className="mt-5 inline-flex items-center gap-2 font-bold uppercase tracking-[0.08em] text-cyan-deep hover:underline">
                    Read more
                    <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ContactSection settings={settings} />
    </>
  );
}
