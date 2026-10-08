import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { SiteSettings } from "@/lib/types";
import type { serviceOptions } from "@/lib/lead-options";
import { images } from "@/lib/data/images";
import { LeadForm } from "@/components/forms/LeadForm";

/** Free estimate form on white, contact details on black, Don Eagle holding the sign. */
export function ContactSection({
  settings,
  heading = "Request your free estimate",
  text = "Tell us where you are and what's going on with your roof. We'll call you back, come out, and give you a straight answer.",
  defaultService,
  id = "estimate",
}: {
  settings: SiteSettings;
  heading?: string;
  text?: string;
  defaultService?: (typeof serviceOptions)[number];
  id?: string;
}) {
  return (
    <section id={id} className="section bg-mist">
      <div className="container-x grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="on-dark relative flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-ink p-8 text-on-dark lg:p-10">
          <p className="eyebrow on-dark">Get started</p>
          <h2 className="mt-4 text-h2 uppercase text-white">{heading}</h2>
          <p className="mt-4">{text}</p>
          <ul className="mt-8 grid gap-5">
            <li>
              <a href={settings.phoneHref} data-track="click_to_call" className="flex items-center gap-4 text-xl font-bold text-white hover:text-cyan">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan text-ink">
                  <Phone className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
                </span>
                {settings.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-4 hover:text-cyan">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-3 text-cyan">
                  <Mail className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                </span>
                {settings.email}
              </a>
            </li>
            <li className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink-3 text-cyan">
                <MapPin className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              </span>
              {settings.street}, {settings.city}, {settings.region} {settings.postalCode}
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink-3 text-cyan">
                <Clock className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              </span>
              <span className="pt-1">
                {settings.hours.map((h) => (
                  <span key={h.label} className="block">
                    <span className="font-semibold text-white">{h.label}:</span> {h.value}
                  </span>
                ))}
              </span>
            </li>
          </ul>
          <p className="mt-8 text-sm font-semibold text-white">{settings.license} · Licensed, insured &amp; bonded</p>
          <div className="relative -mb-10 mt-6 hidden h-64 self-end lg:block" aria-hidden="true">
            <Image src={images.eagleThumbsUp.src} alt="" width={images.eagleThumbsUp.width} height={images.eagleThumbsUp.height} sizes="200px" className="h-full w-auto" />
          </div>
        </div>
        <div className="rounded-[var(--radius-card)] border border-line bg-white p-7 shadow-[var(--shadow-card)] sm:p-10">
          <h3 className="font-display text-h3 uppercase text-ink">Free inspection request</h3>
          <p className="mt-2 text-body">We will call you within 24 hours.</p>
          <div className="mt-8">
            <LeadForm phone={settings.phone} phoneHref={settings.phoneHref} businessName={settings.legalName} defaultService={defaultService} />
          </div>
        </div>
      </div>
    </section>
  );
}
