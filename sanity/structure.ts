import type { StructureResolver } from "sanity/structure";
import { Award, Building2, CircleHelp, Cog, FileCheck, Home, ImageIcon, Images, Info, Layers, MapPin, MessageSquareQuote, Settings2, Wrench } from "lucide-react";

const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string, icon: React.ComponentType) =>
  S.listItem().title(title).id(type).icon(icon).child(S.document().schemaType(type).documentId(type).title(title));

/** Grouped sidebar: Settings, Pages, Services, Service areas, Gallery, Reviews, FAQs. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Pineda's Roofing")
    .items([
      S.listItem()
        .title("Settings")
        .icon(Settings2)
        .child(S.list().title("Settings").items([singleton(S, "siteSettings", "Site settings", Cog), singleton(S, "partners", "Brands & insurance logos", ImageIcon)])),
      S.listItem()
        .title("Pages")
        .icon(Layers)
        .child(
          S.list()
            .title("Pages")
            .items([
              singleton(S, "homePage", "Home", Home),
              singleton(S, "roofingPage", "Roofing", Building2),
              singleton(S, "atlasPage", "Atlas Roofing", Award),
              singleton(S, "insurancePage", "Insurance claims", FileCheck),
              singleton(S, "aboutPage", "About", Info),
            ]),
        ),
      S.listItem().title("Services").icon(Wrench).child(S.documentTypeList("service").title("Services").defaultOrdering([{ field: "order", direction: "asc" }])),
      S.listItem().title("Service areas").icon(MapPin).child(S.documentTypeList("location").title("Service areas").defaultOrdering([{ field: "order", direction: "asc" }])),
      S.divider(),
      S.listItem().title("Gallery").icon(Images).child(S.documentTypeList("project").title("Gallery projects").defaultOrdering([{ field: "date", direction: "desc" }])),
      S.listItem().title("Reviews").icon(MessageSquareQuote).child(S.documentTypeList("testimonial").title("Reviews")),
      S.listItem().title("FAQs").icon(CircleHelp).child(S.documentTypeList("faq").title("FAQs").defaultOrdering([{ field: "order", direction: "asc" }])),
    ]);
