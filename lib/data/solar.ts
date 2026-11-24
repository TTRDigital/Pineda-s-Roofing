import type { Faq, Seo } from "../types";

/*
 * Solar market pages (/solar/maryland, /solar/washington-dc), from Roberto's
 * "Solar content packet". Program facts and links are the official ones from
 * the packet; check them against the program sites before changing wording.
 */

export type SolarLink = { label: string; href: string };
export type SolarSection = { heading: string; paragraphs: string[]; highlights?: string[]; links?: SolarLink[] };

export type SolarMarket = {
  slug: "maryland" | "washington-dc";
  /** Shown in the menu and the market chooser. */
  name: string;
  /** Value the assessment form carries (must match solarMarkets in lib/lead-options.ts). */
  formMarket: "Maryland" | "Washington, DC";
  chooserText: string;
  hero: { eyebrow: string; heading: string; text: string };
  sections: SolarSection[];
  faqs: Faq[];
  seo: Seo;
};

const roofSection: SolarSection = {
  heading: "If your roof needs work first",
  paragraphs: [
    "Solar panels stay on a roof for decades, so the roof under them has to be ready. We check your roof during the solar assessment and tell you honestly if it needs a repair or a replacement before the panels go on.",
    "Roofing work is optional and priced separately from solar.",
  ],
  links: [
    { label: "Roof replacement", href: "/services/roof-replacement" },
    { label: "Roof repair", href: "/services/roof-repair" },
  ],
};

export const solarMarkets: SolarMarket[] = [
  {
    slug: "maryland",
    name: "Maryland",
    formMarket: "Maryland",
    chooserText: "A Power Purchase Agreement (PPA), plus the Maryland Solar Access Program rebate of $750 per kW DC, up to $7,500, for income-qualified households.",
    hero: {
      eyebrow: "Solar · Maryland",
      heading: "Maryland solar with $0 down",
      text: "Explore a Power Purchase Agreement (PPA) with Pineda's Roofing. With a PPA, you pay for the electricity the system generates. Request a solar assessment and our solar operations team will walk you through your roof, pricing and available offers.",
    },
    sections: [
      {
        heading: "How a Power Purchase Agreement (PPA) works",
        paragraphs: [
          "With a PPA, you don't buy the solar panels. You pay for the electricity the system on your roof generates.",
          "Request a solar assessment and our solar operations team will walk you through your roof, pricing and available offers.",
        ],
        highlights: ["$0 down", "You pay for the electricity the system generates", "Roof checked before installation"],
      },
      {
        heading: "Maryland Solar Access Program rebate",
        paragraphs: [
          "The Maryland Energy Administration's FY27 program specifies $750 per kW DC of installed solar capacity, up to $7,500. Eligible projects can use a Power Purchase Agreement (PPA).",
          "The rebate is only for income-qualified households: household income up to 150% of Maryland's state median income, based on household size. Funding is first-come, first-served.",
          "The program requires an approved participating contractor and a rebate reservation before installation. Rebate projects are installed through our partner GoGreen Solutions, an approved program contractor.",
          "Eligibility and program rules are set by the Maryland Energy Administration. Read the official details below.",
        ],
        highlights: ["$750 per kW DC, up to $7,500", "Income-qualified households only", "Up to 150% of state median income", "First-come, first-served", "Reservation required before installation", "Installed through GoGreen Solutions, an approved program contractor"],
        links: [
          { label: "Check Maryland solar rebate eligibility and apply", href: "https://energy.maryland.gov/Residential/Pages/incentives/Maryland-Solar-Access-Program.aspx" },
          {
            label: "Read the official FY27 rebate rules (PDF)",
            href: "https://energy.maryland.gov/residential/SiteAssets/Pages/incentives/Maryland-Solar-Access-Program/FY27%20MSAP%20Funding%20Opportunity%20Announcement%20-%20Issued%207.29.26%20v2.pdf",
          },
          { label: "Official FY27 MSAP program and funding documents", href: "https://energy.maryland.gov/Residential/Pages/incentives/Maryland-Solar-Access-Program.aspx" },
        ],
      },
      roofSection,
    ],
    faqs: [
      {
        question: "Who owns the solar panels?",
        answer: "With a Power Purchase Agreement (PPA), you don't buy the panels. You pay for the electricity the system generates. Our solar operations team explains the agreement before you decide.",
      },
      {
        question: "How does billing work with a PPA?",
        answer: "You pay for the electricity the solar system generates. During your assessment we walk you through the pricing and the offers available for your home.",
      },
      {
        question: "Who qualifies for the Maryland Solar Access Program rebate?",
        answer:
          "The FY27 program is only for income-qualified households, with household income up to 150% of Maryland's state median income based on household size. Funding is first-come, first-served, and a rebate reservation is required before installation. Rebate projects are installed through our partner GoGreen Solutions, an approved program contractor. Check your eligibility and the full rules on the Maryland Energy Administration's site.",
      },
      {
        question: "What if my roof needs work?",
        answer: "We check your roof during the assessment. If it needs a repair or a replacement before solar, we tell you, and roofing work is priced separately.",
      },
      {
        question: "What do I need for a solar assessment?",
        answer: "Your property's ZIP code, a recent electric bill, and the age of your roof if you know it. Tell us if you also need roofing work. If you plan to apply for the rebate, the program asks for documents showing you meet its requirements.",
      },
    ],
    seo: {
      title: "Maryland Solar with $0 Down | PPA & MSAP | Pineda's Roofing",
      description: "$0-down solar in Maryland with a Power Purchase Agreement, plus the MSAP rebate of $750 per kW DC, up to $7,500, for income-qualified households.",
    },
  },
  {
    slug: "washington-dc",
    name: "Washington, DC",
    formMarket: "Washington, DC",
    chooserText: "A solar agreement with no upfront solar cost, no credit check and no monthly solar payment for qualifying homeowners, plus DC Solar for All.",
    hero: {
      eyebrow: "Solar · Washington, DC",
      heading: "Relief of your utility bill",
      text: "Explore solar for your Washington, DC home with Pineda's Roofing. Request an assessment and our solar operations team will walk you through your options and how the solar agreement could affect your Pepco bill.",
    },
    sections: [
      {
        heading: "Solar agreement",
        paragraphs: [
          "Qualifying homeowners can explore an option with no upfront solar cost, no credit check, and no monthly solar payment. The solar provider owns the panels. Optional roofing and other work are priced separately.",
        ],
        highlights: ["No upfront solar cost", "No credit check", "No monthly solar payment", "The solar provider owns the panels"],
      },
      {
        heading: "DC Solar for All",
        paragraphs: [
          "The District's Solar for All program helps eligible households access rooftop or community solar. According to the DC Department of Energy & Environment (DOEE), Solar for All participants can expect 50% savings on their electricity bills over 15 years.",
          "That is a benefit of the DC Solar for All program for eligible households, not a savings promise for every solar customer.",
          "Eligibility and program details are set by the District. Read them on the official site.",
        ],
        links: [
          { label: "Learn about DC Solar for All", href: "https://doee.dc.gov/solarforall" },
          { label: "Check DC Solar for All eligibility", href: "https://solarforall.doee.dc.gov/" },
        ],
      },
      roofSection,
    ],
    faqs: [
      {
        question: "Who owns the solar panels?",
        answer: "With the solar agreement, the solar provider owns the panels.",
      },
      {
        question: "How does billing work?",
        answer:
          "Qualifying homeowners have no upfront solar cost and no monthly solar payment. During your assessment, our solar operations team walks you through how the solar agreement could affect your Pepco bill.",
      },
      {
        question: "Do I need good credit?",
        answer: "The solar agreement option for qualifying homeowners has no credit check.",
      },
      {
        question: "What if my roof needs work?",
        answer: "We check your roof during the assessment. If it needs a repair or a replacement before solar, we tell you. Optional roofing and other work are priced separately.",
      },
      {
        question: "What do I need for a solar assessment?",
        answer: "Your property's ZIP code, a recent Pepco bill, and the age of your roof if you know it. Tell us if you also need roofing work.",
      },
    ],
    seo: {
      title: "Solar in Washington, DC | Utility Bill Relief | Pineda's Roofing",
      description: "Solar for Washington, DC homes: no upfront solar cost, no credit check and no monthly solar payment for qualifying homeowners, plus DC Solar for All.",
    },
  },
];
