/* Constants for the lead form. public/api/lead.php repeats the options: keep them in sync. */

export const serviceOptions = [
  "Roof replacement",
  "Roof repair",
  "Emergency / leak repair",
  "Storm damage / insurance claim",
  "Free roof inspection",
  "Commercial roofing",
  "Gutters",
  "Siding",
  "Solar installation",
  "Other",
] as const;

export const propertyOptions = ["Home", "Commercial building", "Rental / multifamily"] as const;

/* Solar assessments: which market the home is in, and whether roofing work is needed too. Keep in sync with lead.php. */
export const solarMarkets = ["Maryland", "Washington, DC"] as const;
export const roofingNeedOptions = ["Yes", "No", "Not sure"] as const;
export const SOLAR_SERVICE = "Solar installation";

export const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;

export const ATTRIBUTION_STORAGE_KEY = "pr_attribution";

/** Minimum time a human needs to fill the form. Faster submits are treated as suspect. */
export const MIN_FILL_MS = 2500;
