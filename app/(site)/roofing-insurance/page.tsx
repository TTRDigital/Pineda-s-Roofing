import type { Metadata } from "next";
import { getInsurancePage, getPartners, getSiteSettings, getTestimonials } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { CardGrid } from "@/components/sections/CardGrid";
import { LogoGrid } from "@/components/sections/LogoStrip";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getInsurancePage();
  return pageMetadata(page.seo, "/roofing-insurance", page.hero.image);
}

export default async function InsurancePage() {
  const [page, settings, partners, testimonials] = await Promise.all([getInsurancePage(), getSiteSettings(), getPartners(), getTestimonials()]);
  return (
    <>
      <PageHero
        hero={page.hero}
        crumbs={[{ label: "Insurance claims", href: "/roofing-insurance" }]}
        ctas={[
          { label: "Free damage assessment", href: "#estimate" },
          { label: settings.phone, href: settings.phoneHref },
        ]}
      />
      {page.sections.map((b, i) => (
        <FeatureSection key={b.title} block={b} index={i} tone={i % 2 ? "mist" : "white"} />
      ))}
      <LogoGrid eyebrow="Every carrier" heading={partners.insuranceHeading} text={partners.insuranceText} items={partners.insurers} tone="mist" />
      <CardGrid intro={page.stepsIntro} cards={page.steps} numbered columns={3} />
      <CardGrid intro={page.signsIntro} cards={page.signs} tone="dark" columns={4} />
      <Testimonials items={testimonials} settings={settings} />
      <FaqSection intro={{ eyebrow: "FAQ", heading: "Insurance claim questions" }} items={page.faqs} />
      <ContactSection settings={settings} heading="Think you have storm damage?" defaultService="Storm damage / insurance claim" />
    </>
  );
}
