import Image from "next/image";
import { images } from "@/lib/data/images";

/** Pineda's Roofing logo: black wordmark on light backgrounds, white wordmark on dark ones. */
/** priority: only for the logo in view at load (the header); the footer and menu logos load normally. */
export function Logo({ className = "h-12 w-auto", dark = false, priority = false }: { className?: string; dark?: boolean; priority?: boolean }) {
  const img = dark ? images.logoWhite : images.logo;
  return <Image src={img.src} alt={img.alt} width={img.width} height={img.height} priority={priority} className={className} />;
}
