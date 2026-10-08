import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/data/images";
import { PageHero } from "@/components/sections/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";

export const revalidate = 300;

const seo = {
  title: "Contact Pineda's Roofing | Free Roof Estimate",
  description: "Request a free roof inspection and estimate from Pineda's Roofing in Silver Spring, MD. Call (301) 921-6333. 24/7 emergency roof repair.",
};

export const metadata: Metadata = pageMetadata(seo, "/contact-us", images.crew);

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const mapQuery = encodeURIComponent(`${settings.street}, ${settings.city}, ${settings.region} ${settings.postalCode}`);
  return (
    <>
      <PageHero
        hero={{ eyebrow: "Contact", heading: "Get your free estimate", text: "Call, email or send the form. We'll call you within 24 hours, and right away for emergencies." }}
        crumbs={[{ label: "Contact", href: "/contact-us" }]}
      />
      <ContactSection settings={settings} heading="Talk to a Pineda" />
      <section aria-label="Map" className="h-[420px] bg-mist">
        <iframe
          title={`Map to ${settings.name}`}
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
