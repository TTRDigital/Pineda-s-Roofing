import type { Faq, Partners, Project, SiteSettings, Testimonial } from "../types";
import { images } from "./images.ts";

/* Site-wide fallback content. Sanity values replace these field by field. */

export const fallbackSettings: SiteSettings = {
  name: "Pineda's Roofing",
  legalName: "Pineda's Construction LLC",
  phone: "(301) 921-6333",
  phoneHref: "tel:+13019216333",
  email: "info@pinedasroofing.com",
  license: "MHIC# 142024",
  city: "Silver Spring",
  region: "MD",
  hours: [
    { label: "Monday to Friday", value: "8:00 AM to 6:00 PM" },
    { label: "Saturday", value: "9:00 AM to 4:00 PM" },
    { label: "Sunday", value: "Closed" },
    { label: "Emergencies", value: "24/7" },
  ],
  emergencyText: "24/7 Emergency Roof Repair",
  foundedYear: 1992,
  googleRating: "5.0",
  reviewCount: "22",
  reviewsUrl: "https://g.co/kgs/FDvaBcB",
  social: [
    { network: "facebook", href: "https://www.facebook.com/pinedasroofing" },
    { network: "instagram", href: "https://www.instagram.com/pinedasroofing/" },
    { network: "google", href: "https://g.co/kgs/WMp9yQk" },
  ],
  headerCta: { label: "Free Estimate", href: "/contact-us" },
  verse: { text: "Serve wholeheartedly, as if you were serving the Lord, not people.", reference: "Ephesians 6:7" },
};

/* Logos live in /public/images/logos. A brand without a file shows its name as text. */
export const fallbackPartners: Partners = {
  brandsHeading: "Brands we install",
  brandsText: "Proven manufacturers on every job: shingles, membranes, metal, ventilation and the tools that fasten it all down.",
  brands: [
    { name: "Atlas" },
    { name: "Mule-Hide" },
    { name: "Polyglass" },
    { name: "Firestone" },
    { name: "Englert" },
    { name: "PAC-CLAD" },
    { name: "Lomanco" },
    { name: "Stinger" },
    { name: "Paslode" },
  ],
  insuranceHeading: "We work with all insurance companies",
  insuranceText: "We meet your adjuster, document the damage with photos and handle the paperwork, whoever your carrier is.",
  insurers: [{ name: "State Farm" }, { name: "Allstate" }, { name: "USAA" }, { name: "Progressive" }, { name: "Farmers Insurance" }],
};

export const fallbackTestimonials: Testimonial[] = [
  {
    quote:
      "We are so please with Pineda's! They walked us through the entire process and worked hand and hand with my insurance company to make the process go quickly and smoothly…",
    name: "Joseph Besler",
    rating: 5,
    source: "Google",
  },
  {
    quote:
      "I want to thoroughly recommend Pineda's Roofing. My experience with them was exceptional. I had a few roof shingles blown off in a storm, as did one of my neighbors. I asked my neighbor who she got to do her repair job and she, thankfully, gave me the name and number for Pineda's Roofing…",
    name: "R David Marcus",
    rating: 5,
    source: "Google",
  },
  { quote: "Fair prices, quick response time, professional job. Highly recommend!", name: "Alex Shushan", rating: 5, source: "Google" },
  {
    quote:
      "I called upon Pineda's Roofing for siding work and everything went extremely well. I was impressed with the customer service/communication, professionalism, and quality of work. I highly recommend them for your siding work (in addition to roofing work).",
    name: "V. Nguyen",
    rating: 5,
    source: "Google",
  },
];

export const fallbackFaqs: Faq[] = [
  {
    category: "General",
    question: "What roofing services do you offer?",
    answer:
      "Roof replacement, roof repair, emergency repairs, storm restoration, maintenance and inspections for homes and commercial buildings. We also handle gutters, siding, windows, chimneys, masonry and hardscaping.",
  },
  {
    category: "Roof replacement",
    question: "Do I need a new roof or just a repair?",
    answer:
      "It depends on the roof's age, how widespread the damage is and whether the deck underneath is still sound. We inspect, photograph what we find and give you an honest answer. If a repair will safely extend the roof's life, that is what we recommend.",
  },
  {
    category: "Roof replacement",
    question: "Why Atlas Pinnacle Pristine shingles?",
    answer:
      "They are built for Maryland weather. Scotchgard Protector from 3M fights the black algae streaks you see on older roofs, and the shingles are made to hold up to high winds and heavy storms.",
  },
  {
    category: "Roof replacement",
    question: "How long will the work take?",
    answer:
      "Most residential replacements take two to three days. Repairs are usually a single visit. You get a specific timeline with your quote, and we tell you right away if anything changes.",
  },
  { category: "General", question: "What warranty do I get?", answer: "A 10 year labor warranty from Pineda's on the installation, plus the lifetime manufacturer warranty on the shingles. You get both in writing." },
  { category: "General", question: "Are you licensed and insured?", answer: "Yes. Fully licensed, insured and bonded in Maryland, MHIC# 142024." },
  {
    category: "Cost & financing",
    question: "How do I get a quote?",
    answer: "Call (301) 921-6333 or send the form. Inspections and estimates are free, with a written scope and price and no obligation.",
  },
  {
    category: "Insurance",
    question: "Will my insurance cover a new roof?",
    answer:
      "Storm damage is often covered; age and general wear usually are not. We document the damage and work directly with your carrier so the claim reflects what is actually on the roof. Many customers pay only their deductible.",
  },
  {
    category: "Insurance",
    question: "What should I do if I think my roof has storm damage?",
    answer:
      "Look from the ground for missing shingles, dents in gutters or debris, but stay off the roof. Then call us for a free damage assessment. We will tell you whether the damage is worth a claim before you file.",
  },
  {
    category: "Insurance",
    question: "What if my insurance claim is denied?",
    answer:
      "We review the adjuster's report with you and advise on next steps. Claims are sometimes denied for missing documentation, which can often be fixed with more evidence.",
  },
  {
    category: "Repairs",
    question: "Do you offer emergency roof repair?",
    answer:
      "Yes, 24/7. We tarp and secure the opening to stop water getting in, then come back for the permanent repair once conditions allow.",
  },
  {
    category: "Commercial",
    question: "Do you work on commercial roofs?",
    answer:
      "Yes. We install and repair flat and low-slope systems such as TPO, EPDM and modified bitumen, and we schedule the work around your business hours to keep disruption low.",
  },
  {
    category: "General",
    question: "What areas do you serve?",
    answer:
      "Maryland and the DMV: Montgomery, Prince George's, Howard, Frederick, Anne Arundel and Baltimore counties, Baltimore City, Washington D.C. and Northern Virginia.",
  },
];

/* Gallery projects from real job photos. Add before and after pairs in /cms as the client sends them. */
export const fallbackProjects: Project[] = [
  { id: "aerial-shingle", title: "Roof replacement in progress", category: "residential", summary: "Synthetic underlayment going down before the new shingles.", images: [images.aerialNewShingleRoof], featured: true },
  { id: "two-story", title: "New shingle roof on a two-story home", category: "residential", images: [images.homeNewRoofAerial], featured: true },
  { id: "chimney", title: "Chimney step flashing", category: "repair", summary: "New step and counter flashing to stop a chimney leak.", images: [images.chimneyFlashing, images.chimneyFlashing2], featured: true },
  { id: "storm", title: "Storm damage: tree on roof", category: "repair", summary: "Emergency tarp, then a permanent repair.", images: [images.treeOnRoof, images.fallenTreeHouse], featured: true },
  { id: "ridge", title: "Shingle installation", category: "residential", images: [images.rooferOnRidge], featured: true },
  { id: "underlayment", title: "Synthetic underlayment going down", category: "residential", images: [images.underlaymentInstall, images.completedRoofAerial], featured: true },
  { id: "flat", title: "Flat roof membrane", category: "commercial", images: [images.flatRoofMembrane, images.flatRoofSkylight] },
  { id: "low-slope", title: "Low-slope commercial roof", category: "commercial", images: [images.commercialMetalRoof] },
  { id: "hail", title: "Hail damage inspection", category: "repair", summary: "Hail hits marked and photographed for the insurance claim.", images: [images.hailDamage] },
  { id: "repair-patch", title: "Shingle repair", category: "repair", images: [images.shingleRepairPatch, images.roofRepairCrew] },
  { id: "vents", title: "Flashing around roof vents", category: "residential", images: [images.roofReplacementColonial] },
  { id: "metal", title: "Metal roof panels", category: "residential", images: [images.homeNewRoofAerial2] },
  { id: "gutters", title: "Gutters and gutter guards", category: "exterior", images: [images.gutterGuard, images.gutterDownspout] },
];
