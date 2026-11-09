import type { Location } from "../types";

/*
 * County pages and the new city pages for the priority service areas.
 * Tier 1 (main focus): Baltimore County, Baltimore City, Howard, Anne Arundel, Prince George's.
 * Tier 2: Carroll, Frederick, Montgomery. Washington, D.C. is mainly for solar.
 * Every page has its own local content; headings use plain service + place
 * terms ("Roof replacement in Bowie") the way people search.
 */

export const countyPages: Location[] = [
  /* ── Tier 1 ─────────────────────────────────────────────────────── */
  {
    slug: "baltimore-county",
    name: "Baltimore County",
    kind: "county",
    tier: 1,
    state: "MD",
    featured: true,
    lead: "Pineda's Roofing is a family-owned roofing contractor in Baltimore County, with roof replacement, roof repair, storm damage help and solar installation from Towson to Catonsville and Owings Mills.",
    paragraphs: [
      "Baltimore County wraps around the city, and its homes cover nearly every era: brick rowhomes and townhomes in Dundalk and Essex, post-war Cape Cods and ranchers in Parkville and Catonsville, and newer subdivisions in Owings Mills and Perry Hall.",
      "That variety is why we inspect before we quote. As a roofing contractor in Baltimore County, we see flat rowhome roofs that pond water, original 1950s decking under two layers of shingles, and newer roofs with ventilation problems, often on the same street.",
    ],
    highlights: [
      "Free roof inspections in Baltimore County",
      "Shingle and flat roof replacement",
      "Rowhome and townhome roofing",
      "Storm damage and insurance claim help",
      "Gutters and chimney flashing",
      "Solar installation",
    ],
    neighborhoods: ["Towson", "Catonsville", "Owings Mills", "Pikesville", "Parkville", "Perry Hall", "Dundalk", "Essex", "Cockeysville", "Randallstown"],
    sections: [
      {
        heading: "Roof replacement in Baltimore County",
        paragraphs: [
          "Most roof replacements we do in Baltimore County are on homes from the 1950s through the 1980s. Tear-off often uncovers old plank or plywood decking that needs repair, so we inspect the deck before any new shingles go on and show you photos of what we find.",
          "Every new shingle roof gets synthetic underlayment, ice and water shield at the eaves and valleys, and proper ridge ventilation. Northern Baltimore County sees more snow and ice than the communities near the water, and that protection is what stops ice dam leaks.",
        ],
      },
      {
        heading: "Flat roofs and rowhome roofing in Baltimore County",
        paragraphs: [
          "Rowhomes and townhomes in Dundalk, Essex and Towson's Rodgers Forge often have flat or low-slope roofs in back. Water that sits for days finds every weak seam, so we plan drainage first and then install a modified bitumen or single-ply system built to shed it.",
          "Near Back River and Middle River, wind off the water lifts shingles and drives rain under flashing. We check edges, flashing and fasteners closely on waterfront homes.",
        ],
      },
      {
        heading: "Storm damage roof repair in Baltimore County",
        paragraphs: [
          "Summer thunderstorms bring down limbs from the county's mature trees, and nor'easters drive wind-blown rain. After a storm we inspect for free, photograph the damage and work with your insurance adjuster on the claim.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you replace flat roofs on Baltimore County rowhomes?",
        answer: "Yes. We repair and replace flat and low-slope roofs on rowhomes and townhomes across Baltimore County, including the drainage, flashing and parapet details where most leaks start.",
      },
      {
        question: "How fast can a roofing contractor in Baltimore County come out after a storm?",
        answer: "Call us as soon as you can. We prioritize active leaks and open roofs, and we inspect, photograph and protect the roof before the insurance adjuster visits.",
      },
    ],
    seo: {
      title: "Roofing Contractor in Baltimore County, MD | Pineda's Roofing",
      description: "Family-owned roofing contractor in Baltimore County: roof replacement, flat roofs, storm damage repair and solar from Towson to Catonsville. MHIC# 142024.",
    },
  },
  {
    slug: "baltimore-city",
    name: "Baltimore City",
    kind: "county",
    tier: 1,
    state: "MD",
    heading: "Roofing Contractor in Baltimore, MD",
    featured: true,
    lead: "Rowhouse roofs are their own trade. Pineda's Roofing is a roofing contractor in Baltimore for flat roof replacement, leak repair, roof decks and solar on homes across the city.",
    paragraphs: [
      "Most Baltimore homes are rowhouses with flat or low-slope roofs, parapet walls and shared party walls. A leak at one seam or drain can show up two rooms away, or in your neighbor's house.",
      "We find where water actually gets in before we fix anything. That means checking drains and scuppers, parapet and chimney flashing, roof hatches and skylights, not just the spot on your ceiling.",
    ],
    highlights: [
      "Free roof inspections in Baltimore",
      "Rowhouse flat roof replacement",
      "Parapet, drain and scupper repair",
      "Roof deck and hatch flashing",
      "Storm damage and insurance claim help",
      "Solar on flat rowhouse roofs",
    ],
    neighborhoods: ["Canton", "Fells Point", "Federal Hill", "Hampden", "Roland Park", "Charles Village", "Highlandtown", "Mount Vernon", "Locust Point", "Hamilton"],
    sections: [
      {
        heading: "Flat roof replacement in Baltimore",
        paragraphs: [
          "When a Baltimore rowhouse roof is replaced, we tear off down to the deck, fix soft or rotted boards and rebuild the slope toward the drain so water leaves instead of pooling. Then we install a modified bitumen or single-ply membrane with the seams and flashing done to last.",
          "Parapet walls and party-wall edges are where most rowhouse roofs fail. We flash and cap them properly as part of the job, not as an add-on.",
        ],
      },
      {
        heading: "Roof decks, hatches and older homes in Baltimore",
        paragraphs: [
          "Rooftop decks are popular in Canton, Federal Hill and Locust Point. Every post and penetration through the roof is a possible leak, so we flash them and make sure the roof under the deck can still drain.",
          "In older neighborhoods like Roland Park and Charles Village, steep roofs, dormers and chimneys need careful flashing work. In city historic districts, exterior changes can need review first, and we help you plan around it.",
        ],
      },
      {
        heading: "Solar company in Baltimore",
        paragraphs: [
          "A flat rowhouse roof can be a good place for solar, but only if the roof under the panels will last as long as they do. We check and, if needed, replace the roof first, so you don't pay to remove panels for a roof repair a few years later.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you fix a leak in a Baltimore rowhouse without replacing the whole roof?",
        answer: "Often, yes. Many rowhouse leaks come from one drain, seam or parapet flashing. We find the source, show you photos and tell you honestly whether a repair or a replacement makes more sense.",
      },
      {
        question: "Do you install solar on Baltimore rowhouses?",
        answer: "Yes. We look at the roof's condition, shading and layout first, and we make sure the roof is ready before panels go on.",
      },
    ],
    seo: {
      title: "Roofing Contractor in Baltimore, MD | Flat Roofs & Rowhouses | Pineda's Roofing",
      description: "Roofing contractor in Baltimore City: rowhouse flat roof replacement, leak repair, roof decks and solar. Family-owned, MHIC# 142024. Free inspections.",
    },
  },
  {
    slug: "howard-county",
    name: "Howard County",
    kind: "county",
    tier: 1,
    state: "MD",
    featured: true,
    lead: "Pineda's Roofing is a family-owned roofing contractor in Howard County for roof replacement, repairs, storm damage and solar in Columbia, Ellicott City, Elkridge and Clarksville.",
    paragraphs: [
      "Howard County ranges from historic stone homes in Ellicott City to Columbia's planned villages and the larger, newer homes in Clarksville and Fulton. Each comes with its own roofing needs and, often, its own community review rules.",
      "Many Columbia and Elkridge homes and townhomes are now on their second or third roof. In western Howard County, bigger homes have complex roofs with many valleys, dormers and walls, and that's where flashing details matter most.",
    ],
    highlights: [
      "Free roof inspections in Howard County",
      "Product details for HOA and village approvals",
      "Complex roofs with valleys and dormers",
      "Storm damage and insurance claim help",
      "Gutters sized for heavy rain",
      "Solar installation",
    ],
    neighborhoods: ["Columbia", "Ellicott City", "Elkridge", "Clarksville", "Fulton", "Savage", "Highland", "Woodstock", "Glenelg"],
    sections: [
      {
        heading: "Roof replacement in Howard County",
        paragraphs: [
          "Before a roof replacement in Howard County, check whether your HOA or Columbia village needs to approve exterior changes. We give you the shingle line, color and product details for the application and plan the work around the approval.",
          "On complex roofs we take extra care at valleys, step flashing and roof-to-wall joints, because that's where water gets in long before the shingles wear out.",
        ],
      },
      {
        heading: "Heavy rain, gutters and roof repair in Howard County",
        paragraphs: [
          "Ellicott City's flash floods showed how hard rain hits this part of Maryland. A roof that sheds water well, with flashing that holds and gutters sized for the volume, keeps that water away from walls and foundations.",
          "If you have a leak now, we find the source, make the repair and show you photos of what we fixed.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you help with my Columbia village or HOA roof approval?",
        answer: "Yes. We provide the shingle product, color and specification details your village or HOA asks for, and we schedule the work once you're approved.",
      },
    ],
    seo: {
      title: "Roofing Contractor in Howard County, MD | Pineda's Roofing",
      description: "Family-owned roofing contractor in Howard County: roof replacement, repair, storm damage and solar in Columbia, Ellicott City and Elkridge. MHIC# 142024.",
    },
  },
  {
    slug: "anne-arundel-county",
    name: "Anne Arundel County",
    kind: "county",
    tier: 1,
    state: "MD",
    featured: true,
    lead: "Waterfront wind, salt air and summer storms: Pineda's Roofing is a roofing contractor in Anne Arundel County that builds and repairs roofs for life on the Bay, from Annapolis to Glen Burnie.",
    paragraphs: [
      "Much of Anne Arundel County sits on the Chesapeake Bay and its rivers, the Severn, Magothy, South and Patapsco. Homes near the water take strong wind, driving rain and salt air that wear out shingles, flashing and fasteners faster.",
      "Inland, Glen Burnie, Odenton and Crofton have neighborhoods full of 1950s to 1980s homes ready for new roofs, and newer communities near Fort Meade with their own HOA rules.",
    ],
    highlights: [
      "Free roof inspections in Anne Arundel County",
      "Wind damage repair",
      "Algae-resistant Atlas shingles",
      "Storm damage and insurance claim help",
      "Waterfront home roofing",
      "Solar installation",
    ],
    neighborhoods: ["Annapolis", "Glen Burnie", "Severna Park", "Pasadena", "Arnold", "Crofton", "Odenton", "Edgewater", "Millersville", "Linthicum"],
    sections: [
      {
        heading: "Roof replacement in Anne Arundel County",
        paragraphs: [
          "On waterfront and near-water homes we pay close attention to edges and flashing: drip edge, starter strips and nailing done right are what keep shingles down in a nor'easter.",
          "Shaded, humid roofs here grow black algae streaks fast. The Atlas Pinnacle Pristine shingles we install carry 3M Scotchgard Protector to keep them looking clean longer.",
        ],
      },
      {
        heading: "Storm and wind damage roof repair in Anne Arundel County",
        paragraphs: [
          "After a storm, missing or creased shingles and lifted flashing are the most common damage we find. We inspect for free, document everything with photos and work with your insurance company if there's a claim.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which roof holds up best near the water in Anne Arundel County?",
        answer: "A well-installed architectural shingle roof with sealed starter strips, correct nailing and good flashing handles Bay wind well. We'll look at your home's exposure and recommend the right setup.",
      },
    ],
    seo: {
      title: "Roofing Contractor in Anne Arundel County, MD | Pineda's Roofing",
      description: "Roofing contractor in Anne Arundel County: roof replacement and wind damage repair for Annapolis, Glen Burnie and Severna Park homes. Free inspections.",
    },
  },
  {
    slug: "prince-georges-county",
    name: "Prince George's County",
    kind: "county",
    tier: 1,
    state: "MD",
    featured: true,
    lead: "Pineda's Roofing is a family-owned roofing contractor in Prince George's County for roof replacement, roof repair, storm damage and solar in Bowie, Laurel, College Park, Upper Marlboro and beyond.",
    paragraphs: [
      "Prince George's County has some of the region's most varied housing: Levitt-built homes in Bowie, historic homes in Hyattsville and Laurel, the 1930s cooperative homes in Greenbelt, and newer subdivisions in Upper Marlboro and Brandywine.",
      "Older homes often need decking and flashing work under the new roof. Newer homes are reaching the age when their first roof wears out, and many are in HOA communities with rules on shingle color and style.",
    ],
    highlights: [
      "Free roof inspections in Prince George's County",
      "Roof replacement for older and newer homes",
      "HOA shingle and color details",
      "Storm damage and insurance claim help",
      "Gutters and gutter guards",
      "Solar installation",
    ],
    neighborhoods: ["Bowie", "Laurel", "College Park", "Hyattsville", "Greenbelt", "Upper Marlboro", "Largo", "Clinton", "Fort Washington", "Brandywine"],
    sections: [
      {
        heading: "Roof replacement in Prince George's County",
        paragraphs: [
          "A new roof in Prince George's County starts with a free inspection: we check the shingles, decking, flashing, ventilation and gutters and give you a written estimate with photos.",
          "On HOA homes we provide the shingle line and color details for approval. On older homes we expect to replace some decking, and we tell you that up front instead of surprising you mid-job.",
        ],
      },
      {
        heading: "Storm damage roof repair in Prince George's County",
        paragraphs: [
          "Summer storms and falling limbs cause most of the damage we see here. We tarp and protect an open roof, photograph the damage and work with your insurance adjuster on the claim.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you work with HOAs in Prince George's County?",
        answer: "Yes. We provide the product and color information HOAs ask for, and we follow community rules on work hours and site cleanup.",
      },
    ],
    seo: {
      title: "Roofing Contractor in Prince George's County, MD | Pineda's Roofing",
      description: "Roofing contractor in Prince George's County: roof replacement, repair, storm damage and solar in Bowie, Laurel, College Park and Upper Marlboro.",
    },
  },

  /* ── Tier 2 ─────────────────────────────────────────────────────── */
  {
    slug: "carroll-county",
    name: "Carroll County",
    kind: "county",
    tier: 2,
    state: "MD",
    featured: true,
    lead: "Pineda's Roofing is a roofing contractor in Carroll County for roof replacement, roof repair and storm damage in Westminster, Eldersburg, Sykesville and the surrounding countryside.",
    paragraphs: [
      "Carroll County's open farmland and rolling hills leave many homes exposed to wind from every side, and it sees more snow and ice than the counties closer to the Bay.",
      "Homes range from historic houses on Westminster's and Sykesville's main streets to 1980s and 1990s subdivisions in Eldersburg, many of them now ready for a second roof.",
    ],
    highlights: [
      "Free roof inspections in Carroll County",
      "Wind and ice dam damage repair",
      "Ice and water shield on every new roof",
      "Storm damage and insurance claim help",
      "Gutters and chimney flashing",
    ],
    neighborhoods: ["Westminster", "Eldersburg", "Sykesville", "Hampstead", "Manchester", "Taneytown", "Mount Airy"],
    sections: [
      {
        heading: "Roof replacement in Carroll County",
        paragraphs: [
          "For a roof replacement in Carroll County we plan for wind and winter: ice and water shield at the eaves and valleys, good attic ventilation to prevent ice dams, and shingles nailed to the manufacturer's high-wind pattern.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Carroll County, MD | Pineda's Roofing",
      description: "Roofing contractor in Carroll County: roof replacement, wind and ice dam repair in Westminster, Eldersburg and Sykesville. Family-owned, MHIC# 142024.",
    },
  },
  {
    slug: "frederick-county",
    name: "Frederick County",
    kind: "county",
    tier: 2,
    state: "MD",
    featured: true,
    lead: "Pineda's Roofing is a roofing contractor in Frederick County for roof replacement, ice dam repair and storm damage, from historic downtown Frederick to Urbana and Middletown.",
    paragraphs: [
      "Frederick County gets more snow and ice than the communities closer to D.C., and homes near the mountains take stronger wind. Ice dams along the eaves are one of the most common problems we fix here.",
      "Housing runs from brick rowhomes in downtown Frederick's historic district to newer planned communities in Urbana and New Market.",
    ],
    highlights: [
      "Free roof inspections in Frederick County",
      "Ice dam prevention and repair",
      "Historic district chimney and masonry work",
      "Storm damage and insurance claim help",
      "Atlas Pinnacle Pristine shingles",
    ],
    neighborhoods: ["Frederick", "Urbana", "Middletown", "New Market", "Walkersville", "Brunswick", "Thurmont"],
    sections: [
      {
        heading: "Ice dam and roof repair in Frederick County",
        paragraphs: [
          "Ice dams form when attic heat melts snow that refreezes at the cold eaves. We fix the leak, then the cause: ventilation, insulation gaps and missing ice and water shield.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Frederick County, MD | Pineda's Roofing",
      description: "Roofing contractor in Frederick County: roof replacement, ice dam repair and storm damage in Frederick, Urbana and Middletown. Free inspections.",
    },
  },
  {
    slug: "montgomery-county",
    name: "Montgomery County",
    kind: "county",
    tier: 2,
    state: "MD",
    featured: true,
    lead: "Silver Spring is home. Pineda's Roofing is a family-owned roofing contractor in Montgomery County for roof replacement, repair, storm damage and solar, from Silver Spring and Wheaton to Rockville and Germantown.",
    paragraphs: [
      "We're based in Silver Spring, and Montgomery County is where many of our longest-standing customers live. Mid-century brick colonials, Cape Cods and ramblers fill much of the county, alongside newer townhome communities.",
      "Mature trees shade many neighborhoods, which means storm limbs, clogged gutters and algae on shaded roofs. We check all three on every inspection.",
    ],
    highlights: [
      "Free roof inspections in Montgomery County",
      "Based in Silver Spring",
      "Storm damage and insurance claim help",
      "Historic district experience",
      "Gutters, chimneys and siding",
      "Solar installation",
    ],
    neighborhoods: ["Silver Spring", "Wheaton", "Rockville", "Bethesda", "Gaithersburg", "Germantown", "Potomac", "Olney", "Takoma Park", "Kensington"],
    sections: [
      {
        heading: "Roof replacement in Montgomery County",
        paragraphs: [
          "Many Montgomery County homes are on their second or third roof, and older decking and flashing need a careful eye. In historic districts like Takoma Park and Kensington, visible exterior changes can need review, and we help you plan for it.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Montgomery County, MD | Pineda's Roofing",
      description: "Family-owned roofing contractor in Montgomery County, based in Silver Spring: roof replacement, repair, storm damage and solar. MHIC# 142024.",
    },
  },
];

/* ── New city pages in the priority areas ─────────────────────────── */
export const priorityCityPages: Location[] = [
  {
    slug: "catonsville",
    name: "Catonsville",
    kind: "city",
    tier: 1,
    county: "Baltimore County",
    state: "MD",
    featured: true,
    lead: "Catonsville homeowners call Pineda's Roofing, a family-owned roofing contractor in Catonsville, for honest inspections, lasting repairs and full roof replacements.",
    paragraphs: [
      "Catonsville's older neighborhoods along Frederick Road have early 1900s homes with steep roofs, dormers and chimneys, while streets built after the war are full of Cape Cods and brick colonials on their third roof.",
      "Big old trees are part of what makes Catonsville feel like home, and they're also why we see so many clogged gutters, limb damage and shaded roofs with moss and algae.",
    ],
    highlights: ["Free roof inspections in Catonsville", "Dormer and chimney flashing", "Storm damage and insurance claim help", "Gutters and gutter guards", "Atlas Pinnacle Pristine shingles"],
    neighborhoods: ["Old Catonsville", "Oella", "Westview", "Paradise", "Hilltop"],
    sections: [
      {
        heading: "Roof replacement in Catonsville",
        paragraphs: [
          "On older Catonsville homes, the hard part of a roof replacement is everything around the shingles: dormer walls, chimney flashing and decking that has seen a century of weather. We replace what's failing and show you photos of it.",
        ],
      },
      {
        heading: "Roof repair in Catonsville",
        paragraphs: [
          "Most leaks we fix in Catonsville start at a chimney, a dormer wall or a valley full of leaves. We fix the source, not just the shingles above the stain.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Catonsville, MD | Pineda's Roofing",
      description: "Roofing contractor in Catonsville: roof replacement and repair for older homes, chimney and dormer flashing, storm damage claims. Free inspections.",
    },
  },
  {
    slug: "glen-burnie",
    name: "Glen Burnie",
    kind: "city",
    tier: 1,
    county: "Anne Arundel County",
    state: "MD",
    featured: true,
    lead: "Pineda's Roofing is a roofing contractor in Glen Burnie for roof replacement, leak repair and storm damage on the Cape Cods, ranchers and split-levels that fill its neighborhoods.",
    paragraphs: [
      "Much of Glen Burnie was built in the 1950s through the 1970s. Many of those roofs have been re-shingled more than once, sometimes right over the old layer, which hides soft decking and traps heat.",
      "Being close to the Patapsco River and the Bay means wind-driven rain in storms. Flashing at chimneys and walls is often where a Glen Burnie leak begins.",
    ],
    highlights: ["Free roof inspections in Glen Burnie", "Full tear-off, no layering over old roofs", "Deck and flashing repair", "Storm damage and insurance claim help", "Gutters and downspouts"],
    neighborhoods: ["Glen Burnie Park", "Harundale", "Point Pleasant", "Marley", "Ferndale"],
    sections: [
      {
        heading: "Roof replacement in Glen Burnie",
        paragraphs: [
          "When we replace a roof in Glen Burnie, we tear off every old layer, so we can see the decking and fix it before the new roof goes on. You get photos of what we found and a roof that starts fresh.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Glen Burnie, MD | Pineda's Roofing",
      description: "Roofing contractor in Glen Burnie: full tear-off roof replacement, leak repair and storm damage claims for Cape Cods and ranchers. Free inspections.",
    },
  },
  {
    slug: "severna-park",
    name: "Severna Park",
    kind: "city",
    tier: 1,
    county: "Anne Arundel County",
    state: "MD",
    featured: true,
    lead: "Between the Severn and the Magothy, Severna Park roofs take wind, water and shade. Pineda's Roofing is a roofing contractor in Severna Park for replacements and repairs built for it.",
    paragraphs: [
      "Waterfront and wooded lots are what make Severna Park special, and they're hard on a roof. Wind off the rivers lifts shingles, and heavy shade keeps roofs damp long enough for algae and moss to grow.",
      "Larger homes here often have complex roofs with several valleys, dormers and skylights, each a place where flashing has to be right.",
    ],
    highlights: ["Free roof inspections in Severna Park", "Wind damage repair", "Algae-resistant Atlas shingles", "Skylight and valley flashing", "Storm damage and insurance claim help"],
    neighborhoods: ["Cape St. Claire", "Round Bay", "Manhattan Beach", "Sunrise Beach", "Chartwell"],
    sections: [
      {
        heading: "Roof replacement in Severna Park",
        paragraphs: [
          "For a roof replacement in Severna Park, we use Atlas Pinnacle Pristine shingles with 3M Scotchgard Protector against algae streaks, and we nail to the high-wind pattern so the roof stays down when storms come up the rivers.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Severna Park, MD | Pineda's Roofing",
      description: "Roofing contractor in Severna Park: wind-resistant roof replacement, algae-resistant shingles, skylight and valley repairs. Free inspections.",
    },
  },
  {
    slug: "elkridge",
    name: "Elkridge",
    kind: "city",
    tier: 1,
    county: "Howard County",
    state: "MD",
    featured: true,
    lead: "Pineda's Roofing is a roofing contractor in Elkridge for townhome and single-family roof replacement, repairs and storm damage claims.",
    paragraphs: [
      "Elkridge is one of Maryland's oldest towns, but most of its homes are newer: townhome and single-family communities built from the 1980s on, many of them now due for their first roof replacement.",
      "Townhome roofs share edges with the neighbors, so we coordinate the tie-ins carefully. Many communities also have HOA rules on shingle color and style.",
    ],
    highlights: ["Free roof inspections in Elkridge", "Townhome roof replacement", "HOA shingle and color details", "Storm damage and insurance claim help", "Gutters and gutter guards"],
    neighborhoods: ["Elkridge Landing", "Rockburn", "Lawyers Hill", "Ilchester"],
    sections: [
      {
        heading: "Townhome roof replacement in Elkridge",
        paragraphs: [
          "When one townhome in a row gets a new roof, the joints with the neighbors' roofs are where leaks start. We tie the new roof in cleanly and seal the transitions, and we can coordinate with neighbors who want to replace at the same time.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Elkridge, MD | Pineda's Roofing",
      description: "Roofing contractor in Elkridge: townhome and single-family roof replacement, repairs and storm damage claims. HOA color details. Free inspections.",
    },
  },
  {
    slug: "college-park",
    name: "College Park",
    kind: "city",
    tier: 1,
    county: "Prince George's County",
    state: "MD",
    featured: true,
    lead: "Pineda's Roofing is a roofing contractor in College Park for homeowners and landlords, with roof repairs, replacements and gutter work done on schedule.",
    paragraphs: [
      "College Park's neighborhoods around the University of Maryland are full of brick colonials, bungalows and Cape Cods from the 1920s through the 1950s. Many are rentals, where a small leak can go unnoticed until it's a big repair.",
      "Mature trees mean full gutters every fall. Water that spills over the gutter rots fascia and soaks foundations, so we check drainage on every visit.",
    ],
    highlights: ["Free roof inspections in College Park", "Repairs for rental properties", "Older home decking and flashing", "Gutter cleaning and repair", "Storm damage and insurance claim help"],
    neighborhoods: ["Calvert Hills", "Berwyn", "Hollywood", "Lakeland", "Old Town College Park"],
    sections: [
      {
        heading: "Roof repair in College Park",
        paragraphs: [
          "For landlords, we schedule around tenants, explain what we found with photos and give a clear price before work starts. For older homes, we repair flashing at chimneys and dormers, where most College Park leaks begin.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in College Park, MD | Pineda's Roofing",
      description: "Roofing contractor in College Park: roof repair and replacement for homeowners and landlords, gutters and storm damage claims. Free inspections.",
    },
  },
  {
    slug: "upper-marlboro",
    name: "Upper Marlboro",
    kind: "city",
    tier: 1,
    county: "Prince George's County",
    state: "MD",
    featured: true,
    lead: "Pineda's Roofing is a roofing contractor in Upper Marlboro for roof replacement, storm damage repair and solar on the larger homes and newer communities around the county seat.",
    paragraphs: [
      "Many Upper Marlboro homes were built from the 1980s through the 2000s, and their original roofs are reaching the end of their life. Bigger homes mean bigger roofs, with more valleys and walls to flash correctly.",
      "Most communities here have HOAs with rules on shingle style and color, and we provide the details for approval.",
    ],
    highlights: ["Free roof inspections in Upper Marlboro", "Roof replacement for larger homes", "HOA shingle and color details", "Storm damage and insurance claim help", "Solar installation"],
    neighborhoods: ["Marlton", "Kettering", "Largo", "Beechtree", "Perrywood"],
    sections: [
      {
        heading: "Roof replacement in Upper Marlboro",
        paragraphs: [
          "If you're planning solar, replace an aging roof first. Putting panels on a roof with a few years left means paying to remove and reinstall them later. We can plan both together.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Upper Marlboro, MD | Pineda's Roofing",
      description: "Roofing contractor in Upper Marlboro: roof replacement for larger homes, HOA approvals, storm damage repair and solar. Free inspections.",
    },
  },
  {
    slug: "westminster",
    name: "Westminster",
    kind: "city",
    tier: 2,
    county: "Carroll County",
    state: "MD",
    featured: true,
    lead: "Pineda's Roofing is a roofing contractor in Westminster for roof replacement and repairs built for Carroll County wind and winters.",
    paragraphs: [
      "Westminster's historic Main Street homes have steep roofs, chimneys and old flashing, while the subdivisions around town have roofs from the 1980s and 1990s that are now wearing out.",
      "Open ground means wind, and winters here bring more snow and ice than closer to the Bay. Ice and water shield and good ventilation are part of every roof we install.",
    ],
    highlights: ["Free roof inspections in Westminster", "Wind and ice dam repair", "Chimney flashing", "Storm damage and insurance claim help", "Atlas Pinnacle Pristine shingles"],
    neighborhoods: ["Downtown Westminster", "Wakefield Valley", "Greenvale Mews", "Avondale"],
    seo: {
      title: "Roofing Contractor in Westminster, MD | Pineda's Roofing",
      description: "Roofing contractor in Westminster: roof replacement and repair for wind and winter, ice dams and chimney flashing. Free inspections.",
    },
  },
];

/* ── Extra local detail for existing city pages ───────────────────── */
export const localDetail: Record<string, Partial<Location>> = {
  towson: {
    tier: 1,
    sections: [
      { heading: "Roof replacement in Towson", paragraphs: ["Towson's older homes in Stoneleigh and Ruxton often have steep roofs and chimneys with decades-old flashing. As a roofing contractor in Towson, we rebuild the flashing with the roof instead of reusing worn metal."] },
      { heading: "Flat roof repair in Towson", paragraphs: ["Rodgers Forge rowhomes have low-slope rear roofs that pond after heavy rain. We repair or replace them with drainage planned so water runs off."] },
    ],
  },
  bowie: {
    tier: 1,
    sections: [
      { heading: "Roof replacement in Bowie", paragraphs: ["Belair at Bowie was built by Levitt & Sons in the 1960s, and many of those homes are on their third roof. As a roofing contractor in Bowie, we tear off every layer, repair the decking and replace worn flashing before the new roof goes on."] },
      { heading: "Storm damage roof repair in Bowie", paragraphs: ["Fallen limbs and wind-lifted shingles are the most common storm damage we see in Bowie. We photograph the damage and work with your insurance company on the claim."] },
    ],
  },
  laurel: {
    tier: 1,
    sections: [
      { heading: "Roof replacement in Laurel", paragraphs: ["From Old Town's steep roofs to 1980s subdivisions in West and South Laurel, we replace roofs with the flashing, ventilation and gutters done together. As a roofing contractor in Laurel, we serve both the Prince George's and Howard County sides of town."] },
    ],
  },
  columbia: {
    tier: 1,
    sections: [
      { heading: "Roof replacement in Columbia", paragraphs: ["Most Columbia villages review exterior changes. As a roofing contractor in Columbia, we provide the shingle line, color and specification details for your application and schedule the work once you're approved."] },
      { heading: "Townhome roofing in Columbia", paragraphs: ["Many Columbia townhome rows were roofed at the same time and wear out together. We tie each new roof into the neighbors' cleanly, and we can coordinate when neighbors replace together."] },
    ],
  },
  "ellicott-city": {
    tier: 1,
    sections: [
      { heading: "Roof replacement in Ellicott City", paragraphs: ["Ellicott City's hills and heavy rain make flashing and drainage critical. As a roofing contractor in Ellicott City, we build every roof to shed water fast and size gutters for the downpours this area gets."] },
    ],
  },
  annapolis: {
    tier: 1,
    sections: [
      { heading: "Roof replacement in Annapolis", paragraphs: ["Bay wind is the biggest test for an Annapolis roof. As a roofing contractor in Annapolis, we use sealed starter strips, high-wind nailing and solid edge metal so shingles stay down in a nor'easter."] },
      { heading: "Historic homes in Annapolis", paragraphs: ["In the historic district, visible exterior changes can need review before work starts. We help you plan the timing and give you the product details you need."] },
    ],
  },
  "silver-spring": {
    tier: 2,
    sections: [
      { heading: "Roof replacement in Silver Spring", paragraphs: ["Silver Spring is our home base. As a roofing contractor in Silver Spring, we've worked on the brick colonials, Cape Cods and ramblers that fill its neighborhoods for years, and we know what usually hides under their old shingles."] },
    ],
  },
  "washington-dc": {
    tier: 2,
    heading: "Solar Company & Roofing Contractor in Washington, DC",
    lead: "Pineda's Roofing is a solar company in Washington, DC that starts with the roof. We install solar on D.C. rowhouses and homes, and we make sure the roof under the panels is ready to last as long as they do.",
    paragraphs: [
      "Many D.C. rowhouses have flat or low-slope roofs with good sun, which makes them strong candidates for solar. But panels last decades, so a roof with only a few years left should be replaced first, or you'll pay to remove and reinstall the panels later.",
      "As roofers, we check the membrane, drains, parapets and flashing before any solar goes on, and we can handle the roof work and the solar installation as one plan.",
    ],
    highlights: [
      "Solar installation in Washington, DC",
      "Roof check before every solar install",
      "Rowhouse flat roof replacement",
      "Parapet and drain repair",
      "Storm damage and insurance claim help",
    ],
    sections: [
      {
        heading: "Solar company in Washington, DC",
        paragraphs: [
          "Every solar project in D.C. starts with a site visit: roof condition, shading from trees and neighboring buildings, and the space available for panels. Then we design a system around your roof and your electricity use.",
          "D.C. has its own solar programs and incentives, and they change over time. Ask us what currently applies to your home.",
        ],
      },
      {
        heading: "Solar on historic D.C. homes",
        paragraphs: [
          "In D.C.'s historic districts, panels visible from the street can need review by the city's Historic Preservation Office. On many flat rowhouse roofs the panels sit behind the parapet, out of view, and we plan the layout with that in mind.",
        ],
      },
      {
        heading: "Roof repair and flat roof replacement in Washington, DC",
        paragraphs: [
          "We also repair and replace flat roofs on D.C. rowhouses, from Capitol Hill to Petworth and Brookland. We find where water gets in, whether it's a drain, a seam or parapet flashing, and fix the source.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I replace my roof before installing solar in D.C.?",
        answer: "If your roof has less than about 10 years of life left, usually yes. We inspect it first and tell you honestly whether it's ready for panels.",
      },
      {
        question: "Can you install solar on a flat rowhouse roof?",
        answer: "Yes. Flat rowhouse roofs are common solar sites in D.C. We check the roof, drainage and parapets and design the layout around them.",
      },
    ],
    seo: {
      title: "Solar Company in Washington, DC | Solar & Roofing | Pineda's Roofing",
      description: "Solar company in Washington, DC that starts with the roof: solar installation on rowhouses and homes, flat roof replacement and repair. Free assessment.",
    },
  },
};
