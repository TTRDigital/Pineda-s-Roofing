import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getLocations, getPost, getPosts, getServices, getSiteSettings } from "@/lib/content";
import { fallbackPosts } from "@/lib/data/posts";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, siteUrl } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { formatDate } from "@/lib/text";

export async function generateStaticParams() {
  return fallbackPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) return {};
  return pageMetadata(post.seo ?? { title: `${post.title} | Pineda's Roofing`, description: post.excerpt }, `/blog/${slug}`, post.image);
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const [post, posts, locations, services, settings] = await Promise.all([getPost(slug), getPosts(), getLocations(), getServices(), getSiteSettings()]);
  if (!post) notFound();
  const areas = (post.areas ?? []).map((a) => locations.find((l) => l.slug === a && l.featured)).filter((l) => !!l);
  const service = services.find((s) => s.slug === post.service);
  const more = posts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <PageHero
        hero={{ eyebrow: `Blog · ${formatDate(post.date)}`, heading: post.title, text: post.excerpt }}
        crumbs={[
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${slug}` },
        ]}
      />
      <article className="section bg-white">
        <div className="container-x mx-auto max-w-3xl">
          {post.image ? (
            <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-[var(--radius-card)]">
              <Image src={post.image.src} alt={post.image.alt} fill sizes="(min-width: 768px) 48rem, 100vw" className="object-cover" priority />
            </div>
          ) : null}
          {post.sections.map((sec) => (
            <section key={sec.heading} className="mt-10 first:mt-0">
              <h2 className="text-h3 uppercase text-ink">{sec.heading}</h2>
              {sec.paragraphs.map((t) => (
                <p key={t} className="mt-4 text-lg leading-relaxed text-body">
                  {t}
                </p>
              ))}
            </section>
          ))}

          {areas.length || service ? (
            <aside className="mt-14 rounded-[var(--radius-card)] border border-line bg-mist p-7">
              <p className="eyebrow plain">Related</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {service ? (
                  <li>
                    <Link href={`/services/${service.slug}`} className="inline-flex min-h-10 items-center rounded-full bg-white px-4 text-sm font-semibold text-ink ring-1 ring-line hover:bg-cyan hover:ring-cyan">
                      {service.title}
                    </Link>
                  </li>
                ) : null}
                {areas.map((l) => (
                  <li key={l!.slug}>
                    <Link href={`/service-area/${l!.slug}`} className="inline-flex min-h-10 items-center rounded-full bg-white px-4 text-sm font-semibold text-ink ring-1 ring-line hover:bg-cyan hover:ring-cyan">
                      {l!.heading ?? `Roofing contractor in ${l!.name}`}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}

          <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-line pt-6 font-semibold">
            <Link href="/blog" className="inline-flex items-center gap-2 text-cyan-deep hover:underline">
              <ArrowLeft className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              All posts
            </Link>
            {more.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="inline-flex items-center gap-2 text-cyan-deep hover:underline">
                {p.title}
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </article>
      <ContactSection settings={settings} defaultService={post.service === "solar-panel-installation" ? "Solar installation" : undefined} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          url: absoluteUrl(`/blog/${slug}`),
          ...(post.image ? { image: absoluteUrl(post.image.src) } : {}),
          author: { "@id": `${siteUrl}/#business` },
          publisher: { "@id": `${siteUrl}/#business` },
        }}
      />
    </>
  );
}
