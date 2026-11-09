// Sanity schema for Pineda's own project (5emjihiz). NOT registered in the main
// site's Studio (that code is out of scope for this task): to enable editing,
// add this to sanity/schemaTypes/index.ts of the main site:
//   import landingPage from "../../ad-landing-pages/sanity/landingPage";  (or copy the file)
// Items with held:true are NOT rendered until a person clears them (see README).
import { defineType, defineField, defineArrayMember } from "sanity";

const item = (name, title, fields) =>
  defineField({ name, title, type: "array", of: [defineArrayMember({ type: "object", fields: [...fields, defineField({ name: "held", type: "boolean", title: "Held (claim not approved; hidden on the page)", initialValue: false })] })] });
const s = (name, title, type = "string") => defineField({ name, title, type });

export default defineType({
  name: "landingPage",
  title: "Ad landing page",
  type: "document",
  fields: [
    defineField({ name: "slug", type: "slug", title: "Slug (folder, e.g. start)", options: { source: "seo.title" }, validation: (r) => r.required() }),
    defineField({ name: "seo", type: "object", fields: [s("title", "Title"), s("description", "Description", "text")] }),
    defineField({ name: "phone", type: "object", fields: [s("display", "Display, e.g. (301) 921-6333"), s("tel", "tel: value, e.g. +13019216333")] }),
    defineField({ name: "hero", type: "object", fields: [s("headline", "Headline"), s("subheadline", "Subheadline"), s("formHint", "Hint next to the form"), item("bullets", "Bullets", [s("text", "Text")])] }),
    defineField({ name: "form", type: "object", fields: [s("title", "Title"), s("serviceLabel", "Service field label"), defineField({ name: "services", type: "array", of: [{ type: "string" }] }), s("consent", "Consent text", "text"), s("submit", "Button"), s("success", "Success message")] }),
    s("stepsTitle", "Steps title"),
    defineField({ name: "steps", type: "array", of: [defineArrayMember({ type: "object", fields: [s("label", "Label"), s("title", "Title"), s("text", "Text", "text"), s("icon", "Icon file in /<slug>/img/")] })] }),
    defineField({ name: "cta", type: "object", fields: [s("call", "Call label"), s("estimate", "Estimate button")] }),
    s("servicesTitle", "Services title"),
    item("services", "Services", [s("title", "Title"), s("text", "Text", "text"), s("image", "Image file in /<slug>/img/")]),
    s("whyTitle", "Why-choose title"),
    item("why", "Why choose us", [s("lead", "Lead"), s("text", "Text", "text")]),
    s("reviewsTitle", "Reviews title"),
    defineField({ name: "reviews", type: "array", of: [defineArrayMember({ type: "object", fields: [s("name", "Name"), s("text", "Text", "text")] })] }),
    s("galleryTitle", "Gallery title"),
    defineField({ name: "gallery", type: "array", of: [{ type: "string" }], title: "Gallery image files" }),
    s("faqTitle", "FAQ title"),
    item("faq", "FAQ", [s("q", "Question"), s("a", "Answer", "text")]),
    s("finalTitle", "Closing title"),
    defineField({ name: "footer", type: "object", fields: [s("legal", "Legal line"), s("privacyUrl", "Privacy URL"), s("termsUrl", "Terms URL")] }),
  ],
  preview: { select: { title: "seo.title", subtitle: "slug.current" } },
});
