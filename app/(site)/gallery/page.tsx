import type { Metadata } from "next";
import { getProjects, getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/data/images";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Gallery } from "@/components/gallery/Gallery";

export const revalidate = 300;

const seo = {
  title: "Roofing Project Gallery | Pineda's Roofing",
  description: "Photos of real Pineda's Roofing jobs across Maryland: roof replacements, repairs, storm damage, flat roofs, chimney flashing and gutters.",
};

export const metadata: Metadata = pageMetadata(seo, "/gallery", images.aerialNewShingleRoof);

export default async function GalleryPage() {
  const [projects, settings] = await Promise.all([getProjects(), getSiteSettings()]);
  return (
    <>
      <PageHero
        hero={{ eyebrow: "Gallery", heading: "Our work", text: "Real Maryland jobs by our own crews. Tap a project to see every photo.", image: images.completedRoofAerial }}
        crumbs={[{ label: "Gallery", href: "/gallery" }]}
      />
      <section className="section bg-white">
        <div className="container-x">
          <Gallery projects={projects} />
        </div>
      </section>
      <CtaBand heading="Want your roof in here next?" phone={settings.phone} phoneHref={settings.phoneHref} />
    </>
  );
}
