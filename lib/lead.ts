import { z } from "zod";
import { propertyOptions, serviceOptions } from "@/lib/lead-options";

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

/** Shared by the form (client) and /api/lead (server). */
export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  phone: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 10, "Please enter a phone number with area code."),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  zip: z.string().trim().regex(/^\d{5}(-\d{4})?$/, "Please enter a 5-digit ZIP code."),
  address: optionalText(240),
  property: z.enum(propertyOptions).optional().or(z.literal("")),
  service: z.enum(serviceOptions, { message: "Please choose a service." }),
  message: optionalText(3000),
  consent: z.literal(true, { message: "Please agree so we can contact you." }),
  // anti-spam
  hp_pr: optionalText(200),
  elapsed_ms: z.number().int().nonnegative().optional(),
  // attribution
  page_url: optionalText(1000),
  landing_page: optionalText(1000),
  referrer: optionalText(1000),
  utm_source: optionalText(200),
  utm_medium: optionalText(200),
  utm_campaign: optionalText(200),
  utm_term: optionalText(200),
  utm_content: optionalText(200),
  gclid: optionalText(300),
  fbclid: optionalText(300),
});

export type LeadInput = z.infer<typeof leadSchema>;
