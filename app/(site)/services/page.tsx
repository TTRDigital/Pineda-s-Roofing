import type { Metadata } from "next";
import { getServices, getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/data/images";
import { PageHero } from "@/components/sections/PageHero";
import { CardGrid } from "@/components/sections/CardGrid";
import { AtlasBand } from "@/components/sections/AtlasBand";
import { ContactSection } from "@/components/sections/ContactSection";

export const revalidate = 300;

const seo = {
  title: "Roofing & Exterior Services in Maryland | Pineda's Roofing",
  description: "Roof replacement, repair, emergency and storm restoration, plus gutters, siding, windows, chimneys, masonry and hardscaping across Maryland and the DMV.",
};

export const metadata: Metadata = pageMetadata(seo, "/services", images.rooferOnRidge);

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSiteSettings()]);
  const card = (s: (typeof services)[number]) => ({ icon: s.icon, title: s.title, text: s.summary, href: `/services/${s.slug}` });
  return (
    <>
      <PageHero
        hero={{
          eyebrow: "Services",
          heading: "Maryland exteriors, end to end",
          text: "Roofing, gutters, siding, windows and masonry, backed by over 30 years of family-owned craftsmanship.",
          image: images.rooferOnRidge,
        }}
        crumbs={[{ label: "Services", href: "/services" }]}
        ctas={[
          { label: "Get a free estimate", href: "#estimate" },
          { label: settings.phone, href: settings.phoneHref },
        ]}
      />
      <CardGrid
        intro={{ eyebrow: "Roofing", heading: "Roofing services", text: "Homes and commercial buildings, new roofs and repairs, storms and emergencies." }}
        cards={[{ icon: "layers", title: "Roofing overview", text: "Residential and commercial roofing, brands we use and how we work.", href: "/services/roofing" }, ...services.filter((s) => s.category !== "exterior").map(card)]}
      />
      <CardGrid intro={{ eyebrow: "Exterior", heading: "Gutters, siding & more", text: "The rest of the outside of your home, done with the same standards." }} cards={services.filter((s) => s.category === "exterior").map(card)} tone="mist" />
      <AtlasBand />
      <ContactSection settings={settings} />
    </>
  );
}
