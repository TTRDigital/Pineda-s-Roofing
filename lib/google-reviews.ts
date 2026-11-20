import "server-only";
import { cache } from "react";
import type { Testimonial } from "@/lib/types";

/*
 * Live Google reviews, read once per build from the Places API (New).
 * The key is the GOOGLE_PLACES_API_KEY build secret (GitHub Actions and
 * Vercel); it never reaches the browser. Without a key, or if Google fails,
 * this returns null and the site keeps its built-in reviews.
 *
 * Google returns the rating, the review count and up to 5 reviews. Google's
 * terms: show the reviewer's name (linked to their profile) and say the
 * reviews come from Google; don't edit the review text.
 */

export type GoogleReviews = { rating?: string; count?: string; mapsUrl?: string; reviews: Testimonial[] };

type PlaceReview = {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  publishTime?: string;
  relativePublishTimeDescription?: string;
  authorAttribution?: { displayName?: string; uri?: string };
};

export const getGoogleReviews = cache(async (placeId?: string): Promise<GoogleReviews | null> => {
  const key = process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (!key || !placeId) return null;
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`, {
      headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews" },
      cache: "force-cache",
    });
    if (!res.ok) {
      console.warn(`[google-reviews] Places API answered ${res.status}; using the built-in reviews.`);
      return null;
    }
    const place = (await res.json()) as { rating?: number; userRatingCount?: number; googleMapsUri?: string; reviews?: PlaceReview[] };
    const reviews: Testimonial[] = (place.reviews ?? [])
      .filter((r) => (r.originalText?.text ?? r.text?.text)?.trim())
      // Newest first.
      .sort((a, b) => (b.publishTime ?? "").localeCompare(a.publishTime ?? ""))
      .map((r) => ({
        quote: (r.originalText?.text ?? r.text?.text ?? "").trim(),
        name: r.authorAttribution?.displayName ?? "Google reviewer",
        rating: r.rating ?? 5,
        source: "Google",
        date: r.relativePublishTimeDescription,
        authorUrl: r.authorAttribution?.uri,
      }));
    return {
      rating: typeof place.rating === "number" ? place.rating.toFixed(1) : undefined,
      count: typeof place.userRatingCount === "number" ? String(place.userRatingCount) : undefined,
      mapsUrl: place.googleMapsUri,
      reviews,
    };
  } catch (error) {
    console.warn("[google-reviews] fetch failed; using the built-in reviews.", error instanceof Error ? error.message : "");
    return null;
  }
});
