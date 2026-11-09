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

      <section className="on-dark relative overflow-hidden bg-ink py-16 text-white">
        <span aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan/20 blur-3xl" />
        <div className="container-x relative grid items-center gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <p className="eyebrow">Now offering solar</p>
            <h2 className="mt-3 text-h2 uppercase">Solar, planned by roofers</h2>
            <p className="mt-4 max-w-2xl text-lg text-on-dark">
              We now install solar for homes in Maryland and Washington, DC. Because we&apos;re roofers first, we check and prepare your roof before any panels go on, so the roof lasts as long as the system.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button href="/services/solar-panel-installation" arrow>
              Learn about solar
            </Button>
            <Button href="/service-area/washington-dc" variant="outline-light">
              Solar in Washington, DC
            </Button>
          </div>
        </div>
      </section>

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
            image: images.flatRoofMembrane,
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
