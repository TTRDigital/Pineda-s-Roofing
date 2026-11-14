import "server-only";

import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * Fetch published content from Sanity's API CDN.
 *
 * - Cached by tag (the document type). Publishing in Sanity calls the
 *   webhook at /api/revalidate, which refreshes the tags and the pages.
 * - Never throws: returns null on any failure so pages fall back to
 *   lib/content.ts defaults and the site keeps working.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = [],
): Promise<T | null> {
  if (!projectId) return null;

  const search = new URLSearchParams({ query, perspective: "published" });
  for (const [key, value] of Object.entries(params)) {
    search.set(`$${key}`, JSON.stringify(value));
  }
  const url = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?${search}`;

  try {
    const res = await fetch(url, { cache: "force-cache", next: { tags } });
    if (!res.ok) {
      console.warn(`[sanity] ${res.status} for query tags=${tags.join(",")}`);
      return null;
    }
    const json = (await res.json()) as { result?: T };
    return json.result ?? null;
  } catch (error) {
    console.warn("[sanity] fetch failed, using fallbacks", error);
    return null;
  }
}
