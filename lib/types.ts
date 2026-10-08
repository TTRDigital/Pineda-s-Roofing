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

export type Partner = { name: string; logo?: Img; url?: string };

export type SiteSettings = {
  name: string;
  legalName: string;
  phone: string;
  phoneHref: string;
  email: string;
  license: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  hours: Fact[];
  emergencyText: string;
  foundedYear: number;
  googleRating?: string;
  reviewCount?: string;
  reviewsUrl?: string;
  mapsUrl: string;
  social: { network: string; href: string }[];
  headerCta: Cta;
  logo?: Img;
};

export type Partners = {
  brandsHeading: string;
  brandsText: string;
  brands: Partner[];
  insuranceHeading: string;
  insuranceText: string;
  insurers: Partner[];
};

export type ServiceCategory = "residential" | "commercial" | "repair" | "exterior";

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

export type Location = {
  slug: string;
  name: string;
  county?: string;
  state: string;
  featured: boolean;
  lead?: string;
  paragraphs?: string[];
  highlights?: string[];
  neighborhoods?: string[];
  seo?: Seo;
};

export type Project = {
  id: string;
  title: string;
  location?: string;
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
  hero: { eyebrow: string; heading: string; text: string; image: Img; badges: string[] };
  stats: Stat[];
  servicesIntro: Heading;
  serviceCards: Card[];
  sections: FeatureBlock[];
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

export type AboutContent = {
  seo: Seo;
  hero: PageHero;
  facts: Fact[];
  sections: FeatureBlock[];
  valuesIntro: Heading;
  values: Card[];
};
