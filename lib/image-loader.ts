/*
 * next/image loader for the static export (no image server on SiteGround).
 * - Local photos: WebP copies at fixed widths, made before the build by
 *   scripts/optimize-images.mjs (public/images/x.jpg -> /_img/images/x-640.webp).
 * - Sanity photos: Sanity's own image CDN resizes them.
 * - SVGs are served as they are.
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://cdn.sanity.io/")) {
    const sep = src.includes("?") ? "&" : "?";
    return `${src}${sep}w=${width}&q=${quality || 75}&fit=max&auto=format`;
  }
  if (!src.startsWith("/images/") || src.endsWith(".svg")) return src;
  return `/_img${src.replace(/\.(jpe?g|png|webp)$/i, "")}-${width}.webp`;
}
