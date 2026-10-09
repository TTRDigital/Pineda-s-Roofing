import type { Service } from "../types";
import { images } from "./images.ts";

/* Fallback content for /services/[slug]. Sanity documents of type "service" override these. */

const estimateCta = [{ label: "Get a free estimate", href: "/contact-us" }];

export const fallbackServices: Service[] = [
  /* 1 ─────────────────────────────────────────────────────────────── */
  {
    slug: "residential-roofing",
    title: "Residential Roofing",
    category: "residential",
    icon: "house",
    order: 1,
    summary: "Shingle roof replacement, repair and upkeep for Maryland homes, installed by our own family crews with Atlas Pinnacle Pristine.",
    hero: {
      eyebrow: "Residential Roofing",
      heading: "Roofs built for Maryland homes and families",
      text: "From a few missing shingles to a full replacement, our own family crews take care of your home's roof the way we'd take care of our own.",
      image: images.homeNewRoofAerial,
    },
    sections: [
      {
        anchor: "overview",
        icon: "users",
        eyebrow: "Family owned since 1992",
        title: "Your home's roof, handled by one family",
        lead: "For more than 30 years, Maryland homeowners have called Pineda's Roofing when the roof over their head needs attention.",
        paragraphs: [
          "The person who inspects your roof, the crew who installs it and the owner who stands behind the warranty all belong to the same family business. No rotating cast of subcontractors.",
          "We inspect the whole roof, photograph what we find and tell you honestly whether you need a repair or a replacement.",
        ],
        highlightsLabel: "Why homeowners choose us",
        highlights: [
          "Family owned and operated since 1992",
          "Our own crews, not subcontractors",
          "Licensed, insured & bonded, MHIC# 142024",
          "Free inspections, no-obligation estimates",
          "Photo documentation of every finding",
          "10 year labor warranty",
        ],
        image: images.crew,
      },
      {
        anchor: "shingle-roofs",
        icon: "layers",
        eyebrow: "Premium materials as standard",
        title: "Atlas Pinnacle Pristine on every roof",
        lead: "Asphalt shingles are the right choice for most Maryland homes. We install Atlas Pinnacle Pristine on every one, as standard, not as an upsell.",
        paragraphs: [
          "These shingles carry 3M Scotchgard Protector, which resists the black algae streaks common in our humid summers. They come in a wide range of colors and styles to suit traditional and modern homes.",
          "Underneath, every roof gets synthetic underlayment and ice and water shield where Maryland roofs leak most.",
        ],
        highlightsLabel: "What goes on every roof",
        highlights: [
          "Atlas Pinnacle Pristine shingles",
          "3M Scotchgard Protector against algae",
          "Synthetic underlayment",
          "Ice & water shield in valleys and eaves",
          "Pre-stripped ridge cap at the peak",
          "Wide range of colors and styles",
        ],
        image: images.pinnaclePristineBundles,
      },
      {
        anchor: "replacement",
        icon: "hammer",
        title: "Roof replacement in two to three days",
        lead: "When repairs stop making financial sense, a new roof is the better investment. Most residential replacements are finished in two to three days.",
        paragraphs: [
          "We remove the old roof, repair the deck where needed, correct the ventilation and install a complete new system. Then we clean up, sweep for nails and walk the finished roof with you.",
        ],
        highlightsLabel: "What's included",
        highlights: [
          "Full tear-off of the old roof",
          "Deck inspection and repair",
          "Ventilation checked and corrected",
          "Magnet sweep and full cleanup",
          "Final walkthrough together",
          "Workmanship warranty from day one",
        ],
        image: images.aerialNewShingleRoof,
      },
      {
        anchor: "repairs",
        icon: "wrench",
        title: "Honest repairs when a repair will do",
        lead: "Not every problem needs a new roof. Missing shingles, flashing failures, valley leaks and small punctures are often fixed in a single visit.",
        paragraphs: [
          "If a repair will safely extend your roof's life, that's what we recommend. When storm damage is involved, we document it and work directly with your insurance company.",
        ],
        highlightsLabel: "Common home repairs",
        highlights: [
          "Leaks and ceiling stains",
          "Missing or wind-lifted shingles",
          "Chimney, vent and skylight flashing",
          "Worn shingles and granule loss",
        ],
        image: images.roofRepairCrew,
      },
      {
        anchor: "ventilation-gutters",
        icon: "wind",
        title: "Ventilation and gutters, done together",
        lead: "A roof only lasts as long as the system around it. Good attic ventilation and working gutters protect your shingles, deck and foundation.",
        paragraphs: [
          "Poor ventilation traps heat in summer and helps ice dams form in winter. We check intake and exhaust on every job and add Lomanco ventilation where the roof needs it.",
          "We also install seamless gutters and gutter guards so water leaves the roof edge and moves away from your home.",
        ],
        highlightsLabel: "Why it matters",
        highlights: [
          "Helps prevent winter ice dams",
          "Reduces summer attic heat",
          "Extends the life of your shingles",
          "Seamless gutters and gutter guards",
        ],
        image: images.gutterDownspout,
        ctas: estimateCta,
      },
    ],
    faqs: [
      {
        question: "How do I know whether I need a repair or a replacement?",
        answer: "It comes down to the age of the roof, how widespread the damage is and whether the deck underneath is still sound. You can't judge that from the ground. We inspect the roof, photograph what we find and give you an honest answer.",
      },
      {
        question: "How long does a roof replacement take?",
        answer: "Most residential replacements are finished in two to three days, depending on the size, pitch and access of the roof. Repairs are usually a single visit. You get a specific timeline with your quote.",
      },
      {
        question: "Why do you use Atlas Pinnacle Pristine shingles?",
        answer: "They're built for the weather Maryland actually gets. They carry 3M Scotchgard Protector, which prevents the black algae streaking you see on older roofs, and they're made to handle high winds and heavy storms.",
      },
      {
        question: "Will my insurance cover a new roof?",
        answer: "Storm damage is often covered, while age and general wear usually are not. We document the damage and work directly with your insurance company so the claim reflects what is actually on the roof.",
      },
      {
        question: "What warranty do I get?",
        answer: "Every new roof comes with a 10 year labor warranty from Pineda's and a lifetime manufacturer warranty on the shingles. You get both in writing.",
      },
      {
        question: "Are you licensed and insured?",
        answer: "Yes. We are fully licensed, insured and bonded in Maryland, MHIC# 142024.",
      },
    ],
    seo: {
      title: "Residential Roofing in Maryland | Pineda's Roofing",
      description: "Family-owned residential roofing in Maryland since 1992. Shingle roof replacement and repair with Atlas Pinnacle Pristine shingles and free inspections.",
    },
  },

  /* 2 ─────────────────────────────────────────────────────────────── */
  {
    slug: "commercial-roofing",
    title: "Commercial Roofing",
    category: "commercial",
    icon: "building",
    order: 2,
    summary: "Flat and low-slope roofing for Maryland businesses: TPO, EPDM and modified bitumen, scheduled around your operating hours.",
    hero: {
      eyebrow: "Commercial Roofing",
      heading: "Commercial roofs built around your business",
      text: "Every commercial building has its own challenges. Our commercial roofing service is built around your schedule, your tenants and your budget.",
      image: images.commercialMetalRoof,
    },
    sections: [
      {
        anchor: "overview",
        icon: "building",
        eyebrow: "For owners and property managers",
        title: "A roofing partner for your property",
        lead: "Every commercial building has its own unique challenges. Our commercial roofing service is built around your schedule, your tenants and your budget.",
        paragraphs: [
          "We work with property managers, HOAs and business owners across the Baltimore-Washington corridor. Large projects are scheduled around your operating hours to keep downtime to a minimum.",
          "You deal with the same family-owned company from the first inspection to the final walkthrough, with our own crews on the roof.",
        ],
        highlightsLabel: "What you can expect",
        highlights: [
          "Work scheduled around business hours",
          "Minimal disruption to tenants",
          "Our own crews, not subcontractors",
          "Licensed, insured & bonded, MHIC# 142024",
          "Free inspection with photo documentation",
          "Written scope and transparent pricing",
        ],
        image: images.crew,
      },
      {
        anchor: "flat-roof-systems",
        icon: "layers",
        eyebrow: "Flat and low-slope",
        title: "Flat roof systems we install",
        lead: "Flat roofs demand correct drainage design and precise seam work. Those are the two places cheap flat roofing fails first.",
        paragraphs: [
          "We install TPO, EPDM, modified bitumen and other single-ply membrane systems, with products from Mule-Hide, Firestone and Polyglass. We build for water management, not just coverage.",
          "Flat systems also suit rooftop equipment and solar panels, and they are generally easier to maintain and repair over their lifespan.",
        ],
        highlightsLabel: "Systems we offer",
        highlights: [
          "TPO single-ply membranes",
          "EPDM rubber roofing",
          "Modified bitumen roofs",
          "Drainage designed to move water off",
          "Precise, sealed seams",
          "Mule-Hide, Firestone and Polyglass",
        ],
        image: images.flatRoofMembrane,
      },
      {
        anchor: "replacement-new-construction",
        icon: "hard-hat",
        title: "Replacement and new construction",
        lead: "From a full tear-off on an occupied building to a new roof on a project under construction, we plan the work around the people who use the space.",
        paragraphs: [
          "Commercial replacements are scheduled to minimize downtime, with roofs built to handle heavy use and Maryland weather. We also install metal roofing from Englert and PAC-CLAD where a project calls for it.",
          "On new construction, we work closely with builders and general contractors to keep the roof on schedule and up to code.",
        ],
        highlightsLabel: "What's included",
        highlights: [
          "Large-scale commercial replacements",
          "Phased work to limit downtime",
          "Englert and PAC-CLAD metal roofing",
          "Coordination with your builder",
          "Built to code and industry standards",
          "Clean, organized job sites",
        ],
        image: images.flatRoofSkylight,
      },
      {
        anchor: "repairs-maintenance",
        icon: "clipboard",
        title: "Repairs and maintenance plans",
        lead: "Small problems on a flat roof spread fast. Regular inspections and quick repairs protect your building, your inventory and your tenants.",
        paragraphs: [
          "We find and fix leaks, failed seams, ponding water and damaged flashing around rooftop units. Scheduled maintenance catches problems early and keeps drains and gutters clear.",
          "When storm damage is involved, we document everything with photos and work directly with your insurance company.",
        ],
        highlightsLabel: "What we offer",
        highlights: [
          "Leak detection and repair",
          "Seam and flashing repairs",
          "Drain and gutter cleaning",
          "Scheduled roof inspections",
          "24/7 emergency service",
          "Storm damage insurance help",
        ],
        image: images.roofCleaning,
        ctas: estimateCta,
      },
    ],
    faqs: [
      {
        question: "What commercial roofing systems do you install?",
        answer: "We install TPO, EPDM, modified bitumen and other single-ply membrane systems on flat and low-slope roofs, plus metal roofing where it fits the building. We recommend a system after inspecting your roof and talking through how the building is used.",
      },
      {
        question: "Can you work around our business hours?",
        answer: "Yes. Large projects are scheduled around your operating hours to keep downtime to a minimum. We plan access, staging and cleanup with you before work begins.",
      },
      {
        question: "Do you work with property managers and HOAs?",
        answer: "Yes. We work with property managers, HOAs and business owners across the Baltimore-Washington corridor, and we provide written scopes, photos and transparent pricing for your approval process.",
      },
      {
        question: "Do you handle new construction?",
        answer: "Yes. We work closely with builders and contractors to install roofs on new projects on schedule, following all building codes and industry standards.",
      },
      {
        question: "Can you help with an insurance claim on a commercial roof?",
        answer: "Yes. We document storm damage with photos and reports, work directly with your insurance company and can meet the adjuster on site.",
      },
    ],
    seo: {
      title: "Commercial Roofing in Maryland | Pineda's Roofing",
      description: "Commercial flat roofing in Maryland: TPO, EPDM and modified bitumen installs, repairs and maintenance, scheduled around your business hours.",
    },
  },

  /* 3 ─────────────────────────────────────────────────────────────── */
  {
    slug: "roof-replacement",
    title: "Roof Replacement",
    category: "residential",
    icon: "hammer",
    order: 3,
    summary: "Full roof replacement for homes and businesses with premium materials, our own crews and most homes finished in two to three days.",
    hero: {
      eyebrow: "Roof Replacement",
      heading: "Roof replacement done right the first time",
      text: "A new roof from Maryland's family-owned roofers. Premium materials, our own crews, and most homes finished in two to three days.",
      image: images.aerialNewShingleRoof,
    },
    sections: [
      {
        anchor: "overview",
        icon: "hammer",
        eyebrow: "Residential and commercial",
        title: "When it's time for a new roof",
        lead: "When repairs stop making financial sense, a full replacement is the better investment. We handle residential, commercial and new construction roofs.",
        paragraphs: [
          "We remove the old roof, correct the deck and ventilation, and install a complete system built to last for decades.",
          "When storm damage is involved, insurance often covers a full replacement rather than a patch. We document the damage and work directly with your insurance company.",
        ],
        highlightsLabel: "Signs you need a new roof",
        highlights: [
          "Missing, cracked or curling shingles",
          "Frequent leaks or water stains inside",
          "A sagging roof deck",
          "Roof over 20 years old with visible wear",
          "Moss or algae holding moisture",
          "Granules collecting in your gutters",
        ],
        image: images.homeNewRoofAerial,
      },
      {
        anchor: "process",
        icon: "clipboard",
        eyebrow: "Our process",
        title: "How your replacement works",
        lead: "We keep it simple, transparent and on schedule, from the first call to the final walkthrough.",
        paragraphs: [
          "It starts with a free inspection and a written estimate covering scope, materials, timeline and price. We help you choose materials, with a strong recommendation for Atlas Pinnacle Pristine shingles.",
          "Our crew removes the old roof, prepares the deck and installs the new system with proper ventilation. We finish with a final inspection, a full cleanup and a walkthrough with you.",
        ],
        highlightsLabel: "What's included",
        highlights: [
          "Free inspection and written estimate",
          "Removal of the old roof",
          "Roof deck preparation and repair",
          "Ventilation and insulation checked",
          "Every element fastened and sealed",
          "Final inspection and full cleanup",
        ],
        image: images.deckingUnderlayment,
      },
      {
        anchor: "materials",
        icon: "layers",
        title: "Premium materials as standard",
        lead: "No upcharge for the right way to build a roof. This is what goes on every job we install.",
        paragraphs: [
          "Atlas Pinnacle Pristine architectural shingles carry 3M Scotchgard Protector, so they resist the black algae streaks you see on older roofs. They come in a wide range of colors and styles.",
          "Underneath, synthetic underlayment and self-adhering ice and water shield keep water out where Maryland roofs leak most.",
        ],
        highlightsLabel: "What goes on every roof",
        highlights: [
          "Atlas Pinnacle Pristine shingles",
          "3M Scotchgard Protector algae resistance",
          "Synthetic underlayment",
          "Ice & water shield in valleys and eaves",
          "Pre-stripped ridge cap for a tight seal",
          "10 year labor warranty",
        ],
        image: images.pinnaclePristineBundles,
      },
      {
        anchor: "commercial-flat",
        icon: "building",
        title: "Commercial and flat roof replacement",
        lead: "For businesses, a reliable roof is crucial for safety and productivity. We schedule large projects to keep downtime to a minimum.",
        paragraphs: [
          "Flat roofs are standard on commercial buildings and common on rowhomes and additions. We install TPO, modified bitumen and single-ply membrane systems with correct drainage and precise seams.",
        ],
        highlightsLabel: "What we offer",
        highlights: [
          "TPO and single-ply membrane systems",
          "Modified bitumen flat roofs",
          "Drainage designed to move water off",
          "Work scheduled to limit downtime",
        ],
        image: images.flatRoofMembrane,
      },
      {
        anchor: "new-construction",
        icon: "hard-hat",
        title: "New construction roofing",
        lead: "We work alongside builders and contractors to install roofs on new homes and additions, on schedule.",
        paragraphs: [
          "We coordinate closely with your construction team, use materials built to last and follow all building codes and industry standards for safety and quality.",
        ],
        highlightsLabel: "How we work with builders",
        highlights: [
          "Close coordination with your crew",
          "Installation timed to your schedule",
          "Built to code and industry standards",
          "The same materials we trust on every roof",
        ],
        image: images.shingleNailing,
        ctas: estimateCta,
      },
    ],
    faqs: [
      {
        question: "How do I know if I need a roof replacement?",
        answer: "Common signs are missing, cracked or curling shingles, frequent leaks, a sagging deck and visible wear on a roof over 20 years old. Moss or algae growth can also mean moisture is trapped. A free inspection will tell you for sure.",
      },
      {
        question: "How long does a roof replacement take?",
        answer: "Most residential replacements are completed in two to three days. Larger or more complex projects can take longer, and we give you a detailed schedule during the consultation.",
      },
      {
        question: "What does a roof replacement cost?",
        answer: "Cost depends on the size of your roof, the materials and the complexity of the installation. When storm damage is involved, insurance often covers the replacement. We provide a detailed, no-obligation quote after the inspection.",
      },
      {
        question: "Will you clean up after the job?",
        answer: "Yes. We remove all debris and old materials, run a magnet sweep for nails and do a final walkthrough with you before we call the job done.",
      },
      {
        question: "What warranties do you offer?",
        answer: "You get a 10 year labor warranty from Pineda's and a lifetime manufacturer warranty on the Atlas Pinnacle Pristine shingles. Your labor warranty starts the day we finish.",
      },
    ],
    seo: {
      title: "Roof Replacement in Maryland | Pineda's Roofing",
      description: "Roof replacement in Maryland with Atlas Pinnacle Pristine shingles, our own crews and a 10 year labor warranty. Most homes done in 2 to 3 days. Free estimates.",
    },
  },

  /* 4 ─────────────────────────────────────────────────────────────── */
  {
    slug: "roof-repair",
    title: "Roof Repair",
    category: "repair",
    icon: "wrench",
    order: 4,
    summary: "Leaks, missing shingles, flashing and worn spots fixed right, usually in one visit, on shingle, flat and metal roofs.",
    hero: {
      eyebrow: "Roof Repair",
      heading: "Roof repairs that stop leaks for good",
      text: "Shingle roofs, flat roofs and more. We find the real cause, fix it right and tell you honestly when a repair is all you need.",
      image: images.roofRepairCrew,
    },
    sections: [
      {
        anchor: "overview",
        icon: "wrench",
        eyebrow: "30+ years of repairs",
        title: "Repair first, when repair makes sense",
        lead: "Not every problem needs a new roof. Many leaks, flashing failures and missing shingles are fixed in a single visit.",
        paragraphs: [
          "We inspect the whole roof, photograph what we find and include a clear repair plan in your free estimate. If a repair will safely extend your roof's life, that's what we recommend.",
          "Our family-owned team repairs shingle, flat and metal roofs on homes and businesses across Maryland.",
        ],
        highlightsLabel: "How we work",
        highlights: [
          "Free inspection and repair plan",
          "Photo documentation of the damage",
          "Most repairs done in one visit",
          "Shingle, flat and metal roofs",
          "Final inspection when we finish",
          "Insurance claim help for storm damage",
        ],
        image: images.rooferInspecting,
      },
      {
        anchor: "leaks",
        icon: "droplets",
        title: "Leaks and water damage",
        lead: "Persistent leaks cause water stains, mold growth and structural damage. We find where the water actually gets in and stop it there.",
        paragraphs: [
          "Water often travels before it shows up inside, so the stain on your ceiling isn't always under the problem. We trace the path, check the flashing, underlayment and deck, and fix the source.",
        ],
        highlightsLabel: "Signs to watch for",
        highlights: [
          "Water stains on ceilings or walls",
          "Damp spots or drips during rain",
          "Dark or soft wood in the attic",
          "Peeling paint near the roofline",
        ],
        image: images.deckRot,
      },
      {
        anchor: "shingles-flashing",
        icon: "layers",
        title: "Damaged shingles and flashing",
        lead: "Wind, storms and age crack, curl and tear shingles. Flashing around chimneys, vents and skylights is where many leaks begin.",
        paragraphs: [
          "We match and replace damaged asphalt and architectural shingles so the repair blends in. Flashing is repaired or replaced and tied correctly into the surrounding shingles to keep the roof watertight.",
        ],
        highlightsLabel: "What we fix",
        highlights: [
          "Cracked, curled or missing shingles",
          "Wind-lifted shingles",
          "Chimney and skylight flashing",
          "Vent and pipe flashing",
        ],
        image: images.chimneyFlashing,
      },
      {
        anchor: "deck-and-wear",
        icon: "ruler",
        title: "Sagging decks and granule loss",
        lead: "A sagging roof or bare, worn shingles point to deeper problems. Acting early can keep a repair from becoming a replacement.",
        paragraphs: [
          "We assess sagging areas, reinforce or replace damaged decking and replace underlayment where needed. We also check for granule loss, which leaves shingles exposed to sun and weather.",
          "We also look at attic ventilation and insulation, which help prevent ice dams and heat buildup.",
        ],
        highlightsLabel: "What we check",
        highlights: [
          "Soft or sagging spots in the deck",
          "Granules collecting in gutters",
          "Attic ventilation and insulation",
          "Gutters and downspouts",
        ],
        image: images.granuleLoss,
        ctas: estimateCta,
      },
    ],
    faqs: [
      {
        question: "How do I know if my roof needs repair?",
        answer: "Common signs are missing or cracked shingles, water stains on ceilings or walls, sagging areas on the roof and granules in your gutters. If you notice any of these, schedule a free inspection.",
      },
      {
        question: "How long does a typical roof repair take?",
        answer: "Most repairs are a single visit, and minor ones often take just a few hours. More extensive repairs can take a day or two. We give you a timeline after the inspection.",
      },
      {
        question: "Can repairs extend the life of my roof?",
        answer: "Yes. Fixing problems early prevents further damage and can help you avoid a full replacement for years.",
      },
      {
        question: "Will my homeowner's insurance cover a roof repair?",
        answer: "It depends on your policy and the cause of the damage. Storm damage is often covered. We help you through the claim and provide the photos and documentation your insurer needs.",
      },
      {
        question: "What should I do if my roof is leaking right now?",
        answer: "Call us right away at (301) 921-6333. Our emergency service is available 24/7. We'll stop the leak, protect your home and then plan a long-term repair.",
      },
      {
        question: "What types of roofs do you repair?",
        answer: "We repair asphalt shingle, architectural shingle, flat and metal roofs on homes and commercial buildings.",
      },
    ],
    seo: {
      title: "Roof Repair in Maryland | Pineda's Roofing",
      description: "Roof leak and shingle repair in Maryland from a family-owned roofer with 30+ years of experience. Free inspections, and most repairs take one visit.",
    },
  },

  /* 5 ─────────────────────────────────────────────────────────────── */
  {
    slug: "emergency-roof-repair",
    title: "Emergency Roof Repair",
    category: "repair",
    icon: "siren",
    order: 5,
    summary: "24/7 emergency roof repair for leaks, storm damage and fallen trees. We tarp, secure and protect your home fast.",
    hero: {
      eyebrow: "24/7 Emergency Roof Repair",
      heading: "Roof emergency? We answer 24/7",
      text: "Leaks, storm damage or a tree on the roof. Our team is available around the clock to secure your home and stop further damage.",
      image: images.treeOnRoof,
    },
    sections: [
      {
        anchor: "overview",
        icon: "siren",
        eyebrow: "Available 24/7",
        title: "Fast help when your roof fails",
        lead: "Roof emergencies don't wait for business hours. Our team is available 24/7 to protect your home and restore your peace of mind.",
        paragraphs: [
          "A tree limb through the deck at 9pm needs action now. We tarp and secure the opening to keep water out of the structure, then return for a permanent repair once conditions allow.",
          "Call (301) 921-6333 any time, day or night.",
        ],
        highlightsLabel: "Why call Pineda's",
        highlights: [
          "24/7 emergency availability",
          "Tarping and temporary patching",
          "Over 30 years of experience",
          "Family owned and operated",
          "Help with your insurance claim",
          "Permanent repairs with quality materials",
        ],
        image: images.roofRepairCrew,
      },
      {
        anchor: "signs",
        icon: "droplets",
        title: "Signs you need emergency repair",
        lead: "Spotting damage early can save you from bigger repairs and higher costs. Call right away if you see any of these.",
        paragraphs: [
          "After heavy rain, hail or strong winds, check your ceilings and look at the roof from the ground. Stay off the roof and away from any sagging areas.",
        ],
        highlightsLabel: "Signs to watch for",
        highlights: [
          "Water dripping or spreading stains",
          "Missing shingles or damaged flashing",
          "A tree limb or debris on the roof",
          "Sagging sections of the roof",
          "Shingles torn off by high winds",
          "Damp spots after every rain",
        ],
        image: images.windDamage,
      },
      {
        anchor: "storm-and-trees",
        icon: "storm",
        title: "Storm damage and fallen trees",
        lead: "High winds, hail and falling limbs can cause sudden, serious damage that needs immediate attention.",
        paragraphs: [
          "A fallen tree can puncture the deck and weaken the structure. We clear the debris from the roof, secure the opening and document everything with photos for your insurance claim.",
        ],
        highlightsLabel: "What we handle",
        highlights: [
          "Fallen trees and limbs",
          "Hail and wind damage",
          "Punctures and open roof decks",
          "Photo documentation for insurance",
        ],
        image: images.fallenTreeHouse,
      },
      {
        anchor: "process",
        icon: "clipboard",
        title: "Our emergency repair process",
        lead: "A clear plan from the first call to the final inspection, so you always know what happens next.",
        paragraphs: [
          "We inspect the damage, put a temporary fix in place and give you a detailed report with a repair plan, timeline and cost estimate.",
          "Then we make the permanent repair with quality materials, including Atlas Pinnacle Pristine shingles, and inspect the finished work.",
        ],
        highlightsLabel: "Step by step",
        highlights: [
          "Damage inspection on arrival",
          "Tarping or patching to stop water",
          "Written report and repair plan",
          "Permanent repair and final inspection",
        ],
        image: images.underlaymentInstall,
        ctas: estimateCta,
      },
    ],
    faqs: [
      {
        question: "How quickly can you respond to an emergency?",
        answer: "Our team is available 24/7 and works to reach you as quickly as possible. Call (301) 921-6333 and we'll give you immediate guidance while we get a crew on the way.",
      },
      {
        question: "What should I do if I notice a leak or damage?",
        answer: "Stay safe, move belongings away from the leak and call us right away. Don't climb onto a damaged roof.",
      },
      {
        question: "Do you provide temporary fixes?",
        answer: "Yes. We tarp or patch the damaged area to prevent further damage to your home until the permanent repair can be made.",
      },
      {
        question: "How do you price an emergency roof repair?",
        answer: "The cost depends on the extent of the damage and the materials needed. After the initial inspection, we give you a detailed estimate of the repairs.",
      },
      {
        question: "Is emergency roof repair covered by insurance?",
        answer: "Damage from storms and other sudden events is often covered by homeowner's insurance. We document the damage and help you through the claim.",
      },
      {
        question: "Do you warranty emergency repair work?",
        answer: "Yes. Warranty details are included in your repair plan.",
      },
    ],
    seo: {
      title: "24/7 Emergency Roof Repair in Maryland | Pineda's Roofing",
      description: "24/7 emergency roof repair in Maryland and the DMV. We tarp leaks, secure storm and tree damage, and help with your insurance claim. Call (301) 921-6333.",
    },
  },

  /* 6 ─────────────────────────────────────────────────────────────── */
  {
    slug: "roof-maintenance",
    title: "Roof Maintenance",
    category: "repair",
    icon: "clipboard",
    order: 6,
    summary: "Inspections, cleaning and small repairs that catch problems early and add years to your roof.",
    hero: {
      eyebrow: "Roof Maintenance",
      heading: "Maintenance that adds years to your roof",
      text: "The cheapest roof problem is the one caught early. Regular inspections, cleaning and small repairs keep your roof in top shape.",
      image: images.rooferOnRidge,
    },
    sections: [
      {
        anchor: "overview",
        icon: "clipboard",
        title: "Catch small problems early",
        lead: "Scheduled inspections and minor upkeep routinely add years to a roof's service life and help protect your warranty coverage.",
        paragraphs: [
          "We inspect, clean, repair and maintain shingle, metal and tile roofs. Every visit ends with a report on what we did and what we recommend next.",
          "We suggest maintenance at least once a year, ideally before and after the harshest weather seasons.",
        ],
        highlightsLabel: "Why it matters",
        highlights: [
          "Prevents costly repairs",
          "Extends the life of your roof",
          "Helps protect your warranty",
          "Keeps water draining properly",
        ],
        image: images.rooferInspecting,
      },
      {
        anchor: "inspections",
        icon: "camera",
        title: "Detailed roof inspections",
        lead: "A thorough look at every part of your roof, documented with photos so you see exactly what we see.",
        paragraphs: [
          "We check the problems you can't see from the ground and explain them in plain language. No obligation and no pressure.",
        ],
        highlightsLabel: "What we check",
        highlights: [
          "Shingles and ridge cap",
          "Flashing at chimneys, vents and walls",
          "Gutters and downspouts",
          "Signs of leaks or deck damage",
        ],
        image: images.hailDamage,
      },
      {
        anchor: "cleaning",
        icon: "leaf",
        title: "Roof and gutter cleaning",
        lead: "Leaves, moss and branches trap moisture and block drainage. Clearing them keeps water moving off your roof.",
        paragraphs: [
          "We remove debris from the roof surface and valleys, and clean gutters and downspouts so they drain freely. Homes under mature trees benefit most.",
        ],
        highlightsLabel: "What's included",
        highlights: [
          "Debris cleared from roof and valleys",
          "Moss and branch removal",
          "Gutter and downspout cleaning",
          "Gutter guard installation",
        ],
        image: images.roofCleaning,
      },
      {
        anchor: "repairs",
        icon: "wrench",
        title: "Small repairs and preventive care",
        lead: "We fix minor issues before they turn into major problems, and help your roof stand up to the next season.",
        paragraphs: [
          "During a visit we can fix leaks, replace missing or damaged shingles and reinforce flashing. Protective coatings and gutter guards add another layer of defense where they make sense.",
        ],
        highlightsLabel: "What we offer",
        highlights: [
          "Leak fixes",
          "Shingle replacement",
          "Flashing repair and reinforcement",
          "Protective coatings",
          "Routine check-up visits",
          "Seasonal roof preparation",
        ],
        image: images.shingleRepairPatch,
        ctas: estimateCta,
      },
    ],
    faqs: [
      {
        question: "Why is roof maintenance important?",
        answer: "Regular maintenance prevents costly repairs, extends the life of your roof and helps protect your warranty coverage.",
      },
      {
        question: "How often should I schedule roof maintenance?",
        answer: "At least once a year, ideally before and after the harshest weather seasons. Homes under heavy tree cover may need more frequent cleaning.",
      },
      {
        question: "What does your maintenance service include?",
        answer: "Inspections, roof and gutter cleaning, small repairs and preventive work, tailored to your roof. You get a report of what we did and what we recommend.",
      },
      {
        question: "How do I know if my roof needs maintenance?",
        answer: "Missing shingles, leaks, sagging or visible wear are all signs. If it has been more than a year since anyone looked at your roof, it's time for an inspection.",
      },
      {
        question: "Are you licensed and insured?",
        answer: "Yes. We are fully licensed, insured and bonded in Maryland, MHIC# 142024.",
      },
    ],
    seo: {
      title: "Roof Maintenance in Maryland | Pineda's Roofing",
      description: "Roof maintenance in Maryland: inspections with photos, roof and gutter cleaning, and small repairs that add years to your roof. Family owned for 30+ years.",
    },
  },

  /* 7 ─────────────────────────────────────────────────────────────── */
  {
    slug: "storm-restoration",
    title: "Storm Restoration",
    category: "repair",
    icon: "storm",
    order: 7,
    summary: "Hail, wind, water, ice and fallen-tree damage inspected, documented for your insurer and fully restored.",
    hero: {
      eyebrow: "Storm Restoration",
      heading: "Storm damage restoration for Maryland homes",
      text: "Hail, wind, rain, ice and fallen trees. We inspect, document the damage for your insurer and restore your roof with quality materials.",
      image: images.treeOnRoof,
    },
    sections: [
      {
        anchor: "overview",
        icon: "storm",
        eyebrow: "30+ years of restoration",
        title: "Restoring your home after the storm",
        lead: "Storm damage is time-sensitive and often invisible from the ground. We find it, document it and repair it properly.",
        paragraphs: [
          "Maryland gets its share of hail, straight-line winds and hurricane remnants. We inspect the full roof, photograph every finding and work directly with your insurance company. Many customers pay only their deductible.",
          "Once the claim is approved, we repair or replace what's needed and walk the finished work with you.",
        ],
        highlightsLabel: "What we do for you",
        highlights: [
          "Free storm damage inspection",
          "Photo documentation for your claim",
          "We meet the adjuster on site",
          "Repairs or full replacement",
          "Roof and siding assessed together",
          "Final inspection and walkthrough",
        ],
        image: images.completedRoofAerial,
      },
      {
        anchor: "hail",
        icon: "camera",
        title: "Hail damage",
        lead: "Hail cracks and punctures shingles, dents metal and damages gutters. Much of it can't be seen without getting on the roof.",
        paragraphs: [
          "We look for both visible and hidden hail hits, mark and photograph them, and make prompt repairs to prevent leaks and further wear.",
        ],
        highlightsLabel: "Signs to watch for",
        highlights: [
          "Dents in gutters, vents and downspouts",
          "Dark spots where granules are knocked off",
          "Cracked or punctured shingles",
          "Granules piling up at downspouts",
        ],
        image: images.hailDamage,
      },
      {
        anchor: "wind",
        icon: "wind",
        title: "Wind damage",
        lead: "High winds lift, crease and tear off shingles, leaving the roof open to water.",
        paragraphs: [
          "We secure loose shingles, replace missing ones and reinforce the roof so it stands up to the next storm.",
        ],
        highlightsLabel: "What we fix",
        highlights: [
          "Missing or torn shingles",
          "Lifted and creased shingles",
          "Loose ridge cap and flashing",
          "Exposed underlayment or deck",
        ],
        image: images.windDamage,
      },
      {
        anchor: "water-ice",
        icon: "thermometer",
        title: "Water and ice damage",
        lead: "Heavy rain, snow and ice dams push water under shingles and into ceilings, walls and insulation.",
        paragraphs: [
          "We find the leak, repair the water damage and address ice dams. Ice and water shield along the eaves and in valleys helps keep it from happening again.",
        ],
        highlightsLabel: "What we offer",
        highlights: [
          "Leak detection and repair",
          "Ice dam removal",
          "Ice & water shield at eaves and valleys",
          "Ventilation checks to reduce ice dams",
        ],
        image: images.iceDamage,
      },
      {
        anchor: "fallen-trees",
        icon: "hard-hat",
        title: "Fallen trees and debris",
        lead: "Strong storms drop limbs and whole trees onto roofs, causing punctures, cracks and structural damage.",
        paragraphs: [
          "We remove the debris from your roof, secure the opening and handle everything from minor shingle repairs to structural restoration. For an open roof or active leak, call our 24/7 emergency line.",
        ],
        highlightsLabel: "What we handle",
        highlights: [
          "Debris removal from the roof",
          "Emergency tarping",
          "Deck and structural repairs",
          "Full roof replacement when needed",
        ],
        image: images.fallenTreeHouse,
        ctas: estimateCta,
      },
    ],
    faqs: [
      {
        question: "What should I do if my roof has storm damage?",
        answer: "First, stay safe and avoid any areas that might be dangerous. Then call us for an inspection. We'll assess the damage and give you a complete repair plan.",
      },
      {
        question: "How soon should I schedule a storm damage inspection?",
        answer: "As soon as possible after the storm. Waiting can turn small damage into bigger, more costly repairs.",
      },
      {
        question: "Will you help with my insurance claim?",
        answer: "Yes. We document the damage with photos and reports, work directly with your insurance company and meet the adjuster on site. Many customers pay only their deductible.",
      },
      {
        question: "How long does storm restoration take?",
        answer: "It depends on the extent of the damage. Minor repairs can often be finished within a few days, while larger restorations take longer. We keep you updated at each stage.",
      },
      {
        question: "What kinds of storm damage do you repair?",
        answer: "We handle damage from hail, wind, water, ice and fallen debris, from minor shingle repairs to complete roof replacement.",
      },
      {
        question: "Do you offer warranties on storm repairs?",
        answer: "Yes. Our labor is covered by a 10 year warranty, and Atlas Pinnacle Pristine shingles carry a lifetime manufacturer warranty.",
      },
    ],
    seo: {
      title: "Storm Damage Restoration in Maryland | Pineda's Roofing",
      description: "Storm damage roof repair in Maryland for hail, wind, ice and fallen trees. Free inspection, photo documentation and we meet your adjuster on site.",
    },
  },

  /* 8 ─────────────────────────────────────────────────────────────── */
  {
    slug: "gutter-installation-replacement",
    title: "Gutters",
    category: "exterior",
    icon: "rain",
    order: 8,
    summary: "Seamless gutter installation, repairs, cleaning and guards that keep water off your roof and away from your foundation.",
    hero: {
      eyebrow: "Gutters",
      heading: "Gutters that keep water away from your home",
      text: "Seamless gutters, guards, repairs and cleaning, fitted to your home to protect your roof, walls, landscaping and foundation.",
      image: images.gutterGuard,
    },
    sections: [
      {
        anchor: "overview",
        icon: "rain",
        title: "Your roof's drainage system",
        lead: "Gutters carry water off the roof and away from the house. When they clog, sag or leak, that water ends up in your fascia, walls and foundation.",
        paragraphs: [
          "We install, repair, clean and maintain gutters, and we look at them together with your roof. Rotted fascia, for example, is the most common reason gutters pull away from a house.",
        ],
        highlightsLabel: "What we offer",
        highlights: [
          "Gutter installation and replacement",
          "Gutter repair",
          "Gutter cleaning",
          "Gutter guards",
          "Maintenance plans",
          "Fascia and downspout work",
        ],
        image: images.gutterDownspout,
      },
      {
        anchor: "installation",
        icon: "ruler",
        title: "Installation and replacement",
        lead: "New gutters and guards measured and fitted to your home for the right flow and a clean look.",
        paragraphs: [
          "Choose aluminum, copper or vinyl gutters in styles that match your home. Custom-fit seamless runs mean fewer joints, fewer leaks and less maintenance.",
        ],
        highlightsLabel: "Your options",
        highlights: [
          "Seamless aluminum gutters",
          "Copper gutters",
          "Vinyl gutters",
          "Gutter guards to block debris",
        ],
        image: images.gutterInstall,
      },
      {
        anchor: "repair",
        icon: "wrench",
        title: "Gutter repair",
        lead: "Leaks, clogs, sagging and separated sections are fixable, and fixing them early prevents bigger damage.",
        paragraphs: [
          "We repair or replace damaged sections, rehang sagging runs and reseal joints so your gutters drain the way they should.",
        ],
        highlightsLabel: "Signs to watch for",
        highlights: [
          "Overflowing during rain",
          "Sagging or pulling away from the house",
          "Leaking seams and corners",
          "Cracks, holes or rust spots",
        ],
        image: images.gutterRepair,
      },
      {
        anchor: "cleaning-maintenance",
        icon: "leaf",
        title: "Cleaning and maintenance",
        lead: "Clean your gutters at least twice a year, usually spring and fall. Homes surrounded by trees may need it more often.",
        paragraphs: [
          "We clear leaves, dirt and debris with professional equipment that won't damage your gutters. Regular checks and small repairs keep the whole system working year-round.",
        ],
        highlightsLabel: "What's included",
        highlights: [
          "Leaves and debris removed",
          "Downspouts flushed and checked",
          "Minor repairs during the visit",
          "Gutter guard options",
        ],
        image: images.gutterCleaning,
        ctas: estimateCta,
      },
    ],
    faqs: [
      {
        question: "How often should gutters be cleaned?",
        answer: "At least twice a year, usually in spring and fall. Homes surrounded by trees may need more frequent cleaning to prevent clogs.",
      },
      {
        question: "What are the signs my gutters need repair?",
        answer: "Leaks, sagging, overflowing during rain, and visible damage like cracks or rust spots all mean your gutters need attention.",
      },
      {
        question: "Why is gutter maintenance important?",
        answer: "Regular maintenance extends the life of your gutters and prevents costly repairs. Working gutters protect your roof, walls and foundation from water damage.",
      },
      {
        question: "What types of gutters do you install?",
        answer: "We install aluminum, copper and vinyl gutters, including seamless systems, in styles to suit your home. We also install gutter guards.",
      },
      {
        question: "Do you warranty your gutter work?",
        answer: "Yes. We stand behind our installations, repairs and other gutter services with warranties.",
      },
    ],
    seo: {
      title: "Gutter Installation & Repair in Maryland | Pineda's Roofing",
      description: "Seamless gutter installation, gutter guards, repair and cleaning in Maryland. Protect your roof and foundation with a family-owned team. Free estimates.",
    },
  },

  /* 9 ─────────────────────────────────────────────────────────────── */
  {
    slug: "siding",
    title: "Siding",
    category: "exterior",
    icon: "layers",
    order: 9,
    summary: "Siding replacement and repair with roofing-grade flashing, plus storm damage claims and trim, soffit and fascia.",
    hero: {
      eyebrow: "Siding",
      heading: "Siding that keeps water out of your walls",
      text: "Siding is your home's largest exposed surface. We install and repair it with the same water management standards we bring to roofing.",
      image: images.sidingHome,
    },
    sections: [
      {
        anchor: "overview",
        icon: "layers",
        title: "Your home's first defense against water",
        lead: "When siding fails, the damage doesn't stay outside. It moves into sheathing, framing and insulation, where it grows quietly for years.",
        paragraphs: [
          "We bring roofing-grade standards to siding: correct water management behind the surface, proper flashing at every penetration and materials chosen for Maryland's climate.",
        ],
        highlightsLabel: "Why choose us",
        highlights: [
          "Roofing-grade flashing and details",
          "Roof and siding inspected together",
          "Licensed, insured & bonded, MHIC# 142024",
          "Family owned for over 30 years",
        ],
        image: images.stormHome,
      },
      {
        anchor: "replacement",
        icon: "hammer",
        title: "Full siding replacement",
        lead: "A complete tear-off and new siding, with a real look at the sheathing underneath.",
        paragraphs: [
          "Old siding often hides rot that a less careful contractor would side straight over. We find it and fix it first.",
          "You choose from vinyl, fiber cement, wood and engineered wood, and we walk through the trade-offs honestly.",
        ],
        highlightsLabel: "What's included",
        highlights: [
          "Full tear-off of old siding",
          "Sheathing inspection and repair",
          "Flashing at windows and doors",
          "Vinyl, fiber cement or wood options",
        ],
        image: images.sidingLap,
      },
      {
        anchor: "storm-damage",
        icon: "storm",
        title: "Storm damage and siding repair",
        lead: "Wind and hail damage siding as readily as roofing, and it's often covered under the same insurance claim.",
        paragraphs: [
          "We inspect the roof and siding together and document both for your insurance company. For a single failing section, we repair and blend where it makes sense, and tell you upfront if weathering makes an exact match impossible.",
        ],
        highlightsLabel: "What we offer",
        highlights: [
          "Roof and siding documented together",
          "Photo documentation for your insurer",
          "Repair and blending of damaged areas",
          "Honest advice on repair or replace",
        ],
      },
      {
        anchor: "trim-soffit-fascia",
        icon: "house",
        title: "Trim, soffit and fascia",
        lead: "The details that finish the job and seal the envelope around your home.",
        paragraphs: [
          "Rotted fascia is the most common reason gutters pull away from a house. We replace damaged trim, soffit and fascia so the whole exterior sheds water the way it should.",
        ],
        highlightsLabel: "What's included",
        highlights: [
          "Fascia board replacement",
          "Soffit repair and replacement",
          "Trim around windows and doors",
          "Gutters rehung on solid fascia",
        ],
        image: images.sidingTrim,
        ctas: estimateCta,
      },
    ],
    faqs: [
      {
        question: "Is siding damage covered by insurance?",
        answer: "Wind and hail damage siding as readily as roofing, and it is often covered under the same claim. We inspect and document the roof and siding together for your insurance company.",
      },
      {
        question: "Do I need full replacement, or can sections be repaired?",
        answer: "Storm damage, impact damage or a single failing section doesn't always mean replacing everything. We repair and blend where that makes sense, and tell you honestly when it doesn't.",
      },
      {
        question: "Why does what's behind the siding matter?",
        answer: "A full tear-off lets us inspect the sheathing underneath. That's where we often find rot that would otherwise be covered over and keep spreading.",
      },
      {
        question: "What siding materials do you install?",
        answer: "Vinyl, fiber cement, wood and engineered wood from manufacturers that stand behind their products.",
      },
      {
        question: "Will you match my existing siding?",
        answer: "When we repair rather than replace, we match as closely as the manufacturer's current range allows. Weathering means an exact match on older siding isn't always possible, and we'll tell you upfront.",
      },
    ],
    seo: {
      title: "Siding Installation & Repair in Maryland | Pineda's Roofing",
      description: "Siding replacement and repair in Maryland: vinyl, fiber cement and wood, storm damage claims, and trim, soffit and fascia. Family-owned for 30+ years.",
    },
  },

  /* 10 ────────────────────────────────────────────────────────────── */
  {
    slug: "windows",
    title: "Windows",
    category: "exterior",
    icon: "sun",
    order: 10,
    summary: "Energy-efficient replacement windows, full-frame or insert, installed correctly to lower your bills.",
    hero: {
      eyebrow: "Windows",
      heading: "Replacement windows that pay you back",
      text: "Single-pane glass, failed seals and rotted frames raise your energy bills every month. New windows cut that loss and add value at resale.",
      image: images.windowInstall,
    },
    sections: [
      {
        anchor: "overview",
        icon: "sun",
        title: "Stop losing money through your windows",
        lead: "Windows are where many Maryland homes quietly lose money, and the loss doesn't announce itself the way a roof leak does.",
        paragraphs: [
          "Replacement windows are one of the few home improvements that pay back twice: lower energy bills every month and a strong return at resale.",
          "Installation is where window performance really lives. A premium window installed poorly performs worse than a mid-range window installed correctly.",
        ],
        highlightsLabel: "What we install",
        highlights: [
          "Double and triple pane glass",
          "Low-E coatings",
          "Argon gas fill",
          "Warm-edge spacers",
          "In-home measurement",
          "Manufacturer and workmanship warranties",
        ],
        image: images.sidingHome,
      },
      {
        anchor: "full-frame",
        icon: "hammer",
        title: "Full-frame replacement",
        lead: "The old window and frame come out down to the rough opening, so nothing is hidden.",
        paragraphs: [
          "Any rot in the opening is fixed before the new unit goes in. The window is then sealed and flashed so water sheds away from the opening.",
        ],
        highlightsLabel: "What's included",
        highlights: [
          "Removal down to the rough opening",
          "Rot repaired before install",
          "Proper flashing and sealing",
          "Best choice when rot is suspected",
        ],
        image: images.windowInstall2,
      },
      {
        anchor: "insert",
        icon: "ruler",
        title: "Insert (pocket) replacement",
        lead: "When the existing frame is structurally sound, an insert is faster and less expensive.",
        paragraphs: [
          "The new window fits inside the existing frame, with no damage to surrounding trim or interior finishes. We'll tell you honestly which approach your windows actually need.",
        ],
        highlightsLabel: "Why choose it",
        highlights: [
          "Existing frame stays in place",
          "Faster installation",
          "Lower cost than full-frame",
          "Less disruption inside your home",
        ],
        image: images.newWindow,
      },
      {
        anchor: "new-construction",
        icon: "hard-hat",
        title: "New construction and additions",
        lead: "Windows installed as part of the whole building envelope, coordinated with your builder.",
        paragraphs: [
          "We work alongside your contractor's schedule and meet egress, tempering and energy requirements on every opening.",
        ],
        highlightsLabel: "How we work",
        highlights: [
          "Coordinated with your builder",
          "Egress requirements met",
          "Tempered glass where code requires",
          "Energy code requirements met",
        ],
        ctas: estimateCta,
      },
    ],
    faqs: [
      {
        question: "Full-frame or insert replacement: which do I need?",
        answer: "Full-frame removes the old window and frame down to the rough opening, which lets us fix any rot. Insert replacement keeps the existing frame and is faster and less expensive when that frame is sound. We'll tell you honestly which one your windows need.",
      },
      {
        question: "How much will new windows lower my energy bills?",
        answer: "It depends on what you have now. Single-pane glass, failed seals and rotted frames drive heating and cooling costs up every month, so replacing them typically pays back in lower bills and at resale.",
      },
      {
        question: "What happens if you find rot during installation?",
        answer: "We fix any deterioration in the opening before the new window goes in, rather than covering it over.",
      },
      {
        question: "How long does window replacement take?",
        answer: "Most homes are done within a day or two, depending on the number of windows. We confirm the schedule at the assessment.",
      },
      {
        question: "Is there a warranty?",
        answer: "Yes. Manufacturer warranties cover the windows, and our own workmanship warranty covers every installation.",
      },
    ],
    seo: {
      title: "Window Replacement in Maryland | Pineda's Roofing",
      description: "Energy-efficient window replacement in Maryland: full-frame and insert installs with Low-E, argon-filled glass. Free in-home measurement and written quote.",
    },
  },

  /* 11 ────────────────────────────────────────────────────────────── */
  {
    slug: "chimneys",
    title: "Chimneys",
    category: "exterior",
    icon: "building",
    order: 11,
    summary: "Chimney flashing, repointing, crowns and caps fixed by roofers, so the leak actually stops.",
    hero: {
      eyebrow: "Chimneys",
      heading: "Chimney repair that stops roof leaks",
      text: "More roof leaks start at the chimney than anywhere else. As roofers first, we fix the flashing and the masonry together.",
      image: images.chimneyFlashing2,
    },
    sections: [
      {
        anchor: "overview",
        icon: "building",
        title: "Most roof leaks start at the chimney",
        lead: "Your chimney is the largest opening in the roof, and it moves differently than the structure around it. Its flashing is the most common failure we find.",
        paragraphs: [
          "Because we're roofers first, we treat the chimney as part of the roof system. Fixing the masonry without correcting the flashing, or the reverse, leaves the leak in place.",
        ],
        highlightsLabel: "Signs to watch for",
        highlights: [
          "Water stains near the chimney",
          "White chalky residue on the brick",
          "Crumbling or missing mortar",
          "Cracks in the crown",
          "Rusted or lifting flashing",
          "Stains after wind-driven rain",
        ],
        image: images.chimney,
      },
      {
        anchor: "flashing",
        icon: "droplets",
        title: "Flashing repair and replacement",
        lead: "Proper step and counter-flashing, cut into the mortar joint the way it should be, not surface-caulked and hoped for.",
        paragraphs: [
          "We trace where water actually enters, which is often several feet from the stain inside. Then we tie the new flashing correctly into the surrounding shingles.",
        ],
        highlightsLabel: "What's included",
        highlights: [
          "Step flashing at every course",
          "Counter-flashing cut into mortar",
          "Water path traced to the source",
          "Tied into the surrounding shingles",
        ],
        image: images.chimneyFlashing,
      },
      {
        anchor: "repointing-crown",
        icon: "hammer",
        title: "Repointing and crown repair",
        lead: "Freeze-thaw cycles open hairline joints a little more every winter, and a cracked crown lets water into the chimney's core.",
        paragraphs: [
          "We grind out failing mortar to the correct depth and replace it with a mix matched for color, texture and strength. Cracked crowns are sealed, or rebuilt with a proper overhang and drip edge when they're past repair.",
        ],
        highlightsLabel: "What we offer",
        highlights: [
          "Mortar ground out to correct depth",
          "Color, texture and strength matched",
          "Crown crack sealing",
          "Full crown rebuilds",
        ],
        image: images.masonryBrick,
      },
      {
        anchor: "caps-waterproofing",
        icon: "shield",
        title: "Caps, dampers and waterproofing",
        lead: "Small upgrades that keep out rain, debris and animals, and prevent much costlier problems.",
        paragraphs: [
          "A chimney cap keeps rain, leaves, birds and squirrels out of the flue. Our breathable waterproofing sheds water but lets trapped moisture escape. The wrong sealer traps it and speeds up the damage.",
        ],
        highlightsLabel: "What we install",
        highlights: [
          "Chimney caps",
          "Breathable waterproofing",
          "Damper installation",
          "Follow-up after the next heavy rain",
        ],
        image: images.chimneyCap,
        ctas: estimateCta,
      },
    ],
    faqs: [
      {
        question: "Why do so many roof leaks start at the chimney?",
        answer: "The chimney is the largest opening in the roof and it moves differently from the structure around it. When its flashing fails, it becomes the most common point of water entry we find.",
      },
      {
        question: "Can you fix the leak without repairing the masonry?",
        answer: "Sometimes, but often not. New flashing on failing masonry frequently leaves the leak in place, so we find the actual entry point before recommending a fix.",
      },
      {
        question: "What is chimney repointing?",
        answer: "We grind out failing mortar to the correct depth and replace it with mortar matched for color, texture and strength. It stops freeze-thaw cycles from widening the joints.",
      },
      {
        question: "What does the chimney crown do?",
        answer: "It's the concrete cap at the top of the chimney. Cracks in it let water into the chimney's core, where damage stays hidden until it's expensive.",
      },
      {
        question: "Do I need a chimney cap?",
        answer: "A cap keeps rain, leaves, birds and squirrels out of the flue. It's inexpensive and prevents a long list of costlier problems.",
      },
      {
        question: "How quickly should I act on stains near the chimney?",
        answer: "Right away. A stain means water is already inside the structure, and the longer it runs, the more framing and finishes it affects.",
      },
    ],
    seo: {
      title: "Chimney Repair & Flashing in Maryland | Pineda's Roofing",
      description: "Chimney repair in Maryland: flashing, repointing, crown repair, caps and waterproofing done by roofers who stop the leak at its source. Free inspection.",
    },
  },

  /* 12 ────────────────────────────────────────────────────────────── */
  {
    slug: "masonry",
    title: "Masonry",
    category: "exterior",
    icon: "hammer",
    order: 12,
    summary: "Repointing, brick and stone repair, historic masonry and structural work with properly matched mortar.",
    hero: {
      eyebrow: "Masonry",
      heading: "Brick and stone repair done the right way",
      text: "Brick and stone last for generations, but the mortar between them doesn't. We repoint, repair and rebuild with methods that suit your building.",
      image: images.masonryBrick,
    },
    sections: [
      {
        anchor: "overview",
        icon: "hammer",
        eyebrow: "Brick and stone specialists",
        title: "Mortar is made to be replaced",
        lead: "Mortar is designed to fail before the brick does, so it can be replaced without touching the structure. The key is catching it in time.",
        paragraphs: [
          "With 30+ years serving Maryland, we handle everything from repointing to full structural repair. We use materials and methods suited to the age of the building.",
        ],
        highlightsLabel: "What we offer",
        highlights: [
          "Repointing",
          "Brick and stone repair",
          "Mortar analysis and matching",
          "Historic masonry",
          "Structural repair",
          "Written scope with photos",
        ],
        image: images.masonWall,
      },
      {
        anchor: "signs",
        icon: "clipboard",
        title: "Signs your masonry needs attention",
        lead: "Some masonry problems are weathering and some are movement. They look different and need different fixes.",
        paragraphs: [
          "Scrape a mortar joint with a key. If it crumbles, the joints have lost their weather resistance. Diagonal stair-step cracks or a wall that's no longer plumb are structural, so have them checked promptly.",
        ],
        highlightsLabel: "Signs to watch for",
        highlights: [
          "Crumbling or recessed mortar",
          "White chalky efflorescence",
          "Spalling or flaking brick faces",
          "Stair-step cracks in mortar joints",
          "Bulging or leaning sections",
          "Missing mortar in sections",
        ],
        image: images.chimney,
      },
      {
        anchor: "freeze-thaw",
        icon: "thermometer",
        title: "How Maryland winters destroy mortar",
        lead: "A hairline crack lets rain into the joint. Overnight it freezes, expands roughly 9% and widens the crack from the inside.",
        paragraphs: [
          "Thaw, refill, refreeze. Repeat that through enough winters and a cosmetic hairline becomes a structural problem. Repointing restores the joint's weather resistance and stops the cycle.",
        ],
        highlightsLabel: "Why it matters",
        highlights: [
          "Damage starts out of sight",
          "Each winter widens the joints",
          "Repointing stops the cycle",
          "Protects the brick itself",
        ],
        image: images.iceDamage,
      },
      {
        anchor: "historic-structural",
        icon: "award",
        title: "Historic and structural work",
        lead: "Modern high-strength mortar on soft historic brick causes spalling. We use lime-based mixes where the original construction calls for it.",
        paragraphs: [
          "We work under CHAP review in Baltimore City and within Frederick's historic district, using period-appropriate methods. Our work runs from cosmetic repointing to foundation and load-bearing repair.",
        ],
        highlightsLabel: "What's included",
        highlights: [
          "Color, texture and strength matched",
          "Lime-based mortar for historic brick",
          "CHAP review work in Baltimore City",
          "Foundation and load-bearing repair",
        ],
        image: images.masonHistoric,
        ctas: estimateCta,
      },
    ],
    faqs: [
      {
        question: "How do I know if my mortar needs repointing?",
        answer: "If mortar crumbles when scraped with a key, has receded behind the face of the brick or is missing in places, the joints have lost their weather resistance. Water is then moving through the wall instead of being shed by it.",
      },
      {
        question: "What is efflorescence, and should I worry about it?",
        answer: "White chalky deposits mean water is moving through the masonry and carrying salts to the surface. The stain itself is cosmetic, but the moisture behind it usually isn't.",
      },
      {
        question: "Can you match my existing mortar?",
        answer: "Yes. We match color, texture and, most importantly, strength to the original construction. On soft historic brick we use lime-based mixes to prevent spalling.",
      },
      {
        question: "Do you work on historic properties?",
        answer: "Yes. We work under CHAP review in Baltimore City and within Frederick's historic district, using period-appropriate materials and methods.",
      },
      {
        question: "Do you repair structural cracks or only cosmetic damage?",
        answer: "Both. Stair-step cracking means movement rather than weathering and needs a different approach, so we establish which one you have before quoting anything.",
      },
      {
        question: "Is masonry damage covered by insurance?",
        answer: "Storm or impact damage may be. Wear from age and weather generally isn't. We document what we find and what caused it so you can file a claim if one applies.",
      },
    ],
    seo: {
      title: "Masonry & Brick Repair in Maryland | Pineda's Roofing",
      description: "Masonry repair in Maryland: repointing, brick and stone repair, historic lime mortar and structural work. Written scope with photos before we start.",
    },
  },

  /* 13 ────────────────────────────────────────────────────────────── */
  {
    slug: "hardscaping",
    title: "Hardscaping",
    category: "exterior",
    icon: "ruler",
    order: 13,
    summary: "Paver patios, walkways, retaining walls, driveways and steps built on a proper base with drainage planned first.",
    hero: {
      eyebrow: "Hardscaping",
      heading: "Patios, walkways and walls built to last",
      text: "A well-built patio changes how you use your home. We build hardscapes with the same structural discipline we bring to roofing.",
      image: images.paversLaying,
    },
    sections: [
      {
        anchor: "overview",
        icon: "ruler",
        title: "Your outdoor living specialists",
        lead: "A good patio is the difference between a backyard you look at and one you actually spend time in.",
        paragraphs: [
          "Most failed patios we're called to fix didn't fail at the surface. They failed underneath, where the base was rushed or drainage was never planned. Our work starts below grade, where it counts.",
        ],
        highlightsLabel: "Why choose us",
        highlights: [
          "Base built for freeze-thaw winters",
          "Drainage planned before excavation",
          "Design consultation included",
          "Permits handled with your county",
          "Licensed, insured & bonded, MHIC# 142024",
          "Family owned for over 30 years",
        ],
        image: images.paverInstall,
      },
      {
        anchor: "patios-walkways",
        icon: "layers",
        title: "Paver patios and walkways",
        lead: "Properly excavated and compacted so surfaces stay level through Maryland's freeze-thaw winters.",
        paragraphs: [
          "We pick paver styles, colors and laying patterns to suit your house, not a catalog. Edge restraint stops the lateral spread that makes patio edges go wavy after a few years.",
        ],
        highlightsLabel: "What's included",
        highlights: [
          "Excavation and grading",
          "Compacted base",
          "Paver laying and cutting",
          "Jointing, edge restraint and cleanup",
        ],
        image: images.paversOnSand,
      },
      {
        anchor: "walls-driveways-steps",
        icon: "hard-hat",
        title: "Retaining walls, driveways and steps",
        lead: "Retaining walls built for the actual load, and driveways, steps and stoops made to be safe and last.",
        paragraphs: [
          "Retaining walls get proper drainage and geogrid reinforcement, and we manage permits where wall height or drainage requires them.",
          "Paver and stone driveways outlast asphalt and look better. On steps, correct rise and run separates comfortable stairs from trip hazards.",
        ],
        highlightsLabel: "What we build",
        highlights: [
          "Retaining walls with geogrid",
          "Drainage behind every wall",
          "Paver and stone driveways",
          "Front steps and stoops",
          "Correct rise and run on steps",
          "Permits managed with your county",
        ],
        image: images.retainingWall,
        ctas: estimateCta,
      },
    ],
    faqs: [
      {
        question: "How long should a paver patio last?",
        answer: "The base decides it. A patio on a properly excavated and compacted base stays level through freeze-thaw winters for decades, while one on a rushed base starts moving within a few years.",
      },
      {
        question: "Why do some patios sink or shift?",
        answer: "Almost always the base. The failed patios we're called to fix nearly always failed underneath, where the base was rushed or drainage was never planned.",
      },
      {
        question: "Do I need a permit for a retaining wall?",
        answer: "Often, depending on the wall height and drainage impact. We manage the permitting through your county from start to finish.",
      },
      {
        question: "How long does a typical project take?",
        answer: "Most residential patios take about a week, from site assessment and excavation through base work, paver laying and final cleanup.",
      },
      {
        question: "Do you handle drainage?",
        answer: "Yes, and we plan it before excavation rather than adding it afterward. Drainage is what separates a hardscape that lasts from one that doesn't.",
      },
    ],
    seo: {
      title: "Hardscaping & Paver Patios in Maryland | Pineda's Roofing",
      description: "Paver patios, walkways, retaining walls, driveways and steps in Maryland, built on a proper base with drainage planned first. Design consultation included.",
    },
  },
];
