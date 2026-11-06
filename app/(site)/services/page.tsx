import type { Metadata } from "next";
import { getServices, getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/data/images";
import { PageHero } from "@/components/sections/PageHero";
import { CardGrid } from "@/components/sections/CardGrid";
import { AtlasBand } from "@/components/sections/AtlasBand";
import { ContactSection } from "@/components/sections/ContactSection";


const seo = {
  title: "Roofing & Exterior Services in Maryland | Pineda's Roofing",
  description: "Roof replacement, repair, emergency and storm restoration, solar, plus gutters, siding, windows, chimneys, masonry and hardscaping across Maryland and Washington, DC.",
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
          text: "Roofing, solar, gutters, siding, windows and masonry from a family-owned Silver Spring, MD company.",
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
        cards={[{ icon: "layers", title: "Roofing overview", text: "Residential and commercial roofing, brands we use and how we work.", href: "/services/roofing" }, ...services.filter((s) => s.category !== "exterior" && s.category !== "solar").map(card)]}
      />
      <CardGrid
        intro={{ eyebrow: "Solar", heading: "Solar installation", text: "We now offer solar, so one team can look at your roof and your solar plan together." }}
        cards={services.filter((s) => s.category === "solar").map(card)}
        tone="mist"
      />
      <CardGrid intro={{ eyebrow: "Exterior", heading: "Gutters, siding & more", text: "The rest of the outside of your home, done with the same standards." }} cards={services.filter((s) => s.category === "exterior").map(card)} />
      <AtlasBand />
      <ContactSection settings={settings} />
    </>
  );
}
