import type { AboutContent, AtlasContent, HomeContent, InsuranceContent, RoofingContent } from "../types";
import { images } from "./images.ts";

/*
 * Fallback page content. Written the way the client asked: short
 * paragraphs plus highlight boxes, never long paragraphs or bullet lists.
 */

const estimate = { label: "Get a free estimate", href: "/contact-us" };

export const fallbackHome: HomeContent = {
  seo: {
    title: "Pineda's Roofing | Maryland Roofing Contractor Since 1992",
    description:
      "Family-owned roofing contractor in Silver Spring, MD. Roof replacement, repair, storm restoration and commercial roofing. Free inspections. MHIC# 142024.",
  },
  hero: {
    eyebrow: "Silver Spring · Maryland & the DMV",
    heading: "Maryland's family-owned roofing contractor",
    text: "Residential and commercial roofing, repairs and storm restoration. One family, our own crews, a 10 year labor warranty and a lifetime manufacturer warranty.",
    image: images.aerialNewShingleRoof,
    badges: ["Family owned since 1992", "Licensed, insured & bonded", "MHIC# 142024", "24/7 emergency service"],
    verse: { text: "Unless the Lord builds the house, the builders labor in vain.", reference: "Psalm 127:1" },
  },
  stats: [
    { value: "30+", label: "Years in business" },
    { value: "10 Year", label: "Labor warranty" },
    { value: "Lifetime", label: "Manufacturer warranty" },
    { value: "24/7", label: "Emergency service" },
  ],
  servicesIntro: {
    eyebrow: "What we do",
    heading: "The exterior, handled",
    text: "Every roof we install uses Atlas Pinnacle Pristine shingles and comes with a 10 year labor warranty and a lifetime manufacturer warranty.",
  },
  serviceCards: [
    { icon: "house", title: "Residential roofing", text: "New roofs, replacements and repairs for Maryland homes.", href: "/services/residential-roofing" },
    { icon: "building", title: "Commercial roofing", text: "Flat and low-slope systems, scheduled around your business.", href: "/services/commercial-roofing" },
    { icon: "wrench", title: "Roof repair", text: "Leaks, missing shingles and flashing, usually fixed in one visit.", href: "/services/roof-repair" },
    { icon: "storm", title: "Storm restoration", text: "Hail, wind and fallen trees, with your insurance claim handled.", href: "/services/storm-restoration" },
    { icon: "siren", title: "Emergency repair", text: "24/7 response to tarp, secure and stop the water.", href: "/services/emergency-roof-repair" },
    { icon: "rain", title: "Gutters & siding", text: "Gutters, guards, siding, windows, chimneys and masonry.", href: "/services" },
  ],
  sections: [
    {
      anchor: "who-we-are",
      icon: "users",
      eyebrow: "Who we are",
      title: "A roofer that takes your roof seriously",
      lead: "We don't just fix roofs. We protect property, preserve legacies and deliver peace of mind.",
      paragraphs: [
        "German Pineda started the company over three decades ago. Today Freddy and Roberto Pineda run it with the same standards and the same phone number.",
        "The person who inspects your roof, the crew who installs it and the owner who stands behind the warranty are one family business.",
      ],
      highlightsLabel: "The Pineda's difference",
      highlights: ["Family owned since 1992", "Our own crews, never subcontractors", "Free inspections with photo reports", "10 year labor warranty"],
      image: images.crew,
      ctas: [{ label: "More about Pineda's", href: "/about-us" }],
    },
  ],
  faith: {
    anchor: "faith",
    icon: "cross",
    eyebrow: "Our foundation",
    title: "Built on faith, family and honest work",
    lead: "Pineda's is a family business built on faith. It shapes how we treat your home, your time and your budget.",
    paragraphs: [
      "Our company verse, Ephesians 6:7, asks us to serve wholeheartedly, as if serving the Lord, not people. To us that means doing the job right, even in the places no one will ever look.",
      "Faith keeps us honest. You get straight answers, fair prices and the same care we would give our own family's home.",
    ],
    highlightsLabel: "What that means on your roof",
    highlights: ["Honest advice, even when a repair will do", "Fair, written pricing with no pressure", "Work done right where no one will look", "Your home treated like our own family's"],
    verses: [
      { text: "Serve wholeheartedly, as if you were serving the Lord, not people.", reference: "Ephesians 6:7" },
      { text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.", reference: "Colossians 3:23" },
      { text: "Unless the Lord builds the house, the builders labor in vain.", reference: "Psalm 127:1" },
    ],
  },
  anatomyIntro: {
    eyebrow: "Modern roofing systems",
    heading: "What's under your shingles",
    text: "A roof is a system, not just shingles. Every layer has a job, and we install every layer the right way.",
  },
  anatomy: [
    { title: "Ridge vent", text: "Lets hot, moist attic air escape to protect the deck and shingles." },
    { title: "Architectural shingles", text: "Atlas Pinnacle Pristine with 3M Scotchgard Protector against algae streaks." },
    { title: "Synthetic underlayment", text: "Outperforms felt in tear strength and water shedding." },
    { title: "Ice & water shield", text: "Self-adhering membrane along eaves and valleys to stop ice dam leaks." },
    { title: "Plywood decking", text: "Solid deck checked and replaced where soft or rotted." },
    { title: "Rafters & trusses", text: "The frame we inspect for sagging before anything goes on top." },
  ],
  whyIntro: { eyebrow: "Why Pineda's", heading: "Why Maryland homeowners choose us" },
  why: [
    { icon: "users", title: "Family owned for 30+ years", text: "Same family, same standards and the same phone number when you need us." },
    { icon: "award", title: "Premium materials as standard", text: "Atlas Pinnacle Pristine shingles on every installation, not an upsell." },
    { icon: "shield-check", title: "10 year labor warranty", text: "Our workmanship is covered for 10 years, plus a lifetime manufacturer warranty on the shingles." },
    { icon: "file-check", title: "Insurance expertise", text: "We meet your adjuster and provide the documentation carriers need." },
    { icon: "badge-check", title: "Licensed, insured & bonded", text: "MHIC# 142024. Fully covered on every job we take." },
    { icon: "clipboard", title: "Free, no-obligation estimates", text: "Written scope and transparent pricing before you commit." },
  ],
  processIntro: {
    eyebrow: "How it works",
    heading: "Four steps from damage to done",
    text: "From the first inspection to the final walkthrough, one family-owned crew handles every step, including the insurance paperwork.",
  },
  process: [
    { title: "Free inspection", text: "We inspect the full roof, photograph what we find and tell you honestly: repair or replace." },
    { title: "Insurance claim", text: "We document damage the way adjusters need it and work directly with your carrier." },
    { title: "Material selection", text: "We walk you through Atlas Pinnacle Pristine colors and the right system for your home." },
    { title: "Installation", text: "Done on schedule, site cleaned, magnet sweep for nails and a walkthrough together." },
  ],
  faqIntro: { eyebrow: "Common questions", heading: "Straight answers", text: "Can't find yours? Call (301) 921-6333 and talk to a person." },
  faqs: [],
};

export const fallbackRoofing: RoofingContent = {
  seo: {
    title: "Roofing Services in Maryland | Pineda's Roofing",
    description:
      "Residential and commercial roofing in Maryland: shingle roofs, flat and low-slope systems, repairs and storm restoration. Family owned since 1992.",
  },
  hero: {
    eyebrow: "Roofing",
    heading: "Residential and commercial roofing",
    text: "For more than 30 years, Maryland homeowners and business owners have called Pineda's when the roof over their head needs attention.",
    image: images.rooferOnRidge,
  },
  sections: [
    {
      anchor: "residential",
      icon: "house",
      eyebrow: "For homeowners",
      title: "Residential roofing",
      lead: "Your home deserves a roof that protects it and makes it look its best. We install, replace and repair roofs on Maryland homes of every style.",
      paragraphs: [
        "Every new roof gets Atlas Pinnacle Pristine shingles with 3M Scotchgard Protector, which fights the dark algae streaks common in our humid summers.",
        "Most replacements are finished in two to three days, with a full cleanup and magnet sweep before we leave.",
      ],
      highlightsLabel: "What we offer",
      highlights: [
        "Full roof replacements",
        "Shingle and flat roof repairs",
        "Atlas Pinnacle Pristine shingles",
        "Ventilation and attic airflow fixes",
        "Gutters and gutter guards",
        "10 year labor warranty",
      ],
      image: images.homeNewRoofAerial,
      ctas: [
        { label: "Explore residential roofing", href: "/services/residential-roofing" },
        { label: "Request a quote", href: "/contact-us" },
      ],
    },
    {
      anchor: "commercial",
      icon: "building",
      eyebrow: "For businesses",
      title: "Commercial roofing",
      lead: "Every commercial building has its own challenges. Our commercial roofing is built around your schedule, your tenants and your budget.",
      paragraphs: [
        "We install and service flat and low-slope systems with drainage designed in and seams done right, the two places cheap flat roofs fail first.",
        "We work with property managers, HOAs and business owners across the Baltimore and Washington corridor.",
      ],
      highlightsLabel: "What we offer",
      highlights: [
        "TPO, EPDM and modified bitumen",
        "Work staged around business hours",
        "Repairs, coatings and maintenance plans",
        "Licensed and fully insured crews",
      ],
      image: images.flatRoofSkylight,
      ctas: [
        { label: "Explore commercial roofing", href: "/services/commercial-roofing" },
        { label: "Request a quote", href: "/contact-us" },
      ],
    },
    {
      anchor: "repairs",
      icon: "wrench",
      eyebrow: "Repairs & inspections",
      title: "Repairs, maintenance and inspections",
      lead: "Small problems become expensive ones when they're left alone. We inspect, diagnose and repair with care, and the inspection is always free.",
      paragraphs: ["Missing shingles, flashing failures, valley leaks and small punctures are often fixed in a single visit. If a repair will do, that's what we recommend."],
      highlightsLabel: "What we offer",
      highlights: ["Free, no-obligation roof inspections", "Leak tracing and emergency repair", "Seasonal maintenance plans", "Written condition reports with photos"],
      image: images.rooferInspecting,
      ctas: [{ label: "Request a quote", href: "/contact-us" }],
    },
    {
      anchor: "storm",
      icon: "storm",
      eyebrow: "Storm & emergency",
      title: "Storm damage and 24/7 emergencies",
      lead: "A tree limb through the deck at 9 PM doesn't wait for business hours, and neither do we.",
      paragraphs: [
        "We respond fast, tarp and secure the opening, then return for the permanent repair once conditions allow.",
        "Storm damage is often invisible from the ground. We document it properly and work with your insurer; many customers pay only their deductible.",
      ],
      highlightsLabel: "What we handle",
      highlights: ["24/7 emergency tarping", "Hail and wind damage", "Fallen trees and debris", "Insurance claims and adjuster meetings"],
      image: images.treeOnRoof,
      ctas: [
        { label: "Emergency roof repair", href: "/services/emergency-roof-repair" },
        { label: "Insurance claims", href: "/roofing-insurance" },
      ],
    },
  ],
  faqs: [],
};

export const fallbackAtlas: AtlasContent = {
  seo: {
    title: "Atlas Roofing Shingles in Maryland | Pineda's Roofing",
    description:
      "Pineda's Roofing installs Atlas Pinnacle Pristine shingles with 3M Scotchgard Protector on every roof. See Atlas shingle lines and warranty options in Maryland.",
  },
  hero: {
    eyebrow: "Atlas Roofing",
    heading: "Atlas shingles on every roof we install",
    text: "Every shingle roof we build uses Atlas Pinnacle Pristine, a shingle made to stand up to Maryland storms and stay clean in our humid summers.",
    image: images.shingleInstall,
  },
  sections: [
    {
      anchor: "why-atlas",
      icon: "award",
      eyebrow: "Why Atlas",
      title: "Why we chose Atlas",
      lead: "Atlas gives our customers the mix we care about most: good looks, storm performance and a strong manufacturer warranty.",
      paragraphs: [
        "Atlas Pinnacle Pristine is our standard shingle, not an upgrade. It carries 3M Scotchgard Protector, which keeps the black algae streaks you see on older Maryland roofs from taking hold.",
        "We pair the shingles with matching starter and ridge cap, synthetic underlayment, ice & water shield and proper ventilation, so the whole roof works together.",
      ],
      highlightsLabel: "What you get",
      highlights: [
        "Atlas Pinnacle Pristine shingles",
        "3M Scotchgard algae protection",
        "Built for high winds and heavy storms",
        "Wide range of colors",
        "Matching starter and ridge cap",
        "Lifetime manufacturer warranty",
      ],
      image: images.pinnaclePristineBundles,
    },
    {
      anchor: "system",
      icon: "layers",
      eyebrow: "The full system",
      title: "A complete Atlas roof system",
      lead: "A shingle is only as good as what's under it and around it. Each layer is chosen to work with the others.",
      paragraphs: ["Matched components are also what qualify a roof for Atlas's stronger system warranties. We show you exactly which coverage your roof gets, in writing."],
      highlightsLabel: "What's included",
      highlights: ["Synthetic underlayment", "Ice & water shield in eaves and valleys", "Pre-cut starter strips", "Pre-stripped hip and ridge cap", "Ridge ventilation", "New drip edge and flashing"],
      image: images.underlaymentInstall,
    },
  ],
  productsIntro: {
    eyebrow: "Shingle lines",
    heading: "Atlas shingles we install",
    text: "Pinnacle Pristine is our standard. Ask about the other lines if you want a different look or extra impact resistance.",
  },
  products: [
    {
      name: "Pinnacle Pristine",
      tagline: "Our standard architectural shingle",
      text: "Dimensional look, rich color blends and Scotchgard Protector to keep the roof clean.",
      highlights: ["3M Scotchgard algae resistance", "High wind performance", "Lifetime limited warranty"],
      image: images.homeNewRoofAerial,
    },
    {
      name: "StormMaster Shake & Slate",
      tagline: "Impact-resistant designer shingles",
      text: "The look of cedar shake or slate with impact resistance for homes that see hail.",
      highlights: ["Impact-resistant design", "Shake and slate profiles", "Designer look without the upkeep"],
    },
    {
      name: "ProLAM",
      tagline: "Value architectural shingle",
      text: "A dependable laminated shingle for rentals, additions and budget-conscious projects.",
      highlights: ["Laminated two-layer design", "Classic architectural look", "Good fit for rentals and additions"],
    },
  ],
  warrantyIntro: {
    eyebrow: "Warranty",
    heading: "Covered by Atlas and by us",
    text: "Two layers of protection: the manufacturer covers the materials, and Pineda's covers the installation.",
  },
  warranties: [
    { icon: "shield-check", title: "Lifetime manufacturer warranty", text: "Atlas's lifetime limited warranty on the shingles, registered in your name." },
    { icon: "hammer", title: "10 year labor warranty", text: "Pineda's covers the installation itself for 10 years, starting the day we finish." },
    { icon: "file-check", title: "In writing", text: "You get the warranty paperwork for your exact roof, not a brochure promise." },
  ],
  faqs: [
    {
      question: "Are Atlas shingles good for Maryland weather?",
      answer: "Yes. Pinnacle Pristine is made to hold up to high winds and heavy storms, and its Scotchgard Protector fights the algae streaking that our humid summers cause.",
    },
    {
      question: "Can I choose a different shingle color?",
      answer: "Yes. Pinnacle Pristine comes in a wide range of colors. We bring samples and help you choose one that suits your home and neighborhood.",
    },
    {
      question: "Does my new roof come with a warranty?",
      answer: "Yes. Atlas backs the shingles with a lifetime manufacturer warranty, and Pineda's backs the installation with a 10 year labor warranty. You get the documents for your roof in writing.",
    },
  ],
};

export const fallbackInsurance: InsuranceContent = {
  seo: {
    title: "Roof Insurance Claims in Maryland | Pineda's Roofing",
    description:
      "Storm damage? Pineda's Roofing inspects for free, documents the damage, meets your adjuster and handles your roof insurance claim with any carrier in Maryland.",
  },
  hero: {
    eyebrow: "Insurance claims",
    heading: "We handle your storm damage claim",
    text: "Roof damage from a storm is stressful. Filing the insurance claim doesn't have to be. We work with every insurance company.",
    image: images.hailDamage,
  },
  sections: [
    {
      anchor: "claims",
      icon: "file-check",
      eyebrow: "Claim help",
      title: "Your storm damage experts",
      lead: "We document the damage the way adjusters need it, meet them on your roof and stay with you until the work is done.",
      paragraphs: [
        "Storm damage is often invisible from the ground. Our free assessment tells you whether a claim is worth filing before you call your carrier.",
        "Storm damage is often covered; age and general wear usually are not. Many customers pay only their deductible.",
      ],
      highlightsLabel: "What we do for you",
      highlights: ["Free storm damage assessment", "Detailed photo documentation", "We meet your adjuster on site", "Help with supplements and denials"],
      image: images.rooferInspecting,
    },
  ],
  stepsIntro: { eyebrow: "Step by step", heading: "How the claim process works" },
  steps: [
    { title: "Free damage assessment", text: "A full inspection with photos to see if your roof qualifies for a claim." },
    { title: "Claim filing help", text: "We provide the documentation and evidence your claim needs." },
    { title: "Adjuster meeting", text: "We meet the adjuster on site so every bit of damage is counted." },
    { title: "Project start", text: "Once approved, we schedule quickly and help you choose materials." },
    { title: "Final walkthrough", text: "We walk the finished job with you and finalize your warranty." },
  ],
  signsIntro: { eyebrow: "After a storm", heading: "Signs your roof may have storm damage" },
  signs: [
    { icon: "storm", title: "Hail hits", text: "Dark spots or dents in shingles, gutters, downspouts and vents." },
    { icon: "wind", title: "Missing shingles", text: "Shingles in the yard or lifted tabs along ridges and edges." },
    { icon: "droplets", title: "New leaks", text: "Water stains on ceilings or in the attic after heavy rain." },
    { icon: "leaf", title: "Fallen limbs", text: "Even a small limb can crack shingles or puncture the deck." },
  ],
  faqs: [],
};

export const fallbackAbout: AboutContent = {
  seo: {
    title: "About Pineda's Roofing | Family Owned Since 1992",
    description:
      "Meet Pineda's Roofing: a family-owned Maryland roofing company founded by German Pineda and run by Freddy and Roberto Pineda. MHIC# 142024.",
  },
  hero: {
    eyebrow: "About us",
    heading: "Built on family and craftsmanship",
    text: "Family owned since 1992. Serving Maryland and the DMV for over 30 years.",
    image: images.crew,
  },
  facts: [
    { label: "Founder", value: "German Pineda" },
    { label: "Owner", value: "Freddy Pineda" },
    { label: "Co-owner", value: "Roberto Pineda" },
    { label: "Headquarters", value: "Silver Spring, MD" },
    { label: "License", value: "MHIC# 142024" },
  ],
  sections: [
    {
      anchor: "story",
      icon: "users",
      eyebrow: "Our story",
      title: "Roofing the way it should be done",
      lead: "German Pineda founded Pineda's over three decades ago with one commitment: exceptional roofing for our Maryland community.",
      paragraphs: [
        "We've grown into a trusted name in Maryland roofing, but our values haven't changed: quality, integrity and family-first service.",
        "Your home is your sanctuary. We treat every project with the care we'd give our own family's home.",
      ],
      highlightsLabel: "What hasn't changed",
      highlights: ["Same family, same standards", "Our own crews on every job", "Best materials, latest techniques", "Honest advice, even when it's a repair"],
      image: images.freddyPineda,
    },
    {
      anchor: "mission",
      icon: "handshake",
      eyebrow: "Our mission",
      title: "Exceed expectations on every roof",
      lead: "Our mission is simple: the highest quality roofing, with real care for our customers and their homes.",
      paragraphs: ["Over 30 years of experience goes into every inspection, every quote and every installation."],
      highlightsLabel: "How we work",
      highlights: ["Free inspections with photos", "Written scope and pricing", "Clean, on-schedule installs", "10 year labor warranty"],
      image: images.robertoPineda,
      imageSide: "right",
    },
  ],
  valuesIntro: { eyebrow: "How we operate", heading: "What Pineda's is built on" },
  values: [
    { icon: "camera", title: "Eagle vision", text: "We see what others miss. Every detail matters." },
    { icon: "house", title: "Strong foundations", text: "Every project is built to last, just like a well-crafted nest." },
    { icon: "ruler", title: "Hunt with precision", text: "Focus, accuracy and intent on every job. No wasted motion." },
    { icon: "shield-check", title: "Honor & integrity", text: "We do what's right, even when no one is looking." },
    { icon: "wind", title: "Relentless drive", text: "Wings in motion: we don't stop until the job is done right." },
    { icon: "star", title: "Rise above standards", text: "We set the bar higher and exceed expectations every time." },
  ],
};

export { estimate };
