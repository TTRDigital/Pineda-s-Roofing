import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Service, SiteSettings } from "@/lib/types";
import { Logo } from "@/components/layout/Logo";
import { SocialIcon } from "@/components/ui/Icon";

const company = [
  { label: "About us", href: "/about" },
  { label: "Atlas roofing", href: "/atlas" },
  { label: "Insurance claims", href: "/insurance-claims" },
  { label: "Gallery", href: "/gallery" },
  { label: "Service areas", href: "/service-area" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Footer({ settings, services }: { settings: SiteSettings; services: Service[] }) {
  const year = new Date().getFullYear();
  const address = [settings.street, `${settings.city}, ${settings.region} ${settings.postalCode}`].filter(Boolean);
  return (
    <footer className="on-dark bg-ink text-on-dark">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,1.1fr)] lg:py-20">
        <div>
          <Logo className="h-14 w-auto" dark />
          <p className="mt-6 max-w-sm text-[0.95rem]">
            Family-owned roofing contractor in {settings.city}, {settings.region}. Residential and commercial roofing, repairs and storm restoration for over three decades.
          </p>
          <p className="mt-5 text-sm font-semibold text-white">
            Licensed, insured &amp; bonded <span className="text-cyan">·</span> {settings.license}
          </p>
          {settings.social.length ? (
            <ul className="mt-6 flex gap-3">
              {settings.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener" aria-label={s.network} className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink-3 text-white transition-colors hover:bg-cyan hover:text-ink">
                    <SocialIcon network={s.network} />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <nav aria-label="Roofing services">
          <p className="font-display text-lg font-bold uppercase tracking-[0.06em] text-white">Roofing</p>
          <ul className="mt-5 grid gap-2.5 text-[0.95rem]">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-cyan">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className="font-display text-lg font-bold uppercase tracking-[0.06em] text-white">Company</p>
          <ul className="mt-5 grid gap-2.5 text-[0.95rem]">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-cyan">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-lg font-bold uppercase tracking-[0.06em] text-white">Contact</p>
          <ul className="mt-5 grid gap-4 text-[0.95rem]">
            <li>
              <a href={settings.phoneHref} data-track="click_to_call" className="flex items-center gap-3 text-lg font-bold text-white hover:text-cyan">
                <Phone className="h-5 w-5 text-cyan" strokeWidth={2} aria-hidden="true" />
                {settings.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-3 hover:text-cyan">
                <Mail className="h-5 w-5 shrink-0 text-cyan" strokeWidth={2} aria-hidden="true" />
                {settings.email}
              </a>
            </li>
            {address.length ? (
              <li>
                <a href={settings.mapsUrl} target="_blank" rel="noopener" className="flex items-start gap-3 hover:text-cyan">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cyan" strokeWidth={2} aria-hidden="true" />
                  <span>
                    {address.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </span>
                </a>
              </li>
            ) : null}
            {settings.hours.length ? (
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-cyan" strokeWidth={2} aria-hidden="true" />
                <dl className="grid gap-1">
                  {settings.hours.map((h) => (
                    <div key={h.label} className="flex flex-wrap gap-x-2">
                      <dt className="font-semibold text-white">{h.label}:</dt>
                      <dd>{h.value}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-line">
        <div className="container-x flex flex-col gap-3 py-6 text-sm text-on-dark-meta sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {settings.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
