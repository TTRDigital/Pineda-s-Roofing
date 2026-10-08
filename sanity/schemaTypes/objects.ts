import { defineArrayMember, defineField, defineType } from "sanity";
import { iconOptions } from "../../lib/icons";

/** SEO fields on every page. Lengths are warnings, not hard errors. */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "title", title: "SEO title", type: "string", description: "Shown in Google. Aim for under 60 characters.", validation: (r) => r.max(60).warning("Over 60 characters may be cut off in Google.") }),
    defineField({ name: "description", title: "Meta description", type: "text", rows: 3, description: "Aim for under 155 characters.", validation: (r) => r.max(155).warning("Over 155 characters may be cut off in Google.") }),
    defineField({ name: "ogImage", title: "Social share image", type: "image", description: "1200 x 630. Leave empty to use the page's main photo." }),
    defineField({ name: "noIndex", title: "Hide from search engines", type: "boolean", initialValue: false }),
  ],
});

/** Image that always has alt text. */
export const altImage = defineType({
  name: "altImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe the photo for people who cannot see it, e.g. \"New black shingle roof on a brick colonial in Silver Spring\".",
      validation: (r) =>
        r.custom((alt, ctx) => {
          const parent = ctx.parent as { asset?: unknown } | undefined;
          return parent?.asset && !alt ? "Alt text is required for accessibility." : true;
        }),
    }),
  ],
});

export const icon = defineType({
  name: "icon",
  title: "Icon",
  type: "string",
  options: { list: [...iconOptions] },
});

export const cta = defineType({
  name: "cta",
  title: "Button",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "Link", type: "string", description: "A page on this site like /contact, or a full URL. tel:+13019216333 calls.", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

const shortParagraphs = defineField({
  name: "paragraphs",
  title: "Short paragraphs",
  type: "array",
  of: [defineArrayMember({ type: "text", rows: 3 })],
  description: "Keep each paragraph to 1 to 3 sentences. Two or three paragraphs is plenty.",
  validation: (r) => r.max(4).warning("More than 4 paragraphs reads as a wall of text. Move details into highlight boxes."),
});

const highlights = defineField({
  name: "highlights",
  title: "Highlight boxes",
  type: "array",
  of: [defineArrayMember({ type: "string" })],
  description: "Short phrases shown in boxes with a check mark, e.g. \"Licensed and fully insured crews\". 4 or 6 looks best.",
  validation: (r) => r.max(8),
});

/**
 * The building block of every page: icon, heading, short lead, short
 * paragraphs and highlight boxes, next to a photo. No long paragraphs and
 * no bullet lists by design.
 */
export const featureSection = defineType({
  name: "featureSection",
  title: "Feature section",
  type: "object",
  fields: [
    defineField({ name: "anchor", title: "Anchor ID", type: "slug", description: "Optional. Lets other pages link straight to this section, e.g. /roofing#commercial." }),
    defineField({ name: "icon", type: "icon" }),
    defineField({ name: "eyebrow", title: "Small label above the heading", type: "string" }),
    defineField({ name: "title", title: "Heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "lead", title: "Lead sentence", type: "text", rows: 2, description: "One or two sentences, shown larger.", validation: (r) => r.max(240).warning("Keep the lead short.") }),
    shortParagraphs,
    defineField({ name: "highlightsLabel", title: "Label above the boxes", type: "string", initialValue: "What we offer" }),
    highlights,
    defineField({ name: "image", type: "altImage" }),
    defineField({ name: "imageSide", title: "Photo side", type: "string", options: { list: ["left", "right"], layout: "radio" }, initialValue: "left" }),
    defineField({ name: "ctas", title: "Buttons", type: "array", of: [defineArrayMember({ type: "cta" })], validation: (r) => r.max(2) }),
  ],
  preview: { select: { title: "title", subtitle: "eyebrow", media: "image" } },
});

export const card = defineType({
  name: "card",
  title: "Card",
  type: "object",
  fields: [
    defineField({ name: "icon", type: "icon" }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", type: "text", rows: 3, validation: (r) => r.max(220).warning("Keep cards short.") }),
    defineField({ name: "href", title: "Link (optional)", type: "string" }),
  ],
  preview: { select: { title: "title", subtitle: "text" } },
});

export const stat = defineType({
  name: "stat",
  title: "Stat",
  type: "object",
  description: "Real numbers only.",
  fields: [
    defineField({ name: "value", title: "Value as shown", type: "string", description: "For example 30+ or 100%.", validation: (r) => r.required() }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});

export const faqItem = defineType({
  name: "faqItem",
  title: "Question",
  type: "object",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "text", rows: 4, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "question", subtitle: "answer" } },
});

export const fact = defineType({
  name: "fact",
  title: "Fact",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "value", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});

export const partner = defineType({
  name: "partner",
  title: "Logo",
  type: "object",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "logo", type: "image", description: "Transparent PNG or SVG works best. Without a logo the name is shown as text." }),
    defineField({ name: "url", title: "Website (optional)", type: "url" }),
  ],
  preview: { select: { title: "name", media: "logo" } },
});

export const pageHero = defineType({
  name: "pageHero",
  title: "Page header",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Small label", type: "string" }),
    defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", title: "Intro", type: "text", rows: 3, validation: (r) => r.max(260).warning("Keep the intro short.") }),
    defineField({ name: "image", title: "Background photo", type: "altImage" }),
  ],
});

export const objectTypes = [seo, altImage, icon, cta, featureSection, card, stat, faqItem, fact, partner, pageHero];
