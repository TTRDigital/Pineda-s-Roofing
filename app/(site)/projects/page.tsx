import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/data/images";
import { projectStudies } from "@/lib/data/projects";
import { PageHero } from "@/components/sections/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { Photo } from "@/components/ui/Photo";

export const metadata: Metadata = pageMetadata(
  {
    title: "Roofing Project Examples in Maryland | Pineda's Roofing",
    description: "Project examples from Pineda's Roofing: the problem we found, what we did and photos from the job. Roofing contractor in Silver Spring, MD.",
  },
  "/projects",
  images.homeNewRoofAerial,
);

export default async function ProjectsPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <PageHero
        hero={{ eyebrow: "Our work", heading: "Project examples", text: "A closer look at real jobs: where it was, what the problem was and what we did.", image: images.homeNewRoofAerial }}
        crumbs={[{ label: "Projects", href: "/projects" }]}
      />
      <section className="section bg-white">
        <div className="container-x">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projectStudies.map((p) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="group block h-full overflow-hidden rounded-[var(--radius-card)] border border-line transition-shadow hover:shadow-[var(--shadow-card)]">
                  <div className="relative aspect-[4/3] bg-mist">
                    <Photo image={p.after ?? p.photos[0]} sizes="(min-width: 1024px) 30vw, 100vw" />
                  </div>
                  <div className="p-6">
                    <p className="eyebrow plain">{p.service.label}</p>
                    <h2 className="mt-2 font-sans text-xl font-bold text-ink">{p.title}</h2>
                    <p className="mt-2 text-sm text-meta">{p.location}</p>
                    <span className="mt-4 inline-flex items-center gap-2 font-bold uppercase tracking-[0.08em] text-cyan-deep">
                      See the project <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-body">
            More photos are in our <Link href="/gallery" className="font-semibold text-cyan-deep underline">full gallery</Link>.
          </p>
        </div>
      </section>
      <ContactSection settings={settings} />
    </>
  );
}
