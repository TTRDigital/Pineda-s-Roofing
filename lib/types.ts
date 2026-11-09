import type { IconName } from "./icons";

/* Shared content types. Fallback data in lib/data and Sanity results both map to these. */

export type Img = { src: string; alt: string; width?: number; height?: number };
export type Cta = { label: string; href: string };
export type Heading = { eyebrow?: string; heading: string; text?: string };
export type Card = { icon?: IconName; title: string; text?: string; href?: string };
export type Stat = { value: string; label: string };
export type Fact = { label: string; value: string };
export type Faq = { question: string; answer: string; category?: string };
export type Seo = { title: string; description: string; image?: Img; noIndex?: boolean };
export type PageHero = { eyebrow?: string; heading: string; text?: string; image?: Img };

/** Photo + heading + short paragraphs + highlight boxes. Used on every page. */
export type FeatureBlock = {
  anchor?: string;
  icon?: IconName;
  eyebrow?: string;
  title: string;
  lead?: string;
  paragraphs?: string[];
  highlightsLabel?: string;
  highlights?: string[];
  image?: Img;
  imageSide?: "left" | "right";
  ctas?: Cta[];
};

export type Verse = { text: string; reference: string };

export type Partner = { name: string; logo?: Img; url?: string };

export type SiteSettings = {
  name: string;
  legalName: string;
  phone: string;
  phoneHref: string;
  email: string;
  license: string;
  city: string;
  region: string;
  hours: Fact[];
  emergencyText: string;
  foundedYear: number;
  googleRating?: string;
  reviewCount?: string;
  reviewsUrl?: string;
  /** Google "write a review" link from the Business Profile. */
  writeReviewUrl?: string;
  bbb?: { url: string; rating: string; accreditedSince?: string };
  social: { network: string; href: string }[];
  headerCta: Cta;
  logo?: Img;
  verse?: Verse;
};

export type Partners = {
  brandsHeading: string;
  brandsText: string;
  brands: Partner[];
  insuranceHeading: string;
  insuranceText: string;
  insurers: Partner[];
};

export type ServiceCategory = "residential" | "commercial" | "repair" | "exterior" | "solar";

export type Service = {
  slug: string;
  title: string;
  category: ServiceCategory;
  icon: IconName;
  summary: string;
  order: number;
  hero: PageHero;
  sections: FeatureBlock[];
  faqs: Faq[];
  seo: Seo;
};

export type LocationSection = { heading: string; paragraphs: string[] };

export type Location = {
  slug: string;
  name: string;
  /** "county" pages list their cities; "region" is the state/area overview. */
  kind?: "region" | "county" | "city";
  /** 1 = main focus area, 2 = second tier. */
  tier?: 1 | 2;
  county?: string;
  state: string;
  featured: boolean;
  /** Page H1; defaults to "Roofing Contractor in <name>, <state>". */
  heading?: string;
  lead?: string;
  paragraphs?: string[];
  highlights?: string[];
  neighborhoods?: string[];
  /** Local, page-specific sections. Headings use plain service + place terms ("Roof replacement in Bowie"). */
  sections?: LocationSection[];
  faqs?: Faq[];
  seo?: Seo;
};

export type Project = {
  id: string;
  title: string;
  /** City, e.g. "Bowie". */
  location?: string;
  county?: string;
  /** What was wrong when we arrived. */
  problem?: string;
  /** What we did to fix it. */
  solution?: string;
  category: ServiceCategory;
  summary?: string;
  before?: Img;
  after?: Img;
  images: Img[];
  featured?: boolean;
};

export type Testimonial = { quote: string; name: string; location?: string; rating: number; source?: string };

export type HomeContent = {
  seo: Seo;
  hero: { eyebrow: string; heading: string; text: string; image: Img; badges: string[]; verse?: Verse };
  stats: Stat[];
  servicesIntro: Heading;
  serviceCards: Card[];
  sections: FeatureBlock[];
  faith: FeatureBlock & { verses: Verse[] };
  anatomyIntro: Heading;
  anatomy: Card[];
  whyIntro: Heading;
  why: Card[];
  processIntro: Heading;
  process: Card[];
  faqIntro: Heading;
  faqs: Faq[];
};

export type RoofingContent = { seo: Seo; hero: PageHero; sections: FeatureBlock[]; faqs: Faq[] };

export type AtlasContent = {
  seo: Seo;
  hero: PageHero;
  badge?: Img;
  sections: FeatureBlock[];
  qualitiesIntro: Heading;
  qualities: Card[];
  jobPhotosIntro: Heading;
  jobPhotos: Img[];
  productsIntro: Heading;
  products: { name: string; tagline?: string; text?: string; highlights?: string[]; image?: Img }[];
  warrantyIntro: Heading;
  warranties: Card[];
  faqs: Faq[];
};

export type InsuranceContent = {
  seo: Seo;
  hero: PageHero;
  sections: FeatureBlock[];
  stepsIntro: Heading;
  steps: Card[];
  signsIntro: Heading;
  signs: Card[];
  faqs: Faq[];
};

export type Person = {
  /** Page at /about-us/<slug>. */
  slug: string;
  name: string;
  role: string;
  /** Short intro for the About page card. */
  text?: string;
  /** Full bio paragraphs for the person's own page. */
  bio?: string[];
  image?: Img;
  /** Keeps the page out of Google until the full bio is in. */
  noIndex?: boolean;
};

export type AboutContent = {
  seo: Seo;
  hero: PageHero;
  facts: Fact[];
  sections: FeatureBlock[];
  teamIntro: Heading;
  team: Person[];
  mascot: { eyebrow?: string; heading: string; lead?: string; paragraphs: string[]; image?: Img; verse?: Verse };
  valuesIntro: Heading;
  values: Card[];
};
