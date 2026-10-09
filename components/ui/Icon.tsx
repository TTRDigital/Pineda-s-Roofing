import {
  Award,
  BadgeCheck,
  Building2,
  Camera,
  ClipboardCheck,
  Clock,
  BookOpen,
  HandHeart,
  CloudLightning,
  CloudRain,
  DollarSign,
  Droplets,
  FileCheck2,
  Hammer,
  Handshake,
  HardHat,
  House,
  Layers,
  Leaf,
  MapPin,
  Phone,
  Ruler,
  Shield,
  ShieldCheck,
  Siren,
  Star,
  Sun,
  Thermometer,
  Users,
  Warehouse,
  Wind,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/lib/icons";

/** Christian (Latin) cross; lucide's "Cross" is a medical plus. */
function LatinCross({ className, strokeWidth = 1.75 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 2.5v19M6 8h12" />
    </svg>
  );
}

const icons: Record<IconName, LucideIcon> = {
  house: House,
  building: Building2,
  wrench: Wrench,
  hammer: Hammer,
  shield: Shield,
  "shield-check": ShieldCheck,
  storm: CloudLightning,
  siren: Siren,
  droplets: Droplets,
  clipboard: ClipboardCheck,
  "file-check": FileCheck2,
  layers: Layers,
  award: Award,
  "badge-check": BadgeCheck,
  rain: CloudRain,
  wind: Wind,
  sun: Sun,
  ruler: Ruler,
  "hard-hat": HardHat,
  users: Users,
  clock: Clock,
  phone: Phone,
  dollar: DollarSign,
  star: Star,
  "map-pin": MapPin,
  camera: Camera,
  handshake: Handshake,
  leaf: Leaf,
  thermometer: Thermometer,
  warehouse: Warehouse,
  cross: LatinCross as unknown as LucideIcon,
  book: BookOpen,
  "hand-heart": HandHeart,
};

export function Icon({ name, className = "h-6 w-6", strokeWidth = 1.75 }: { name?: IconName | string; className?: string; strokeWidth?: number }) {
  const Cmp = icons[(name ?? "house") as IconName] ?? House;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}

/** Square icon tile: black with a cyan icon on light backgrounds, cyan with a black icon on dark ones. */
export function IconTile({ name, dark = false, size = "md" }: { name?: IconName | string; dark?: boolean; size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-12 w-12 rounded-xl" : "h-16 w-16 rounded-2xl";
  const glyph = size === "sm" ? "h-6 w-6" : "h-7 w-7";
  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${box} ${dark ? "bg-cyan text-ink" : "bg-ink text-cyan"}`}>
      <Icon name={name} className={glyph} />
    </span>
  );
}

/* lucide v1 ships no brand marks, so these are minimal inline glyphs. */
export function SocialIcon({ network, className = "h-5 w-5" }: { network: string; className?: string }) {
  const common = { className, viewBox: "0 0 24 24", "aria-hidden": true as const, fill: "currentColor" };
  switch (network) {
    case "facebook":
      return (
        <svg {...common}>
          <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={1.75}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M6.9 8.9H4V20h2.9V8.9ZM5.5 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM20 13.6c0-3-1.6-4.9-4.2-4.9-1.4 0-2.4.8-2.8 1.5V8.9h-2.8V20h2.9v-5.9c0-1.5.6-2.6 2-2.6s1.9 1 1.9 2.6V20H20v-6.4Z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common}>
          <path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9.1a7.3 7.3 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6Z" />
        </svg>
      );
    case "google":
      return (
        <svg {...common}>
          <path d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3ZM12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Zm-5.6-8a6 6 0 0 1 0-3.9V7.5H3.1a10 10 0 0 0 0 9ZM12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.5l3.3 2.6C7.2 7.8 9.4 6 12 6Z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a7.5 7.5 0 0 1-5.6-2.5c.9-1.7 3.3-2.6 5.6-2.6s4.7.9 5.6 2.6a7.5 7.5 0 0 1-5.6 2.5Z" />
        </svg>
      );
  }
}
