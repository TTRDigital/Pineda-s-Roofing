import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/content";
import { getPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/data/images";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Photo } from "@/components/ui/Photo";

const seo = {
  title: "Roofing Advice for Maryland Homeowners | Pineda's Roofing",
  description: "Plain answers about roof repair and replacement from the Pineda's Roofing family in Silver Spring, MD.",
};

export const metadata: Metadata = pageMetadata(seo, "/blog", images.rooferOnRidge);

export default async function BlogPage() {
  const settings = await getSiteSettings();
  const posts = getPosts();
  return (
    <>
      <PageHero
        hero={{ eyebrow: "Blog", heading: "Roofing advice, plain and simple", text: "Answers to the questions Maryland homeowners ask us most.", image: images.rooferOnRidge }}
        crumbs={[{ label: "Blog", href: "/blog" }]}
      />
      <section className="section bg-white">
        <div className="container-x grid gap-8 md:grid-cols-2">
          {posts.map((p) => (
            <article key={p.slug} className="overflow-hidden rounded-[var(--radius-card)] bg-mist">
              <div className="relative aspect-[16/10]">
                <Photo image={p.hero} sizes="(min-width: 768px) 50vw, 100vw" />
              </div>
              <div className="p-6">
                <h2 className="text-h3 uppercase text-ink">
                  <Link href={`/blog/${p.slug}`} className="hover:text-cyan-deep">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-3 text-ink/80">{p.description}</p>
                <p className="mt-4 text-sm font-semibold">By {p.author.name}</p>
              </div>
            </article>
          ))}
          {!posts.length ? <p>New posts are on the way.</p> : null}
        </div>
      </section>
      <CtaBand phone={settings.phone} phoneHref={settings.phoneHref} />
    </>
  );
}
