import Image from "next/image";
import { images } from "@/lib/data/images";

/** Pineda's Roofing logo: black wordmark on light backgrounds, white wordmark on dark ones. */
export function Logo({ className = "h-12 w-auto", dark = false }: { className?: string; dark?: boolean }) {
  const img = dark ? images.logoWhite : images.logo;
  return <Image src={img.src} alt={img.alt} width={img.width} height={img.height} priority className={className} />;
}
