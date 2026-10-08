/* Zod-free constants shared by the lead form (client) and /api/lead. */

export const serviceOptions = [
  "Roof replacement",
  "Roof repair",
  "Emergency / leak repair",
  "Storm damage / insurance claim",
  "Free roof inspection",
  "Commercial roofing",
  "Gutters",
  "Siding",
  "Other",
] as const;

export const propertyOptions = ["Home", "Commercial building", "Rental / multifamily"] as const;

export const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;

export const ATTRIBUTION_STORAGE_KEY = "pr_attribution";

/** Minimum time a human needs to fill the form. Faster submits are treated as suspect. */
export const MIN_FILL_MS = 2500;
