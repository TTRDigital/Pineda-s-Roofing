import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/content";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = { title: "Terms and Conditions", alternates: { canonical: "/terms" } };

export default async function TermsPage() {
  const s = await getSiteSettings();
  return (
    <LegalPage title="Terms and conditions" updated="October 2026">
      <p>
        These terms apply to your use of this website, operated by {s.legalName} ({s.license}).
      </p>
      <h2>Information on this site</h2>
      <p>Content on this website is general information about our services. It is not a quote. Prices, scope, timelines and warranty terms for your project are set out in your written estimate and contract.</p>
      <h2>Estimates and inspections</h2>
      <p>Free inspections and estimates carry no obligation. An estimate is based on what we can see and access at the time; hidden conditions, such as damaged decking, may change the scope and will be discussed with you before any extra work.</p>
      <h2>Communications</h2>
      <p>By sending a form you agree that we may contact you by phone, text and email about your request. Message and data rates may apply. Reply STOP to stop texts at any time.</p>
      <h2>Warranties</h2>
      <p>Manufacturer warranties are provided by the manufacturer under its own terms. Our workmanship warranty is described in your contract.</p>
      <h2>Contact</h2>
      <p>
        Questions? Call <a href={s.phoneHref}>{s.phone}</a> or email <a href={`mailto:${s.email}`}>{s.email}</a>.
      </p>
    </LegalPage>
  );
}
