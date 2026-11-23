/*
 * next/image loader for the static export (no image server on SiteGround).
 * - Local photos: WebP copies at fixed widths, made before the build by
 *   scripts/optimize-images.mjs (public/images/x.jpg -> /_img/images/x-640.webp).
 * - Sanity photos: Sanity's own image CDN resizes them.
 * - SVGs are served as they are.
 */
/** Page heroes (components/ui/Photo.tsx, hero) ask for this quality: only their phone-size copies use it. */
export const HERO_QUALITY = 60;
const HERO_WIDTHS = [640, 828];

export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://cdn.sanity.io/")) {
    const sep = src.includes("?") ? "&" : "?";
    return `${src}${sep}w=${width}&q=${!quality || quality === HERO_QUALITY ? 75 : quality}&fit=max&auto=format`;
  }
  if (!src.startsWith("/images/") || src.endsWith(".svg")) return src;
  const base = `/_img${src.replace(/\.(jpe?g|png|webp)$/i, "")}-${width}`;
  // Hero photos on phones: the same photo, a little smaller (scripts/optimize-images.mjs makes these copies).
  return quality === HERO_QUALITY && HERO_WIDTHS.includes(width) ? `${base}-q${HERO_QUALITY}.webp` : `${base}.webp`;
}
