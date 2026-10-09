import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/content";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default async function PrivacyPage() {
  const s = await getSiteSettings();
  return (
    <LegalPage title="Privacy policy" updated="October 2026">
      <p>
        This policy explains how {s.legalName} (&quot;{s.name}&quot;, &quot;we&quot;) collects and uses information through this website.
      </p>
      <h2>What we collect</h2>
      <p>When you send a form, we collect the details you enter: name, phone, email, address or ZIP code, the service you need and your message. We also record the page you sent it from and, if present, campaign tags (such as UTM parameters) so we know how you found us.</p>
      <p>Like most websites, we use analytics to understand how visitors use the site. These tools may set cookies and collect device and usage data.</p>
      <h2>How we use it</h2>
      <p>We use your information to respond to your request, schedule inspections, prepare estimates, provide our services and, if you agreed, send you updates about your project by phone, text or email.</p>
      <h2>Text messages</h2>
      <p>If you provide your phone number and consent, we may send text messages about your request and project. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. We do not sell or share your mobile number or SMS consent with third parties for their marketing.</p>
      <h2>Sharing</h2>
      <p>We do not sell your personal information. We share it only with service providers who help us run our business (such as our CRM and website hosting), with your insurance company when you ask us to help with a claim, or when required by law.</p>
      <h2>Your choices</h2>
      <p>
        You can ask us to update or delete your information at any time by emailing <a href={`mailto:${s.email}`}>{s.email}</a> or calling <a href={s.phoneHref}>{s.phone}</a>.
      </p>
      <h2>Contact</h2>
      <p>
        {s.legalName}, {s.city}, {s.region}. {s.phone}.
      </p>
    </LegalPage>
  );
}
