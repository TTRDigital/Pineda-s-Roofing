import type { Img } from "@/lib/types";
import { posts } from "@/lib/data/posts";

/** One blog post. Written in lib/data/posts/<slug>.ts and listed in lib/data/posts/index.ts. */
export type PostSection = {
  /** A question, as the page shows it (h2). */
  heading: string;
  /** Short paragraphs, 1 to 3 sentences each. */
  paragraphs: string[];
  /** Optional short checklist, shown as highlight boxes. */
  highlights?: string[];
  highlightsLabel?: string;
  /** Real client photo only. */
  image?: Img;
  caption?: string;
};

export type Post = {
  slug: string;
  title: string;
  /** Meta description. */
  description: string;
  /** Main keyword and city this post targets (for the team; not shown). */
  keyword: string;
  city: string;
  /** 40 to 60 word direct answer, shown at the top. */
  answer: string;
  /** ISO date. Set to the real go-live date when the post is published. */
  datePublished: string;
  dateModified: string;
  author: { name: string; role: string; image: Img };
  hero: Img;
  sections: PostSection[];
  /** The one service page this post supports and links to. */
  service: { slug: string; label: string };
  sources: { label: string; url: string }[];
};

export const getPosts = (): Post[] => [...posts].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
export const getPost = (slug: string): Post | undefined => posts.find((p) => p.slug === slug);

/** Word count of what a reader sees: answer plus all sections. */
export function postWords(p: Post): number {
  const text = [p.answer, ...p.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.highlights ?? [])])].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}
