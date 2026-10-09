import { defineArrayMember, defineField, defineType } from "sanity";

const seoField = defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" });
const groups = [
  { name: "content", title: "Content", default: true },
  { name: "seo", title: "SEO" },
];
const sections = (description = "Each section: photo, heading, short paragraphs and highlight boxes.") =>
  defineField({ name: "sections", title: "Sections", type: "array", of: [defineArrayMember({ type: "featureSection" })], description, group: "content" });
const faqs = defineField({ name: "faqs", title: "FAQs", type: "array", of: [defineArrayMember({ type: "faqItem" })], group: "content" });
const hero = defineField({ name: "hero", title: "Page header", type: "pageHero", group: "content" });
const heading = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    group: "content",
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({ name: "eyebrow", title: "Small label", type: "string" }),
      defineField({ name: "heading", type: "string" }),
      defineField({ name: "text", title: "Intro", type: "text", rows: 2 }),
    ],
  });

/* ---------- Singletons ---------- */

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Business name", type: "string", initialValue: "Pineda's Roofing" }),
    defineField({ name: "legalName", title: "Legal name", type: "string", initialValue: "Pineda's Construction LLC" }),
    defineField({ name: "phone", type: "string", description: "As shown, e.g. (301) 921-6333" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "license", title: "License", type: "string", description: "e.g. MHIC# 142024" }),
    defineField({ name: "city", type: "string", description: "City only. The street address is never shown on the site." }),
    defineField({ name: "region", title: "State", type: "string" }),
    defineField({
      name: "hours",
      type: "array",
      of: [defineArrayMember({ type: "fact" })],
      description: "Label = day(s), Value = hours. e.g. Monday to Friday / 8:00 AM to 6:00 PM",
    }),
    defineField({ name: "emergencyText", title: "Emergency line text", type: "string", initialValue: "24/7 Emergency Roof Repair" }),
    defineField({ name: "foundedYear", title: "Year founded", type: "number" }),
    defineField({ name: "googleRating", title: "Google rating", type: "string", description: "e.g. 4.9. Leave empty to hide." }),
    defineField({ name: "reviewCount", title: "Google review count", type: "string" }),
    defineField({ name: "reviewsUrl", title: "Google reviews link", type: "url" }),
    defineField({
      name: "social",
      type: "array",
      of: [
        defineArrayMember({
          name: "socialLink",
          type: "object",
          fields: [
            defineField({ name: "network", type: "string", options: { list: ["facebook", "instagram", "youtube", "tiktok", "linkedin", "google", "yelp", "nextdoor"] } }),
            defineField({ name: "href", title: "Link", type: "url" }),
          ],
          preview: { select: { title: "network", subtitle: "href" } },
        }),
      ],
    }),
    defineField({ name: "headerCta", title: "Header button", type: "cta" }),
    defineField({
      name: "verse",
      title: "Footer Bible verse",
      type: "object",
      fields: [
        defineField({ name: "text", type: "text", rows: 2 }),
        defineField({ name: "reference", type: "string", description: "e.g. Ephesians 6:7" }),
      ],
    }),
    defineField({ name: "logo", type: "image", description: "Leave empty to use the built-in logo." }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

export const partners = defineType({
  name: "partners",
  title: "Brands & insurance logos",
  type: "document",
  fields: [
    defineField({ name: "brandsHeading", title: "Brands heading", type: "string", initialValue: "Brands we install" }),
    defineField({ name: "brandsText", title: "Brands intro", type: "text", rows: 2 }),
    defineField({ name: "brands", title: "Brands we use", type: "array", of: [defineArrayMember({ type: "partner" })] }),
    defineField({ name: "insuranceHeading", title: "Insurance heading", type: "string", initialValue: "We work with all major insurance companies" }),
    defineField({ name: "insuranceText", title: "Insurance intro", type: "text", rows: 2 }),
    defineField({ name: "insurers", title: "Insurance companies", type: "array", of: [defineArrayMember({ type: "partner" })] }),
  ],
  preview: { prepare: () => ({ title: "Brands & insurance logos" }) },
});

export const homePage = defineType({
  name: "homePage",
  title: "Home",
  type: "document",
  groups,
  fields: [
    defineField({
      name: "hero",
      type: "object",
      group: "content",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "text", type: "text", rows: 3 }),
        defineField({ name: "image", type: "altImage" }),
        defineField({ name: "badges", title: "Trust badges", type: "array", of: [defineArrayMember({ type: "string" })] }),
        defineField({
        name: "verse",
        title: "Hero Bible verse",
        type: "object",
        fields: [
          defineField({ name: "text", type: "text", rows: 2 }),
          defineField({ name: "reference", type: "string", description: "e.g. Ephesians 6:7" }),
        ],
    }),
      ],
    }),
    defineField({ name: "stats", type: "array", of: [defineArrayMember({ type: "stat" })], group: "content" }),
    heading("servicesIntro", "Services heading"),
    defineField({ name: "serviceCards", title: "Service cards", type: "array", of: [defineArrayMember({ type: "card" })], group: "content" }),
    sections("Residential, commercial and other highlighted sections."),
    defineField({
      name: "faith",
      title: "Faith section",
      type: "object",
      group: "content",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "icon", type: "icon" }),
        defineField({ name: "eyebrow", title: "Small label", type: "string" }),
        defineField({ name: "title", title: "Heading", type: "string" }),
        defineField({ name: "lead", title: "Lead sentence", type: "text", rows: 2 }),
        defineField({ name: "paragraphs", title: "Short paragraphs", type: "array", of: [defineArrayMember({ type: "text", rows: 3 })] }),
        defineField({ name: "highlightsLabel", title: "Label above the boxes", type: "string" }),
        defineField({ name: "highlights", title: "Highlight boxes", type: "array", of: [defineArrayMember({ type: "string" })] }),
        defineField({
          name: "verses",
          title: "Bible verses",
          description: "The first verse is shown large.",
          type: "array",
          of: [
            defineArrayMember({
              name: "verseItem",
              type: "object",
              fields: [defineField({ name: "text", type: "text", rows: 2 }), defineField({ name: "reference", type: "string" })],
              preview: { select: { title: "reference", subtitle: "text" } },
            }),
          ],
        }),
      ],
    }),
    heading("anatomyIntro", "Roof system diagram heading"),
    defineField({ name: "anatomy", title: "Roof system layers", type: "array", of: [defineArrayMember({ type: "card" })], group: "content", description: "Shown as labels around the roof diagram, top to bottom." }),
    heading("whyIntro", "Why choose us heading"),
    defineField({ name: "why", title: "Why choose us", type: "array", of: [defineArrayMember({ type: "card" })], group: "content" }),
    heading("processIntro", "Process heading"),
    defineField({ name: "process", title: "Process steps", type: "array", of: [defineArrayMember({ type: "card" })], group: "content" }),
    heading("faqIntro", "FAQ heading"),
    defineField({ name: "faqs", title: "FAQs", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "faq" }] })], group: "content", description: "Leave empty to show the first FAQs marked for the home page." }),
    seoField,
  ],
  preview: { prepare: () => ({ title: "Home" }) },
});

export const roofingPage = defineType({
  name: "roofingPage",
  title: "Roofing",
  type: "document",
  groups,
  fields: [hero, sections("Residential roofing, commercial roofing, repairs, emergency service..."), faqs, seoField],
  preview: { prepare: () => ({ title: "Roofing" }) },
});

export const atlasPage = defineType({
  name: "atlasPage",
  title: "Atlas Roofing",
  type: "document",
  groups,
  fields: [
    hero,
    defineField({ name: "badge", title: "Atlas badge / certificate", type: "altImage", group: "content" }),
    sections(),
    heading("productsIntro", "Shingle lines heading"),
    defineField({
      name: "products",
      title: "Shingle lines",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          name: "atlasProduct",
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "tagline", type: "string" }),
            defineField({ name: "text", type: "text", rows: 3 }),
            defineField({ name: "highlights", type: "array", of: [defineArrayMember({ type: "string" })] }),
            defineField({ name: "image", type: "altImage" }),
          ],
          preview: { select: { title: "name", subtitle: "tagline", media: "image" } },
        }),
      ],
    }),
    heading("warrantyIntro", "Warranty heading"),
    defineField({ name: "warranties", title: "Warranty cards", type: "array", of: [defineArrayMember({ type: "card" })], group: "content" }),
    faqs,
    seoField,
  ],
  preview: { prepare: () => ({ title: "Atlas Roofing" }) },
});

export const insurancePage = defineType({
  name: "insurancePage",
  title: "Insurance claims",
  type: "document",
  groups,
  fields: [
    hero,
    sections(),
    heading("stepsIntro", "Claim steps heading"),
    defineField({ name: "steps", title: "Claim steps", type: "array", of: [defineArrayMember({ type: "card" })], group: "content" }),
    heading("signsIntro", "Storm damage signs heading"),
    defineField({ name: "signs", title: "Signs of storm damage", type: "array", of: [defineArrayMember({ type: "card" })], group: "content" }),
    faqs,
    seoField,
  ],
  preview: { prepare: () => ({ title: "Insurance claims" }) },
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About",
  type: "document",
  groups,
  fields: [
    hero,
    defineField({ name: "facts", title: "Company facts", type: "array", of: [defineArrayMember({ type: "fact" })], group: "content", description: "Owner, headquarters, license..." }),
    sections(),
    heading("valuesIntro", "Values heading"),
    defineField({ name: "values", type: "array", of: [defineArrayMember({ type: "card" })], group: "content" }),
    seoField,
  ],
  preview: { prepare: () => ({ title: "About" }) },
});

/* ---------- Collections ---------- */

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  groups,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required(), group: "content" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required(), group: "content", description: "The page lives at /services/<slug>." }),
    defineField({
      name: "category",
      type: "string",
      options: { list: [{ title: "Residential", value: "residential" }, { title: "Commercial", value: "commercial" }, { title: "Repairs & storm", value: "repair" }, { title: "Exterior", value: "exterior" }], layout: "radio" },
      group: "content",
    }),
    defineField({ name: "icon", type: "icon", group: "content" }),
    defineField({ name: "summary", title: "Card summary", type: "text", rows: 2, group: "content", validation: (r) => r.max(160).warning("Keep it to one sentence.") }),
    defineField({ name: "order", type: "number", group: "content" }),
    hero,
    sections(),
    faqs,
    seoField,
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "category" } },
});

export const location = defineType({
  name: "location",
  title: "Service area",
  type: "document",
  groups,
  fields: [
    defineField({ name: "name", title: "City / area", type: "string", validation: (r) => r.required(), group: "content" }),
    defineField({ name: "slug", type: "slug", options: { source: "name" }, validation: (r) => r.required(), group: "content", description: "The page lives at /service-areas/<slug>." }),
    defineField({ name: "county", type: "string", group: "content" }),
    defineField({ name: "state", type: "string", initialValue: "MD", group: "content" }),
    defineField({ name: "featured", title: "Show as a full page", type: "boolean", initialValue: true, group: "content", description: "Off = listed by name only." }),
    defineField({ name: "lead", type: "text", rows: 2, group: "content" }),
    defineField({ name: "paragraphs", title: "Short paragraphs", type: "array", of: [defineArrayMember({ type: "text", rows: 3 })], group: "content" }),
    defineField({ name: "highlights", title: "Highlight boxes", type: "array", of: [defineArrayMember({ type: "string" })], group: "content" }),
    defineField({ name: "neighborhoods", type: "array", of: [defineArrayMember({ type: "string" })], group: "content" }),
    defineField({ name: "order", type: "number", group: "content" }),
    seoField,
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "county" } },
});

export const project = defineType({
  name: "project",
  title: "Gallery project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", title: "City", type: "string" }),
    defineField({ name: "category", type: "string", options: { list: [{ title: "Residential", value: "residential" }, { title: "Commercial", value: "commercial" }, { title: "Repair", value: "repair" }, { title: "Exterior", value: "exterior" }], layout: "radio" } }),
    defineField({ name: "summary", type: "text", rows: 2 }),
    defineField({ name: "before", title: "Before photo", type: "altImage" }),
    defineField({ name: "after", title: "After photo", type: "altImage" }),
    defineField({ name: "images", title: "More photos", type: "array", of: [defineArrayMember({ type: "altImage" })] }),
    defineField({ name: "featured", title: "Show on home page", type: "boolean", initialValue: false }),
    defineField({ name: "date", type: "date" }),
  ],
  orderings: [{ title: "Newest", name: "date", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "location", media: "after" } },
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Review",
  type: "document",
  fields: [
    defineField({ name: "quote", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", title: "City", type: "string" }),
    defineField({ name: "rating", type: "number", initialValue: 5, validation: (r) => r.min(1).max(5) }),
    defineField({ name: "source", type: "string", options: { list: ["Google", "Facebook", "Yelp", "Angi", "Other"] }, initialValue: "Google" }),
  ],
  preview: { select: { title: "name", subtitle: "quote" } },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "text", rows: 5, validation: (r) => r.required() }),
    defineField({ name: "category", type: "string", options: { list: ["General", "Roof replacement", "Repairs", "Insurance", "Commercial", "Cost & financing"] }, initialValue: "General" }),
    defineField({ name: "onHome", title: "Show on home page", type: "boolean", initialValue: false }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "question", subtitle: "category" } },
});

export const singletonTypes = new Set(["siteSettings", "partners", "homePage", "roofingPage", "atlasPage", "insurancePage", "aboutPage"]);

export const documentTypes = [siteSettings, partners, homePage, roofingPage, atlasPage, insurancePage, aboutPage, service, location, project, testimonial, faq];
