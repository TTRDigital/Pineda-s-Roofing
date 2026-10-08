import type { Metadata } from "next";
import type { Img, Seo } from "@/lib/types";
import { images } from "@/lib/data/images";

const SITE_NAME = "Pineda's Roofing";

/** One place for title, description, canonical, Open Graph and Twitter tags. */
export function pageMetadata(seo: Seo, path: string, fallbackImage?: Img): Metadata {
  const image = seo.image ?? fallbackImage ?? images.aerialNewShingleRoof;
  const og = { url: image.src, width: image.width, height: image.height, alt: image.alt };
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical: path },
    robots: seo.noIndex ? { index: false, follow: true } : undefined,
    openGraph: { type: "website", siteName: SITE_NAME, locale: "en_US", url: path, title: seo.title, description: seo.description, images: [og] },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: [image.src] },
  };
}
