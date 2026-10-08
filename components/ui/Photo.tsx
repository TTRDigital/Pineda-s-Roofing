import Image from "next/image";
import type { Img } from "@/lib/types";

/** next/image wrapper for local and Sanity photos. Fills its parent unless width/height are known and fill is off. */
export function Photo({
  image,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className = "",
  priority = false,
  fill = true,
}: {
  image: Img;
  sizes?: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}) {
  if (fill || !image.width || !image.height) {
    return <Image src={image.src} alt={image.alt} fill sizes={sizes} className={`object-cover ${className}`} priority={priority} quality={75} />;
  }
  return <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={sizes} className={className} priority={priority} quality={75} />;
}
