import type { Metadata } from "next";
import { getPartners, getRoofingPage, getSiteSettings, getTestimonials } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { LogoGrid } from "@/components/sections/LogoStrip";
import { AtlasBand } from "@/components/sections/AtlasBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { JumpChips } from "@/components/ui/JumpChips";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getRoofingPage();
  return pageMetadata(page.seo, "/services/roofing", page.hero.image);
}

export default async function RoofingPage() {
  const [page, settings, partners, testimonials] = await Promise.all([getRoofingPage(), getSiteSettings(), getPartners(), getTestimonials()]);
  const chips = [
    ...page.sections.filter((s) => s.anchor).map((s) => ({ label: s.anchor!.replace(/-/g, " "), href: `#${s.anchor}` })),
    { label: "Brands we use", href: "#brands" },
    { label: "Insurance", href: "#insurance" },
  ];
  return (
    <>
      <PageHero
        hero={page.hero}
        crumbs={[{ label: "Roofing", href: "/services/roofing" }]}
        ctas={[
          { label: "Get a free estimate", href: "/contact-us" },
          { label: settings.phone, href: settings.phoneHref },
        ]}
      />
      <JumpChips items={chips} />
      {page.sections.map((b, i) => (
        <FeatureSection key={b.title} block={b} index={i} tone={i % 2 ? "mist" : "white"} />
      ))}
      <LogoGrid id="brands" eyebrow="Materials" heading={partners.brandsHeading} text={partners.brandsText} items={partners.brands} tone={page.sections.length % 2 ? "mist" : "white"} />
      <AtlasBand />
      <LogoGrid id="insurance" eyebrow="Insurance claims" heading={partners.insuranceHeading} text={partners.insuranceText} items={partners.insurers} tone="mist" />
      <Testimonials items={testimonials} settings={settings} />
      <FaqSection intro={{ eyebrow: "FAQ", heading: "Roofing questions" }} items={page.faqs} tone="white" />
      <ContactSection settings={settings} />
    </>
  );
}
