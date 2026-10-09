import type { Metadata } from "next";
import { counties, getLocations, getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/data/images";
import { PageHero } from "@/components/sections/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { ServiceAreas } from "@/components/sections/ServiceAreas";

export const revalidate = 300;

const seo = {
  title: "Contact Pineda's Roofing | Free Roof Estimate",
  description: "Request a free roof inspection and estimate from Pineda's Roofing in Silver Spring, MD. Call (301) 921-6333. 24/7 emergency roof repair.",
};

export const metadata: Metadata = pageMetadata(seo, "/contact-us", images.crew);

export default async function ContactPage() {
  const [settings, locations] = await Promise.all([getSiteSettings(), getLocations()]);
  return (
    <>
      <PageHero
        hero={{ eyebrow: "Contact", heading: "Get your free estimate", text: "Call, email or send the form. We'll call you within 24 hours, and right away for emergencies." }}
        crumbs={[{ label: "Contact", href: "/contact-us" }]}
      />
      <ContactSection settings={settings} heading="Talk to a Pineda" />
      <ServiceAreas counties={counties} locations={locations} phone={settings.phone} />
    </>
  );
}
