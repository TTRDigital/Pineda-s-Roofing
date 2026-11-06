import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { projectStudies } from "@/lib/data/projects";
import { PageHero } from "@/components/sections/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { HighlightBoxes } from "@/components/ui/HighlightBoxes";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { BeforeAfter } from "@/components/gallery/BeforeAfter";

export function generateStaticParams() {
  return projectStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = projectStudies.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMetadata(
    { title: `${p.title} | Pineda's Roofing Project`, description: `${p.title}: the problem, what Pineda's Roofing did and photos from the job. ${p.service.label} from a Silver Spring, MD roofing contractor.` },
    `/projects/${slug}`,
    p.after ?? p.photos[0],
  );
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const p = projectStudies.find((x) => x.slug === slug);
  if (!p) notFound();
  const settings = await getSiteSettings();
  return (
    <>
      <PageHero
        hero={{ eyebrow: p.service.label, heading: p.title, text: p.location, image: p.after ?? p.photos[0] }}
        crumbs={[
          { label: "Projects", href: "/projects" },
          { label: p.title, href: `/projects/${slug}` },
        ]}
      />
      <section className="section bg-white">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <p className="eyebrow">The problem</p>
            <p className="mt-4 text-lead text-ink">{p.problem}</p>
            <h2 className="mt-12 text-h3 uppercase text-ink">What we did</h2>
            <div className="mt-6">
              <HighlightBoxes items={p.work} columns={1} />
            </div>
            <h2 className="mt-12 text-h3 uppercase text-ink">The result</h2>
            <p className="mt-4 text-body">{p.result}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={p.service.href} variant="dark" arrow>
                {p.service.label}
              </Button>
              <Button href="/projects" variant="outline">
                All projects
              </Button>
            </div>
          </div>
          <div className="grid gap-5">
            {p.before && p.after ? (
              <BeforeAfter before={p.before} after={p.after} />
            ) : null}
            {p.photos.map((ph) => (
              <div key={ph.src} className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-mist">
                <Photo image={ph} sizes="(min-width: 1024px) 40vw, 100vw" />
              </div>
            ))}
            <p className="text-sm text-meta">
              [PLACEHOLDER: add more photos and the job details above. See also the <Link href="/gallery" className="underline">gallery</Link>.]
            </p>
          </div>
        </div>
      </section>
      <ContactSection settings={settings} />
    </>
  );
}
