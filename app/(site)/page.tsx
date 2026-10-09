import type { Metadata } from "next";
import { counties, getHome, getLocations, getPartners, getProjects, getSiteSettings, getTestimonials } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/data/images";
import { Hero } from "@/components/home/Hero";
import { LogoGrid, LogoMarquee } from "@/components/sections/LogoStrip";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { FaithSection } from "@/components/sections/FaithSection";
import { CardGrid } from "@/components/sections/CardGrid";
import { SplitTiles } from "@/components/sections/SplitTiles";
import { RoofDiagram } from "@/components/sections/RoofDiagram";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Gallery } from "@/components/gallery/Gallery";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHome();
  return pageMetadata(home.seo, "/", home.hero.image);
}

export default async function HomePage() {
  const [home, settings, partners, testimonials, projects, locations] = await Promise.all([
    getHome(),
    getSiteSettings(),
    getPartners(),
    getTestimonials(),
    getProjects(),
    getLocations(),
  ]);
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <Hero hero={home.hero} stats={home.stats} settings={settings} />
      <LogoMarquee label="Brands we install" items={partners.brands} />

      {home.sections.map((b, i) => (
        <FeatureSection key={b.title} block={b} index={i} />
      ))}
      <FaithSection faith={home.faith} />

      <CardGrid intro={home.servicesIntro} cards={home.serviceCards} />

      <SplitTiles
        tone="mist"
        intro={{ eyebrow: "Roofing", heading: "For homes and businesses", text: "One family-owned team for residential and commercial roofs across Maryland and the DMV." }}
        tiles={[
          {
            href: "/services/residential-roofing",
            eyebrow: "Residential",
            title: "Residential roofing",
            text: "Replacements, repairs and new roofs for Maryland homes, with Atlas Pinnacle Pristine shingles as standard.",
            image: images.homeNewRoofAerial,
            icon: "house",
          },
          {
            href: "/services/commercial-roofing",
            eyebrow: "Commercial",
            title: "Commercial roofing",
            text: "TPO, EPDM and modified bitumen systems, scheduled around your business hours and your tenants.",
            image: images.flatRoofSkylight,
            icon: "building",
          },
        ]}
      />

      <RoofDiagram intro={home.anatomyIntro} layers={home.anatomy} />
      <CardGrid intro={home.whyIntro} cards={home.why} tone="dark" />
      <CardGrid intro={home.processIntro} cards={home.process} numbered columns={4} />

      {featured.length ? (
        <section className="section bg-mist">
          <div className="container-x">
            <SectionHeading eyebrow="Recent work" heading="Maryland roofs we've built" />
            <div className="mt-12">
              <Gallery projects={featured} filters={false} limit={6} />
            </div>
            <div className="mt-10 flex justify-center">
              <Button href="/gallery" variant="dark" arrow>
                See the full gallery
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      <Testimonials items={testimonials} settings={settings} />
      <LogoGrid eyebrow="Insurance claims" heading={partners.insuranceHeading} text={partners.insuranceText} items={partners.insurers} />
      <ServiceAreas counties={counties} locations={locations} tone="mist" phone={settings.phone} />
      <FaqSection intro={home.faqIntro} items={home.faqs} tone="white" />
      <ContactSection settings={settings} />
    </>
  );
}
