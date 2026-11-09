import type { Post } from "../types";
import { images } from "./images.ts";

/*
 * Blog posts. Each post is about real service areas (`areas`) and is linked
 * from those city/county pages. Headings use plain service + place terms.
 * Sanity documents of type "post" replace or add to these.
 */
export const fallbackPosts: Post[] = [
  {
    slug: "roof-replacement-baltimore-county-what-to-expect",
    title: "Roof Replacement in Baltimore County: What to Expect",
    excerpt:
      "From the free inspection to the final walkthrough, here's how a roof replacement in Baltimore County works, and what to ask any roofing contractor before you sign.",
    date: "2026-11-09",
    areas: ["baltimore-county", "towson", "catonsville", "baltimore-city"],
    service: "roof-replacement",
    image: images.aerialNewShingleRoof,
    sections: [
      {
        heading: "It starts with a free roof inspection",
        paragraphs: [
          "A good roof replacement in Baltimore County starts on the roof, not on the phone. We check the shingles, flashing, ventilation, gutters and, from the attic, the decking, then give you a written estimate with photos of what we found.",
          "Sometimes the answer is a repair, not a new roof. If that's the case, we'll tell you.",
        ],
      },
      {
        heading: "Tear-off and decking",
        paragraphs: [
          "Many Baltimore County homes were built from the 1950s through the 1980s, and some have been re-roofed more than once. Once the old roof comes off, we can see the decking, the wood the shingles are nailed to, and replace any boards that are soft or rotted.",
          "Ask any roofing contractor in Baltimore County how they price decking repairs before the job starts, so there are no surprises.",
        ],
      },
      {
        heading: "What goes on a new roof",
        paragraphs: [
          "A new shingle roof is a system: synthetic underlayment over the whole deck, ice and water shield at the eaves and valleys, new flashing at walls and chimneys, ridge ventilation and the shingles themselves. We install Atlas Pinnacle Pristine shingles.",
          "Northern Baltimore County gets more snow and ice than the communities near the water, which makes ice and water shield and good ventilation especially important there.",
        ],
      },
      {
        heading: "Flat roofs on Baltimore rowhomes",
        paragraphs: [
          "Rowhomes in Dundalk, Essex, Towson and Baltimore City often have flat or low-slope roofs in back. Those get a different system, a modified bitumen or single-ply membrane, with drainage planned so water doesn't sit.",
        ],
      },
      {
        heading: "How to choose a roofing contractor in Baltimore County",
        paragraphs: [
          "Check that the contractor holds a Maryland Home Improvement Commission (MHIC) license. You can look up any license number on the Maryland Department of Labor website. Ours is MHIC# 142024.",
          "Ask for a written estimate, photos of the problems they found, and the warranty in writing: both the manufacturer's warranty on the materials and the contractor's warranty on the labor.",
        ],
      },
    ],
    seo: {
      title: "Roof Replacement in Baltimore County: What to Expect | Pineda's Roofing",
      description: "How a roof replacement in Baltimore County works, from free inspection to cleanup, plus what to ask a roofing contractor before you sign. MHIC# 142024.",
    },
  },
  {
    slug: "solar-washington-dc-roof-first",
    title: "Going Solar in Washington, DC? Start With the Roof",
    excerpt:
      "Solar panels last for decades, so the roof under them has to as well. Here's what a solar company in Washington, DC should check before the first panel goes on.",
    date: "2026-11-09",
    areas: ["washington-dc"],
    service: "solar-panel-installation",
    sections: [
      {
        heading: "Why the roof comes first",
        paragraphs: [
          "Solar panels are built to last decades. If the roof under them only has a few years left, you'll pay to remove the panels, replace the roof and put the panels back, long before the system has paid for itself.",
          "That's why, as roofers, we inspect the roof before we design any solar system, and we tell you honestly whether it's ready.",
        ],
      },
      {
        heading: "Solar on flat rowhouse roofs in Washington, DC",
        paragraphs: [
          "Many D.C. rowhouses have flat or low-slope roofs with good sun. Before solar goes on, we check the membrane, the drains and slope, the parapet walls and the flashing, because those are the parts that will sit under the panels for years.",
        ],
      },
      {
        heading: "Historic districts",
        paragraphs: [
          "In D.C.'s historic districts, solar panels visible from the street can need review by the city's Historic Preservation Office. On many flat rowhouse roofs, panels set behind the parapet are out of view, and we plan the layout with that in mind.",
        ],
      },
      {
        heading: "What to ask a solar company in Washington, DC",
        paragraphs: [
          "Ask who checks the roof, who seals the roof mounts, and what happens if the roof leaks around a mount later. Ask how the system is sized to your electric use, and what permits, inspections and utility approval are needed before it turns on.",
          "D.C. has its own solar programs and incentives, and they change over time. Ask what currently applies to your home.",
        ],
      },
    ],
    seo: {
      title: "Solar in Washington, DC: Why the Roof Comes First | Pineda's Roofing",
      description: "What a solar company in Washington, DC should check before installing panels: roof condition, flat rowhouse roofs, historic districts and the right questions to ask.",
    },
  },
];
