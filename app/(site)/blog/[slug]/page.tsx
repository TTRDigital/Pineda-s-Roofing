import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteSettings } from "@/lib/content";
import { getPost, getPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, siteUrl } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Photo } from "@/components/ui/Photo";
import { HighlightBoxes } from "@/components/ui/HighlightBoxes";
import { JsonLd } from "@/components/ui/JsonLd";

export const dynamicParams = false;

export async function generateStaticParams() {
  // Next's static export needs at least one param; a placeholder 404s via notFound().
  const slugs = getPosts().map((p) => ({ slug: p.slug }));
  return slugs.length ? slugs : [{ slug: "_none" }];
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  const meta = pageMetadata({ title: `${post.title} | Pineda's Roofing`, description: post.description }, `/blog/${slug}`, post.hero);
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: post.datePublished, modifiedTime: post.dateModified, authors: [post.author.name] } };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();
  const settings = await getSiteSettings();
  const path = `/blog/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    mainEntityOfPage: absoluteUrl(path),
    image: absoluteUrl(post.hero.src),
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: { "@type": "Person", name: post.author.name, jobTitle: post.author.role, worksFor: { "@id": `${siteUrl}/#business` } },
    publisher: { "@id": `${siteUrl}/#business` },
  };

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        hero={{ eyebrow: "Roofing advice", heading: post.title, image: post.hero }}
        crumbs={[{ label: "Blog", href: "/blog" }, { label: post.title, href: path }]}
      />
      <article className="section bg-white">
        <div className="container-x max-w-3xl">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full">
              <Photo image={post.author.image} sizes="56px" />
            </div>
            <p className="text-sm">
              <span className="block font-bold text-ink">By {post.author.name}</span>
              <span className="text-ink/70">
                {post.author.role}, Pineda&apos;s Roofing. <time dateTime={post.datePublished}>{new Date(post.datePublished + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>
              </span>
            </p>
          </div>

          <p className="mt-8 rounded-[var(--radius-card)] border-l-4 border-cyan bg-mist p-6 text-lead text-ink">{post.answer}</p>

          {post.sections.map((s) => (
            <section key={s.heading} className="mt-12">
              <h2 className="text-h3 uppercase text-ink">{s.heading}</h2>
              <span className="accent-rule mt-4" aria-hidden="true" />
              {s.image ? (
                <figure className="mt-6">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-photo)]">
                    <Photo image={s.image} sizes="(min-width: 768px) 768px, 100vw" />
                  </div>
                  {s.caption ? <figcaption className="mt-2 text-sm text-ink/70">{s.caption}</figcaption> : null}
                </figure>
              ) : null}
              <div className="mt-5 grid gap-4 text-[1.0625rem] leading-relaxed">
                {s.paragraphs.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
              {s.highlights ? (
                <div className="mt-6">
                  <HighlightBoxes items={s.highlights} columns={1} label={s.highlightsLabel} />
                </div>
              ) : null}
            </section>
          ))}

          <p className="mt-12 text-[1.0625rem]">
            Want a roofer to look at yours? See our{" "}
            <Link href={`/services/${post.service.slug}`} className="font-semibold text-cyan-deep underline underline-offset-4">
              {post.service.label} page
            </Link>{" "}
            or call {settings.phone}.
          </p>

          <aside className="mt-12 border-t border-ink/10 pt-6 text-sm text-ink/70">
            <p className="font-bold text-ink">Sources</p>
            <ul className="mt-2 grid gap-1.5">
              {post.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} rel="noopener noreferrer" target="_blank" className="underline underline-offset-2 hover:text-cyan-deep">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </article>
      <CtaBand phone={settings.phone} phoneHref={settings.phoneHref} />
    </>
  );
}
