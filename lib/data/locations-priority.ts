import type { Faq, Location } from "../types";
import { images } from "./images.ts";

/*
 * County hub pages and extra city pages for the main service areas (Baltimore County, Baltimore City,
 * Howard, Anne Arundel, Prince George's) and the second tier (Carroll, Frederick, Montgomery).
 *
 * Content rules: local housing and weather notes are general and cautious. No project, customer count, street,
 * price or permit rule is stated as fact. Anything about a specific past job is for Roberto to add
 * (see the "Recent work" sections). Reviewed by Ben before going live.
 */

const inspect = (place: string): Faq => ({
  question: `Do you offer free roof inspections in ${place}?`,
  answer: `Yes. Call (301) 921-6333 or send the form, and we will set up a free roof inspection in ${place}. We photograph what we find and give you a written scope with no obligation.`,
});

export const priorityLocations: Location[] = [
  /* ───────────── Baltimore County ───────────── */
  {
    slug: "baltimore-county",
    name: "Baltimore County",
    county: "Baltimore County",
    state: "MD",
    kind: "county",
    tier: 1,
    featured: true,
    lead: "Pineda's Roofing is a roofing contractor in Baltimore County, MD, serving Towson, Pikesville, Owings Mills, Catonsville and nearby communities.",
    paragraphs: [
      "Baltimore County wraps around the city and has a wide mix of homes: older brick houses and bungalows, colonials, townhome communities and newer subdivisions. Each type ages differently, so we start with an inspection instead of a one-size answer.",
      "Heavy summer thunderstorms, wind and winter freeze-thaw are the usual causes of roof damage. We photograph what we find, explain the options and help with your insurance claim when storm damage is involved.",
    ],
    highlights: ["Free roof inspections in Baltimore County", "Roof repair and full replacement", "Storm damage and insurance claim help", "Gutters, siding and chimney work too", "Emergency roof repair", "Solar: ask us about it"],
    neighborhoods: ["Towson", "Pikesville", "Owings Mills", "Catonsville", "Dundalk", "Essex", "Parkville", "Cockeysville"],
    sections: [
      {
        icon: "house",
        eyebrow: "Roof repair and replacement",
        title: "Roof replacement in Baltimore County",
        lead: "Older Baltimore County homes often need more than new shingles.",
        paragraphs: [
          "On older houses we check the decking, flashing and ventilation before anything new goes on, because a new roof over a weak deck does not last.",
          "Newer subdivisions and townhome rows usually need clean, coordinated work that matches the neighbors and follows any community rules.",
        ],
        highlightsLabel: "What we check",
        highlights: ["Decking and attic ventilation", "Flashing at chimneys and valleys", "Gutters and drainage", "Shingle color and HOA rules"],
        image: images.homeNewRoofAerial,
        imageSide: "right",
      },
      {
        icon: "storm",
        eyebrow: "Storms",
        title: "Storm damage roof repair in Baltimore County",
        lead: "After a storm, check from the ground and call us before you climb up.",
        paragraphs: ["We look for lifted or missing shingles, dented gutters and debris, document it with photos and tell you whether a claim makes sense before you file. If water is coming in, we tarp and secure the roof first."],
        image: images.fallenTreeHouse,
      },
    ],
    faqs: [inspect("Baltimore County"), { question: "Which parts of Baltimore County do you serve?", answer: "We serve homes and businesses across Baltimore County, including Towson, Pikesville, Owings Mills and Catonsville. If you are not sure, call and we will tell you right away." }],
    seo: {
      title: "Roofing Contractor in Baltimore County, MD | Pineda's Roofing",
      description: "Roof repair, roof replacement and storm damage help from a roofing contractor in Baltimore County, MD. Towson, Pikesville, Owings Mills and more. Free inspections.",
    },
  },
  {
    slug: "towson",
    name: "Towson",
    county: "Baltimore County",
    state: "MD",
    featured: true,
    lead: "Towson homeowners call Pineda's Roofing for honest inspections, lasting repairs and full roof replacements.",
    paragraphs: [
      "Towson has older brick homes near the center and newer neighborhoods farther out. Older roofs often have worn flashing around chimneys and dormers, which is where leaks start.",
      "Mature trees mean leaves in gutters and limbs in storms, so we check drainage and storm damage on every visit.",
    ],
    highlights: ["Free roof inspections in Towson", "Storm and insurance claim help", "Chimney and flashing repair", "Gutters and gutter guards", "24/7 emergency roof repair"],
    neighborhoods: ["Ruxton", "Lutherville", "Rodgers Forge", "Hampton", "Cromwell"],
    seo: {
      title: "Roofing Contractor in Towson, MD | Pineda's Roofing",
      description: "Towson roof repair, replacement and storm damage help from a family-owned Maryland roofer. Free inspections. Call (301) 921-6333.",
    },
  },
  {
    slug: "pikesville",
    name: "Pikesville",
    county: "Baltimore County",
    state: "MD",
    featured: true,
    lead: "Pikesville homes range from mid-century houses to newer builds, and each needs a roofer who looks closely before recommending anything.",
    paragraphs: [
      "On mid-century homes we pay attention to attic ventilation and the condition of the original decking. On newer homes the focus is usually flashing, sealants and storm damage.",
      "We give you a written scope and price, and we explain what is urgent and what can wait.",
    ],
    highlights: ["Free roof inspections in Pikesville", "Roof repair and replacement", "Storm and insurance claim help", "Gutters and siding", "Clear written estimates"],
    neighborhoods: ["Pikesville center", "Greenspring", "Stevenson", "Garrison"],
    seo: {
      title: "Roofing Contractor in Pikesville, MD | Pineda's Roofing",
      description: "Roof repair and roof replacement in Pikesville, MD from a family-owned roofing contractor. Storm damage help and free inspections.",
    },
  },
  {
    slug: "owings-mills",
    name: "Owings Mills",
    county: "Baltimore County",
    state: "MD",
    featured: true,
    lead: "Owings Mills has many townhome and single-family communities where roofs are reaching replacement age together.",
    paragraphs: [
      "When neighbors' roofs age at the same time, coordination matters. We can match shingle style and color to what your community expects and plan the work around your schedule.",
      "Open lots and summer storms bring wind damage, so we check for lifted shingles, ridge caps and exposed nail heads on every inspection.",
    ],
    highlights: ["Free roof inspections in Owings Mills", "Townhome and HOA roof replacements", "Storm and insurance claim help", "Gutters and gutter guards", "24/7 emergency roof repair"],
    neighborhoods: ["Owings Mills center", "Reisterstown Road corridor", "Foundry Row area", "Garrison Forest"],
    seo: {
      title: "Roofing Contractor in Owings Mills, MD | Pineda's Roofing",
      description: "Owings Mills roofing for homes and townhomes: repair, replacement and storm damage claims from a family-owned Maryland roofer. Free inspections.",
    },
  },
  {
    slug: "catonsville",
    name: "Catonsville",
    county: "Baltimore County",
    state: "MD",
    featured: true,
    lead: "Catonsville's older streets have character and roofs to match. We repair and replace them with care.",
    paragraphs: [
      "Many Catonsville homes are older, with dormers, porches and chimneys that add flashing points. We check each one and fix the source of a leak, not just the stain.",
      "Large shade trees keep roofs damp and gutters full. We look for algae, moss and clogged drainage along with storm damage.",
    ],
    highlights: ["Free roof inspections in Catonsville", "Chimney and flashing repair", "Roof repair and replacement", "Gutters and siding", "Storm and insurance claim help"],
    neighborhoods: ["Catonsville center", "Oella", "Arbutus", "Halethorpe"],
    seo: {
      title: "Roofing Contractor in Catonsville, MD | Pineda's Roofing",
      description: "Catonsville roof repair and replacement for older homes: flashing, chimneys, gutters and storm damage. Family-owned Maryland roofer. Free inspections.",
    },
  },

  /* ───────────── Baltimore City ───────────── */
  {
    slug: "baltimore-city",
    name: "Baltimore City",
    county: "Baltimore City",
    state: "MD",
    kind: "county",
    tier: 1,
    featured: true,
    lead: "Pineda's Roofing is a roofing contractor in Baltimore City, MD, for rowhouses, older single-family homes and small commercial buildings.",
    paragraphs: [
      "Baltimore is known for rowhouses. Many have flat or low-slope roofs, parapet walls, cornices and shared walls, so drainage and flashing decide how long a roof lasts.",
      "Some neighborhoods are historic districts, where exterior changes can need approval. We can help you check what applies before work begins.",
    ],
    highlights: ["Free roof inspections in Baltimore City", "Rowhouse flat roof repair and replacement", "Parapet, cornice and flashing repair", "Chimney repair", "Emergency leak repair", "Storm and insurance claim help"],
    neighborhoods: ["Canton", "Federal Hill", "Fells Point", "Hampden", "Highlandtown", "Locust Point", "Mount Vernon", "Charles Village", "Roland Park"],
    sections: [
      {
        icon: "building",
        eyebrow: "Rowhouses",
        title: "Rowhouse roof repair and replacement in Baltimore City",
        lead: "A rowhouse roof is a small roof with a lot of details.",
        paragraphs: [
          "Water usually enters at the edges: where the roof meets a party wall, around a chimney, at a parapet or behind a cornice. We trace the leak to its source and repair that, not only the stain on the ceiling.",
          "When a flat or low-slope roof is past repair, we replace it with a system chosen for your building and explain the options in writing.",
        ],
        highlightsLabel: "Common rowhouse roof work",
        highlights: ["Flat roof membrane repair", "Parapet and coping repair", "Flashing along shared walls", "Skylight and roof hatch leaks", "Roof drains and gutters"],
        image: images.flatRoofMembrane,
        imageSide: "right",
      },
      {
        icon: "storm",
        eyebrow: "Leaks and storms",
        title: "Leaking roof repair in Baltimore City",
        lead: "If water is coming in, call us. We can tarp and secure the roof, then plan the permanent fix.",
        paragraphs: ["Heavy rain, ice and wind find weak spots fast on older roofs. We document the damage with photos, which also helps if you decide to file an insurance claim."],
        image: images.flatRoofSkylight,
      },
    ],
    faqs: [
      inspect("Baltimore City"),
      { question: "Do you work on rowhouse flat roofs in Baltimore?", answer: "Yes. Flat and low-slope roof repair and replacement is a regular part of our work, along with flashing, parapets and chimneys. We inspect first and explain what your roof needs." },
    ],
    seo: {
      title: "Roofing Contractor in Baltimore City, MD | Pineda's Roofing",
      description: "Rowhouse flat roof repair and replacement, leak repair and storm damage help in Baltimore City, MD. Family-owned roofing contractor. Free inspections.",
    },
  },
  {
    slug: "baltimore",
    name: "Baltimore",
    county: "Baltimore City",
    state: "MD",
    featured: true,
    lead: "Baltimore homeowners and building owners call Pineda's Roofing for rowhouse roofs, chimneys and leak repair.",
    paragraphs: [
      "From Canton to Hampden, many Baltimore roofs are flat or low-slope and need regular attention to seams, drains and flashing. Catching a small problem early is the cheapest repair.",
      "We give you photos of what we find and a clear recommendation: repair now, watch it, or replace.",
    ],
    highlights: ["Free roof inspections in Baltimore", "Rowhouse flat roof repair", "Chimney and parapet repair", "Gutters and drainage", "24/7 emergency roof repair"],
    neighborhoods: ["Canton", "Federal Hill", "Hampden", "Highlandtown", "Locust Point"],
    seo: {
      title: "Roofing Contractor in Baltimore, MD | Pineda's Roofing",
      description: "Baltimore roof repair, rowhouse flat roofs, chimney flashing and leak repair from a family-owned Maryland roofer. Free inspections.",
    },
  },

  /* ───────────── Howard County ───────────── */
  {
    slug: "howard-county",
    name: "Howard County",
    county: "Howard County",
    state: "MD",
    kind: "county",
    tier: 1,
    featured: true,
    lead: "Pineda's Roofing is a roofing contractor in Howard County, MD, serving Columbia, Ellicott City, Clarksville, Elkridge and nearby communities.",
    paragraphs: [
      "Howard County has planned communities with design guidelines, historic areas, and many newer homes with architectural shingle roofs now reaching the age to look at. We help with each.",
      "In communities with architectural review, the shingle color or style may need approval before work starts. We can help you work out what to submit.",
    ],
    highlights: ["Free roof inspections in Howard County", "HOA and community guideline friendly", "Roof repair and full replacement", "Storm and insurance claim help", "Gutters and gutter guards", "Solar: ask us about it"],
    neighborhoods: ["Columbia", "Ellicott City", "Clarksville", "Elkridge", "Fulton", "Highland", "Savage", "Jessup"],
    sections: [
      {
        icon: "house",
        eyebrow: "Replacement",
        title: "Roof replacement in Howard County",
        lead: "A good replacement starts with a careful tear-off and a look at what is underneath.",
        paragraphs: [
          "We inspect the decking, replace anything soft, and install underlayment, flashing and ventilation as a system, not an afterthought.",
          "If your community has an architectural review process, we can provide the product and color details you need for your application.",
        ],
        highlightsLabel: "What a replacement includes",
        highlights: ["Tear-off and deck inspection", "Underlayment and ice and water protection where needed", "New flashing and ventilation", "Cleanup and magnet sweep"],
        image: images.roofReplacementColonial,
        imageSide: "right",
      },
      {
        icon: "rain",
        eyebrow: "Repairs and drainage",
        title: "Roof repair and gutters in Howard County",
        lead: "Tree-lined streets are lovely and hard on roofs and gutters.",
        paragraphs: ["Leaves, limbs and moisture are the usual culprits. We repair shingles and flashing, clear and repair gutters, and add guards where they make sense."],
        image: images.gutterGuard,
      },
    ],
    faqs: [inspect("Howard County"), { question: "Can you work within my community's roofing rules?", answer: "Yes. If your community has architectural guidelines, tell us up front. We can share product and color details for your approval request before work starts." }],
    seo: {
      title: "Roofing Contractor in Howard County, MD | Pineda's Roofing",
      description: "Roof repair and roof replacement in Howard County, MD: Columbia, Ellicott City, Clarksville and Elkridge. Family-owned roofing contractor. Free inspections.",
    },
  },
  {
    slug: "clarksville",
    name: "Clarksville",
    county: "Howard County",
    state: "MD",
    featured: true,
    lead: "Clarksville's larger homes and wooded lots mean bigger roofs, more trees and more gutters to keep clear.",
    paragraphs: [
      "Larger roofs have more valleys, dormers and flashing points. We check each one and plan the work carefully.",
      "Wooded lots drop limbs and fill gutters, so we look at storm damage and drainage along with the shingles.",
    ],
    highlights: ["Free roof inspections in Clarksville", "Roof repair and replacement", "Storm and insurance claim help", "Gutters and gutter guards", "24/7 emergency roof repair"],
    neighborhoods: ["Clarksville", "Dayton", "West Friendship", "Glenwood"],
    seo: {
      title: "Roofing Contractor in Clarksville, MD | Pineda's Roofing",
      description: "Clarksville roof repair and replacement for larger homes and wooded lots. Family-owned Maryland roofer. Free inspections.",
    },
  },
  {
    slug: "elkridge",
    name: "Elkridge",
    county: "Howard County",
    state: "MD",
    featured: true,
    lead: "Elkridge has a mix of older homes and newer townhome communities, and we repair and replace roofs on both.",
    paragraphs: [
      "On older homes we focus on decking, flashing and ventilation. On newer townhomes, the focus is often sealants, flashing and storm damage.",
      "We explain what is urgent and what can wait, with photos and a written scope.",
    ],
    highlights: ["Free roof inspections in Elkridge", "Townhome and HOA roof replacements", "Roof repair and replacement", "Storm and insurance claim help", "Gutters and siding"],
    neighborhoods: ["Elkridge", "Hanover area", "Dorsey area"],
    seo: {
      title: "Roofing Contractor in Elkridge, MD | Pineda's Roofing",
      description: "Elkridge roof repair, replacement and storm damage help for homes and townhomes. Family-owned roofing contractor. Free inspections.",
    },
  },

  /* ───────────── Anne Arundel County ───────────── */
  {
    slug: "anne-arundel-county",
    name: "Anne Arundel County",
    county: "Anne Arundel County",
    state: "MD",
    kind: "county",
    tier: 1,
    featured: true,
    lead: "Pineda's Roofing is a roofing contractor in Anne Arundel County, MD, serving Annapolis, Glen Burnie, Severna Park, Crofton, Odenton and nearby communities.",
    paragraphs: [
      "Anne Arundel County has a long shoreline. Waterfront and near-water homes take more wind, wind-driven rain and humidity, which can be hard on shingles, flashing and gutters.",
      "Older neighborhoods have homes that have been re-roofed more than once, while newer communities have roofs reaching the age where an inspection pays off.",
    ],
    highlights: ["Free roof inspections in Anne Arundel County", "Wind and storm damage repair", "Roof repair and full replacement", "Insurance claim help", "Gutters, siding and chimneys", "Solar: ask us about it"],
    neighborhoods: ["Annapolis", "Glen Burnie", "Severna Park", "Crofton", "Odenton", "Pasadena", "Arnold", "Edgewater"],
    sections: [
      {
        icon: "wind",
        eyebrow: "Wind and water",
        title: "Storm damage roof repair in Anne Arundel County",
        lead: "Open water means open exposure.",
        paragraphs: [
          "Homes near the Chesapeake Bay and its rivers can get strong gusts and driving rain. We check ridge caps, edges, flashing and gutters, which are the first places wind and water get a grip.",
          "We document damage with photos and work with your insurance company when a claim makes sense.",
        ],
        highlightsLabel: "What we check after a storm",
        highlights: ["Lifted or missing shingles", "Ridge and edge details", "Flashing and vents", "Gutters and downspouts"],
        image: images.windDamage,
        imageSide: "right",
      },
      {
        icon: "house",
        eyebrow: "Replacement",
        title: "Roof replacement in Anne Arundel County",
        lead: "A roof that is near the end of its life is better replaced on your schedule than after a leak.",
        paragraphs: ["We explain your options in writing: what we found, what we recommend and why."],
        image: images.homeNewRoofAerial,
      },
    ],
    faqs: [inspect("Anne Arundel County"), { question: "Do you serve waterfront homes?", answer: "Yes. We inspect and repair roofs on homes near the water, where wind and humidity can wear on roofing details. Call us and we will set up a visit." }],
    seo: {
      title: "Roofing Contractor in Anne Arundel County, MD | Pineda's Roofing",
      description: "Roof repair and roof replacement in Anne Arundel County, MD: Annapolis, Glen Burnie, Severna Park, Crofton and Odenton. Free inspections.",
    },
  },
  {
    slug: "glen-burnie",
    name: "Glen Burnie",
    county: "Anne Arundel County",
    state: "MD",
    featured: true,
    lead: "Glen Burnie has many established neighborhoods where original roofs have been through years of Maryland weather.",
    paragraphs: [
      "Established neighborhoods often mean older roofs with worn flashing and shingles at the end of their life. We inspect, photograph and give you a clear recommendation.",
      "Storms bring wind damage and fallen limbs. We secure the roof and help with the insurance paperwork when needed.",
    ],
    highlights: ["Free roof inspections in Glen Burnie", "Roof repair and replacement", "Storm and insurance claim help", "Gutters and siding", "24/7 emergency roof repair"],
    neighborhoods: ["Glen Burnie", "Ferndale", "Linthicum", "Pasadena"],
    seo: {
      title: "Roofing Contractor in Glen Burnie, MD | Pineda's Roofing",
      description: "Glen Burnie roof repair, replacement and storm damage help from a family-owned Maryland roofer. Free inspections. Call (301) 921-6333.",
    },
  },
  {
    slug: "severna-park",
    name: "Severna Park",
    county: "Anne Arundel County",
    state: "MD",
    featured: true,
    lead: "Severna Park's tree-covered lots and larger homes call for careful roofing and good drainage.",
    paragraphs: [
      "Shade and moisture invite algae and moss, and falling limbs are a real risk in storms. We look at shingle condition, flashing and gutters together.",
      "Larger homes often have more complex rooflines. We plan the work around the details, not just the square footage.",
    ],
    highlights: ["Free roof inspections in Severna Park", "Roof repair and replacement", "Gutters and gutter guards", "Storm and insurance claim help", "Siding and chimney work"],
    neighborhoods: ["Severna Park", "Arnold", "Cape St. Claire", "Pasadena"],
    seo: {
      title: "Roofing Contractor in Severna Park, MD | Pineda's Roofing",
      description: "Severna Park roof repair and replacement, gutters and storm damage help for wooded lots and larger homes. Free inspections.",
    },
  },
  {
    slug: "crofton",
    name: "Crofton",
    county: "Anne Arundel County",
    state: "MD",
    featured: true,
    lead: "Crofton's planned neighborhoods and townhome communities often have roofs that age together.",
    paragraphs: [
      "When many roofs in a community were built in the same years, they tend to need attention at about the same time. We help you plan repairs or replacement and match what your community expects.",
      "We inspect for storm damage, worn flashing and ventilation problems and explain what we find in plain language.",
    ],
    highlights: ["Free roof inspections in Crofton", "Townhome and HOA roof replacements", "Storm and insurance claim help", "Gutters and siding", "24/7 emergency roof repair"],
    neighborhoods: ["Crofton", "Gambrills", "Davidsonville"],
    seo: {
      title: "Roofing Contractor in Crofton, MD | Pineda's Roofing",
      description: "Crofton roof repair, replacement and storm damage help for homes and townhomes. Family-owned Maryland roofer. Free inspections.",
    },
  },
  {
    slug: "odenton",
    name: "Odenton",
    county: "Anne Arundel County",
    state: "MD",
    featured: true,
    lead: "Odenton has grown quickly, and many newer roofs are now at the age where an inspection can catch small issues early.",
    paragraphs: [
      "On newer homes, early problems are usually flashing, sealants or storm damage. A free inspection finds them before they become interior leaks.",
      "We document what we find and give you a written scope with no obligation.",
    ],
    highlights: ["Free roof inspections in Odenton", "Roof repair and replacement", "Storm and insurance claim help", "Gutters and gutter guards", "24/7 emergency roof repair"],
    neighborhoods: ["Odenton", "Seven Oaks", "Piney Orchard", "Gambrills"],
    seo: {
      title: "Roofing Contractor in Odenton, MD | Pineda's Roofing",
      description: "Odenton roof repair and replacement for newer and established homes. Storm damage help and free inspections from a family-owned Maryland roofer.",
    },
  },

  /* ───────────── Prince George's County ───────────── */
  {
    slug: "prince-georges-county",
    name: "Prince George's County",
    county: "Prince George's County",
    state: "MD",
    kind: "county",
    tier: 1,
    featured: true,
    lead: "Pineda's Roofing is a roofing contractor in Prince George's County, MD, serving Bowie, Laurel, College Park, Hyattsville, Greenbelt and nearby communities.",
    paragraphs: [
      "Prince George's County sits right next to our Silver Spring base. Its homes include post-war Cape Cods and ramblers, early 20th century houses near the D.C. line and many newer communities.",
      "Each age of home has its own roofing issues, from worn flashing on older houses to storm damage on newer ones. We inspect first and tell you what your roof actually needs.",
    ],
    highlights: ["Free roof inspections in Prince George's County", "Roof repair and full replacement", "Storm and insurance claim help", "Chimney and flashing repair", "Gutters, siding and windows", "Solar: ask us about it"],
    neighborhoods: ["Bowie", "Laurel", "College Park", "Hyattsville", "Greenbelt", "Upper Marlboro", "Lanham", "Beltsville"],
    sections: [
      {
        icon: "house",
        eyebrow: "Roof replacement",
        title: "Roof replacement in Prince George's County",
        lead: "From older bungalows to newer subdivisions, we match the work to the house.",
        paragraphs: [
          "Older homes may need decking repairs and updated ventilation. Newer homes often need a closer look at flashing and storm damage.",
          "You get a written scope and price, and we walk you through the shingle options.",
        ],
        highlightsLabel: "What to expect",
        highlights: ["Free inspection with photos", "Written scope and price", "Decking and flashing checked", "Cleanup after the job"],
        image: images.aerialNewShingleRoof,
        imageSide: "right",
      },
      {
        icon: "storm",
        eyebrow: "Storms and leaks",
        title: "Roof repair and storm damage help in Prince George's County",
        lead: "Fast response when water is getting in.",
        paragraphs: ["We tarp and secure the roof, then plan the permanent repair. We photograph the damage in detail for your records and your insurance company."],
        image: images.shingleRepairPatch,
      },
    ],
    faqs: [inspect("Prince George's County"), { question: "How close are you to Prince George's County?", answer: "Our base is in Silver Spring, MD, right next to Prince George's County, so a visit is a short trip for us." }],
    seo: {
      title: "Roofing Contractor in Prince George's County, MD | Pineda's Roofing",
      description: "Roof repair and roof replacement in Prince George's County, MD: Bowie, Laurel, College Park, Hyattsville and Greenbelt. Free inspections.",
    },
  },
  {
    slug: "hyattsville",
    name: "Hyattsville",
    county: "Prince George's County",
    state: "MD",
    featured: true,
    lead: "Hyattsville's early 20th century homes are full of character, and their roofs need careful, detailed work.",
    paragraphs: [
      "Porches, dormers, chimneys and varied rooflines mean many flashing points. We look at each one, because that is where older roofs tend to leak.",
      "Some neighborhoods have their own guidelines. We can help you check what applies before choosing materials.",
    ],
    highlights: ["Free roof inspections in Hyattsville", "Chimney and flashing repair", "Roof repair and replacement", "Gutters and siding", "Storm and insurance claim help"],
    neighborhoods: ["Hyattsville", "Riverdale Park", "University Park", "Chillum"],
    seo: {
      title: "Roofing Contractor in Hyattsville, MD | Pineda's Roofing",
      description: "Hyattsville roof repair and replacement for older homes: flashing, chimneys, gutters and storm damage. Free inspections from a family-owned roofer.",
    },
  },
  {
    slug: "college-park",
    name: "College Park",
    county: "Prince George's County",
    state: "MD",
    featured: true,
    lead: "College Park has older homes, rental properties and newer townhomes, and we repair and replace roofs on all of them.",
    paragraphs: [
      "Landlords and owners of rental homes need a clear scope, photos and reliable scheduling. We provide a written estimate and communicate plainly.",
      "For owner-occupied homes, we explain whether a repair will do or a replacement is the better choice.",
    ],
    highlights: ["Free roof inspections in College Park", "Rental and multifamily roof work", "Roof repair and replacement", "Storm and insurance claim help", "Gutters and siding"],
    neighborhoods: ["College Park", "Berwyn Heights", "Riverdale Park", "Calvert Hills"],
    seo: {
      title: "Roofing Contractor in College Park, MD | Pineda's Roofing",
      description: "College Park roof repair and replacement for homes, rentals and townhomes. Clear written estimates and free inspections from a family-owned roofer.",
    },
  },
  {
    slug: "greenbelt",
    name: "Greenbelt",
    county: "Prince George's County",
    state: "MD",
    featured: true,
    lead: "Greenbelt has a distinctive mix of historic and newer housing, and each needs the right approach.",
    paragraphs: [
      "Historic and co-op housing can come with rules about exterior work. If that applies to you, tell us up front and we will work with your requirements.",
      "Newer apartments, condos and townhomes need a clear scope and coordination with the property manager or HOA.",
    ],
    highlights: ["Free roof inspections in Greenbelt", "Roof repair and replacement", "Flat and low-slope roof work", "Storm and insurance claim help", "Coordination with HOAs and managers"],
    neighborhoods: ["Greenbelt", "Berwyn Heights", "Lanham", "Beltsville"],
    seo: {
      title: "Roofing Contractor in Greenbelt, MD | Pineda's Roofing",
      description: "Greenbelt roof repair and replacement for homes, townhomes and multifamily buildings. Free inspections from a family-owned Maryland roofer.",
    },
  },

  /* ───────────── Carroll County ───────────── */
  {
    slug: "carroll-county",
    name: "Carroll County",
    county: "Carroll County",
    state: "MD",
    kind: "county",
    tier: 2,
    featured: true,
    lead: "Pineda's Roofing is a roofing contractor in Carroll County, MD, serving Westminster, Eldersburg, Sykesville and nearby towns.",
    paragraphs: [
      "Carroll County has historic town centers, suburban neighborhoods and rural properties with larger homes and outbuildings. Open land means more wind exposure and more trees near the house.",
      "We inspect roofs on homes and on garages and other buildings, and we tell you honestly whether a repair or a replacement makes sense.",
    ],
    highlights: ["Free roof inspections in Carroll County", "Roof repair and full replacement", "Storm and insurance claim help", "Gutters, siding and chimneys", "Emergency roof repair", "Solar: ask us about it"],
    neighborhoods: ["Westminster", "Eldersburg", "Sykesville", "Hampstead", "Manchester", "Taneytown"],
    sections: [
      {
        icon: "wind",
        eyebrow: "Wind and trees",
        title: "Storm damage roof repair in Carroll County",
        lead: "Open land, big trees and strong summer storms.",
        paragraphs: ["We check for lifted shingles, damaged ridge caps and flashing, and impact from limbs. We document the damage and help with your insurance claim."],
        image: images.treeOnRoof,
      },
      {
        icon: "house",
        eyebrow: "Replacement",
        title: "Roof replacement in Carroll County",
        lead: "Larger roofs and complex rooflines call for a careful plan.",
        paragraphs: ["We give you a written scope and price and explain the options. [PLACEHOLDER for Roberto: confirm whether Pineda's takes on roofs for barns and farm outbuildings in Carroll County.]"],
        image: images.rooferOnRidge,
        imageSide: "right",
      },
    ],
    faqs: [inspect("Carroll County"), { question: "Do you travel out to Carroll County?", answer: "Yes. Carroll County is one of the areas we serve. Call us and we will schedule a visit." }],
    seo: {
      title: "Roofing Contractor in Carroll County, MD | Pineda's Roofing",
      description: "Roof repair and roof replacement in Carroll County, MD: Westminster, Eldersburg and Sykesville. Storm damage help and free inspections.",
    },
  },
  {
    slug: "westminster",
    name: "Westminster",
    county: "Carroll County",
    state: "MD",
    featured: true,
    lead: "Westminster has a historic downtown and neighborhoods of every age, and roofs to match.",
    paragraphs: [
      "Older homes near the center often need flashing, chimney and decking attention. Newer neighborhoods more often need storm damage repair and an eye on aging shingles.",
      "We inspect, photograph and give you a straight recommendation.",
    ],
    highlights: ["Free roof inspections in Westminster", "Roof repair and replacement", "Chimney and flashing repair", "Storm and insurance claim help", "Gutters and siding"],
    neighborhoods: ["Downtown Westminster", "Wakefield", "Winters Mill", "Medford"],
    seo: {
      title: "Roofing Contractor in Westminster, MD | Pineda's Roofing",
      description: "Westminster roof repair and replacement for older and newer homes. Family-owned Maryland roofer. Storm damage help and free inspections.",
    },
  },

  /* ───────────── Frederick County ───────────── */
  {
    slug: "frederick-county",
    name: "Frederick County",
    county: "Frederick County",
    state: "MD",
    kind: "county",
    tier: 2,
    featured: true,
    lead: "Pineda's Roofing is a roofing contractor in Frederick County, MD, serving Frederick, Urbana, Middletown, New Market and nearby communities.",
    paragraphs: [
      "Frederick County mixes a historic city center, fast-growing suburbs and open farmland. That means old brick homes, newer subdivisions and rural properties, each with different roofing needs.",
      "We inspect first and explain the options. In historic areas, exterior changes can need approval, and we can help you check what applies.",
    ],
    highlights: ["Free roof inspections in Frederick County", "Roof repair and full replacement", "Storm and insurance claim help", "Gutters, siding and chimneys", "Emergency roof repair", "Solar: ask us about it"],
    neighborhoods: ["Frederick", "Urbana", "Middletown", "New Market", "Walkersville", "Thurmont", "Brunswick"],
    sections: [
      {
        icon: "house",
        eyebrow: "Replacement",
        title: "Roof replacement in Frederick County",
        lead: "Newer subdivisions and older homes both need a plan.",
        paragraphs: ["In newer communities, roofs from the same years often age together, so we can plan work that fits your community's rules. On older homes, we check decking and flashing carefully."],
        image: images.homeNewRoofAerial,
        imageSide: "right",
      },
      {
        icon: "storm",
        eyebrow: "Storms",
        title: "Roof repair after storms in Frederick County",
        lead: "Open exposure and big storms.",
        paragraphs: ["We secure the roof, document everything and help with your insurance claim when it makes sense."],
        image: images.hailDamage,
      },
    ],
    faqs: [inspect("Frederick County")],
    seo: {
      title: "Roofing Contractor in Frederick County, MD | Pineda's Roofing",
      description: "Roof repair and roof replacement in Frederick County, MD: Frederick, Urbana, Middletown and New Market. Free inspections and storm damage help.",
    },
  },

  /* ───────────── Montgomery County (hub; city pages already exist) ───────────── */
  {
    slug: "montgomery-county",
    name: "Montgomery County",
    county: "Montgomery County",
    state: "MD",
    kind: "county",
    tier: 2,
    featured: true,
    lead: "Pineda's Roofing is a roofing contractor in Montgomery County, MD. Our base is in Silver Spring, and we serve homes and businesses across the county.",
    paragraphs: [
      "Montgomery County is where we are based, so a visit is a short trip. We work in neighborhoods from Silver Spring and Takoma Park to Rockville, Bethesda, Gaithersburg and Germantown.",
      "Older close-in neighborhoods often have roofs on their second or third layer, while newer communities have roofs reaching the age to inspect. We look at each home on its own.",
    ],
    highlights: ["Free roof inspections in Montgomery County", "Roof repair and full replacement", "Storm and insurance claim help", "Gutters, siding and chimneys", "24/7 emergency roof repair", "Solar: ask us about it"],
    neighborhoods: ["Silver Spring", "Takoma Park", "Rockville", "Bethesda", "Gaithersburg", "Germantown", "Wheaton", "Olney"],
    faqs: [inspect("Montgomery County")],
    seo: {
      title: "Roofing Contractor in Montgomery County, MD | Pineda's Roofing",
      description: "Roofing contractor in Montgomery County, MD, based in Silver Spring. Roof repair, replacement and storm damage help. Free inspections.",
    },
  },
];
