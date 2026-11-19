import type { Location } from "../types";

/*
 * New service-area pages: more Baltimore County, Howard, Anne Arundel, Prince George's,
 * Carroll, Frederick and Montgomery towns, plus Charles County (new, second tier).
 * Each page is written for its own place: housing era, trees, exposure and the roof
 * problems that follow from them.
 */

export const newCountyPages: Location[] = [
  {
    slug: "charles-county",
    name: "Charles County",
    kind: "county",
    tier: 2,
    state: "MD",
    featured: true,
    lead: "Pineda's Roofing also serves Charles County, with roof replacement, roof repair and storm damage inspections from Waldorf and St. Charles to La Plata and Indian Head.",
    paragraphs: [
      "Charles County runs from the busy suburbs of Waldorf and St. Charles down to La Plata, the county seat, and out to Indian Head and Bryans Road along the Potomac River. Homes range from newer townhome and HOA communities to older houses in the town centers and farmhouses on rural land.",
      "Southern Maryland summers are hot and humid, with strong thunderstorms and, some years, the remnants of tropical storms. Homes near the Potomac take wind off the river, and shaded, humid roofs grow algae fast.",
    ],
    highlights: [
      "Free roof inspections in Charles County",
      "Roof replacement and repair",
      "Townhome and HOA roofing",
      "Storm damage inspections with photos",
      "Gutters and gutter guards",
      "Atlas Pinnacle Pristine shingles",
    ],
    neighborhoods: ["Waldorf", "La Plata", "St. Charles", "White Plains", "Indian Head", "Bryans Road"],
    sections: [
      {
        heading: "Roof replacement in Charles County",
        paragraphs: [
          "Many Charles County homes built from the 1980s through the 2000s still have their original roof. We replace them with a full tear-off, synthetic underlayment, ice and water shield at the eaves and valleys, and proper attic ventilation.",
          "If your community has an HOA, we give you the shingle line and color details for approval before the work is scheduled.",
        ],
      },
      {
        heading: "Storm damage roof repair in Charles County",
        paragraphs: [
          "After a storm, we inspect for lifted, creased or missing shingles and damaged flashing, and we document everything with photos. If the roof is open, we tarp it to keep water out. We can also meet with your adjuster.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Charles County, MD | Pineda's Roofing",
      description: "Roofing contractor in Charles County: roof replacement, repair and storm damage inspections in Waldorf, St. Charles, La Plata and Indian Head.",
    },
  },
];

export const newCityPages: Location[] = [
  /* ── Baltimore County ─────────────────────────────────────────────── */
  {
    slug: "owings-mills",
    name: "Owings Mills",
    kind: "city",
    tier: 1,
    county: "Baltimore County",
    state: "MD",
    featured: true,
    lead: "From townhome rows in Owings Mills New Town to wooded lots out toward the Worthington and Greenspring valleys, Pineda's Roofing is a roofing contractor in Owings Mills for roof replacement, repair and storm damage inspections.",
    paragraphs: [
      "Much of Owings Mills is newer than the rest of Baltimore County. Townhome and single-family communities built over the last few decades fill the area around Reisterstown Road, and many of those homes still have the roof the builder put on.",
      "Out in the valleys, older homes and farmhouses sit on large, wooded lots. Tall trees drop limbs in summer storms and keep roofs shaded and damp, and this corner of the county gets more snow and ice than the neighborhoods near the water.",
    ],
    highlights: [
      "Free roof inspections in Owings Mills",
      "Townhome roof replacement",
      "HOA shingle and color details",
      "Storm damage inspections with photos",
      "Gutters and gutter guards",
    ],
    neighborhoods: ["Owings Mills New Town", "Worthington Valley", "Greenspring Valley"],
    sections: [
      {
        heading: "Roof replacement in Owings Mills",
        paragraphs: [
          "Builder roofs were often put on fast, with thin underlayment and little attic ventilation. When we replace one, we tear off to the deck, add ice and water shield at the eaves and valleys, and set up ridge and soffit venting so the new roof isn't baking from below.",
          "Most Owings Mills communities have HOA rules on shingle style and color. We give you the product details for your application before anything is scheduled.",
        ],
      },
      {
        heading: "Townhome roofs in Owings Mills",
        paragraphs: [
          "On a townhome row, the seams where your roof meets your neighbors' are where water gets in first. We tie the new roof into the roofs next door and seal the party-wall transitions so the joint doesn't become the next leak.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Owings Mills, MD | Pineda's Roofing",
      description: "Roofing contractor in Owings Mills: roof replacement for townhomes and newer homes, HOA color details and storm damage inspections. Free inspections.",
    },
  },
  {
    slug: "pikesville",
    name: "Pikesville",
    kind: "city",
    tier: 1,
    county: "Baltimore County",
    state: "MD",
    featured: true,
    lead: "Pineda's Roofing is a roofing contractor in Pikesville for the mid-century brick homes that line its streets, with roof replacement, chimney flashing and leak repair.",
    paragraphs: [
      "Much of Pikesville was built in the years after World War II. Brick colonials, split-levels and ranchers fill the neighborhoods off Reisterstown Road and Old Court Road. The brick walls were built to last. The roofs, flashing and decking on top of them were not.",
      "Nearly every one of these homes has a brick chimney, and the joint where chimney meets roof is one of the most common leak points. Mature trees shade many streets, so gutters fill fast and shaded slopes grow moss and algae.",
    ],
    highlights: [
      "Free roof inspections in Pikesville",
      "Chimney and flashing repair",
      "Roof replacement and repair",
      "Flat and low-slope roofs",
      "Gutters and gutter guards",
    ],
    neighborhoods: ["Wellwood", "Summit Park", "Woodholme"],
    sections: [
      {
        heading: "Chimney flashing and leak repair in Pikesville",
        paragraphs: [
          "A chimney leak often shows up as a stain beside the fireplace or wet wood around the chimney in the attic. We check the step and counter flashing, the mortar joints and the chimney cap, then repair the flashing and masonry together so the fix holds.",
        ],
      },
      {
        heading: "Roof replacement in Pikesville",
        paragraphs: [
          "Mid-century homes often have plank decking, a second layer of shingles and almost no attic ventilation. We tear off to the deck, repair what's soft and add ridge and soffit vents so the new roof can breathe.",
          "Many brick homes also have a low-slope roof over a porch, carport or addition. Shingles don't belong on that little pitch, so we replace those sections with a flat roof system made for it.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Pikesville, MD | Pineda's Roofing",
      description: "Roofing contractor in Pikesville for mid-century brick homes: chimney flashing, roof repair and replacement, low-slope roofs. Family-owned, MHIC# 142024.",
    },
  },
  {
    slug: "parkville",
    name: "Parkville",
    kind: "city",
    tier: 1,
    county: "Baltimore County",
    state: "MD",
    featured: true,
    lead: "Brick duplexes, Cape Cods and old bungalows with deep front porches: Pineda's Roofing is a roofing contractor in Parkville for the homes that make up the neighborhoods along Harford Road.",
    paragraphs: [
      "Most of Parkville was built in the first half of the 1900s and the years right after World War II. Its streets are full of brick duplexes and rowhomes, Cape Cods with dormers, and bungalows with wide porches.",
      "Many of these homes have been re-roofed two or three times. On a duplex, your roof meets your neighbor's at the center line. On a Cape Cod, the dormers add walls and valleys where water likes to get in.",
    ],
    highlights: [
      "Free roof inspections in Parkville",
      "Duplex and rowhome roofing",
      "Dormer and chimney flashing",
      "Flat and low-slope roofs",
      "Storm damage inspections with photos",
    ],
    neighborhoods: ["Carney", "Villa Cresta", "Oakleigh", "Hillendale"],
    sections: [
      {
        heading: "Duplex roof replacement in Parkville",
        paragraphs: [
          "When only one side of a duplex gets a new roof, the line where the two roofs meet has to be tied in and sealed with care, or it becomes the next leak. If you and your neighbor want to replace at the same time, we can price both halves together.",
        ],
      },
      {
        heading: "Porch roofs and dormers in Parkville",
        paragraphs: [
          "Front porch roofs on older Parkville homes are often nearly flat, and shingles laid on too little pitch let water back up under them. We use a low-slope roof system where the pitch calls for it.",
          "Dormer walls are the other weak spot. When we re-roof a Cape Cod, we replace the step flashing along every dormer instead of reusing the old metal.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Parkville, MD | Pineda's Roofing",
      description: "Roofing contractor in Parkville: roof repair and replacement for duplexes, Cape Cods and bungalows, porch roofs and dormer flashing. Free inspections.",
    },
  },
  {
    slug: "perry-hall",
    name: "Perry Hall",
    kind: "city",
    tier: 1,
    county: "Baltimore County",
    state: "MD",
    featured: true,
    lead: "In Perry Hall, roofs from several decades of building are wearing out at once. Pineda's Roofing is a roofing contractor in Perry Hall for roof replacement, repair and storm damage inspections.",
    paragraphs: [
      "Perry Hall takes its name from the historic Perry Hall Mansion, but most of the community is suburban: subdivisions built from the 1960s through the 2000s along Belair Road and out toward Honeygo.",
      "Each era brings its own roof. Older split-levels and ranchers may have plank decking and a second layer of shingles. Colonials from the 1990s and 2000s tend to have bigger roofs, more valleys and builder-grade shingles. Newer, open subdivisions also catch more wind than older, tree-lined streets.",
    ],
    highlights: [
      "Free roof inspections in Perry Hall",
      "Roof replacement and repair",
      "Storm damage inspections with photos",
      "Gutters and gutter guards",
      "Atlas Pinnacle Pristine shingles",
    ],
    neighborhoods: ["Honeygo", "Seven Courts"],
    sections: [
      {
        heading: "Roof replacement on older Perry Hall homes",
        paragraphs: [
          "On homes from the 1960s and 1970s, we remove every old layer and check the decking board by board. Soft or rotted sections are replaced before the new roof goes on, and you get photos of what we found.",
        ],
      },
      {
        heading: "Roof replacement on newer Perry Hall homes",
        paragraphs: [
          "Larger 1990s and 2000s homes have more valleys and more places where a roof meets a wall. We line the valleys with ice and water shield, put in new step flashing at the walls and check attic ventilation, since poor airflow shortens shingle life.",
          "If your community has an HOA, we provide the shingle and color details for approval.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Perry Hall, MD | Pineda's Roofing",
      description: "Roofing contractor in Perry Hall: roof replacement for 1960s to 2000s homes, decking and valley repair, storm damage inspections. Free inspections.",
    },
  },
  {
    slug: "dundalk",
    name: "Dundalk",
    kind: "city",
    tier: 1,
    county: "Baltimore County",
    state: "MD",
    featured: true,
    lead: "Dundalk grew up as home to the families who worked at the Bethlehem Steel mill and shipyards at Sparrows Point. Pineda's Roofing is a roofing contractor in Dundalk for rowhouse roofs, flat roofs and wind damage repair.",
    paragraphs: [
      "Brick rowhouses and duplexes make up much of Dundalk, many of them built in the 1940s and 1950s, with older homes around the original village center. Many rowhouses have a flat or low-slope roof in back and a porch roof in front.",
      "Dundalk sits on the water, between Bear Creek and the Patapsco River. Wind off the water lifts shingle edges and drives rain under flashing, and a nor'easter pushes it sideways into every gap.",
    ],
    highlights: [
      "Free roof inspections in Dundalk",
      "Rowhouse flat roof replacement",
      "Porch roof repair",
      "Wind damage repair",
      "Storm damage inspections with photos",
    ],
    neighborhoods: ["Old Dundalk", "Logan Village", "St. Helena", "Turner Station", "Watersedge"],
    sections: [
      {
        heading: "Rowhouse flat roofs in Dundalk",
        paragraphs: [
          "A flat rowhouse roof fails where water sits: around the drain or scupper, at the seams and along the parapet or party wall. When we replace one, we fix soft decking, build up slope toward the drain and install a modified bitumen or single-ply membrane with the edges flashed properly.",
        ],
      },
      {
        heading: "Wind damage roof repair in Dundalk",
        paragraphs: [
          "Homes closest to Bear Creek and the Patapsco take the hardest wind. We check edge metal, starter strips and flashing closely, and new shingle roofs are nailed to the manufacturer's high-wind pattern.",
        ],
      },
      {
        heading: "Front porch roofs in Dundalk",
        paragraphs: [
          "A rowhouse porch roof ties into the front wall of the house, and that joint is a common leak point. We reflash it and replace the porch roofing with a system made for its low pitch.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Dundalk, MD | Pineda's Roofing",
      description: "Roofing contractor in Dundalk: rowhouse flat roof replacement, porch roofs and wind damage repair near Bear Creek and the Patapsco. Free inspections.",
    },
  },
  {
    slug: "halethorpe",
    name: "Halethorpe",
    kind: "city",
    tier: 1,
    county: "Baltimore County",
    state: "MD",
    featured: true,
    lead: "Pineda's Roofing is a roofing contractor in Halethorpe for roof repair, replacement and gutters on homes from the early 1900s through the post-war years, right on the edge of the Patapsco Valley.",
    paragraphs: [
      "Halethorpe grew up along the railroad, and some of its oldest homes, near Relay and the old stone Thomas Viaduct, still have steep roofs, wide porches and brick chimneys. Most streets filled in later with Cape Cods, ranchers and brick colonials.",
      "The woods of the Patapsco Valley come right up to many backyards. Tall trees mean falling limbs in summer storms, gutters packed with leaves every fall and roofs that stay shaded and damp.",
    ],
    highlights: [
      "Free roof inspections in Halethorpe",
      "Chimney and flashing repair",
      "Roof replacement and repair",
      "Gutters and gutter guards",
      "Storm damage inspections with photos",
    ],
    neighborhoods: ["Relay", "Arbutus", "Lansdowne"],
    sections: [
      {
        heading: "Roof repair on older Halethorpe homes",
        paragraphs: [
          "On early 1900s homes, leaks usually start at the chimney, where a porch roof meets the wall, or in a valley that has held wet leaves for years. We find the actual source before we repair anything, and we show you photos of the fix.",
        ],
      },
      {
        heading: "Gutters and fallen limbs in Halethorpe",
        paragraphs: [
          "When gutters overflow, water runs behind them and rots the fascia and the roof edge. We clean or replace gutters, add gutter guards under heavy trees and check the roof edge while we're up there.",
          "If a limb comes down in a storm, we inspect the whole roof, not just the spot where it landed, and document the damage with photos. We can also meet with your adjuster.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Halethorpe, MD | Pineda's Roofing",
      description: "Roofing contractor in Halethorpe: roof repair and replacement for older and post-war homes, chimney flashing, gutters and tree damage. Free inspections.",
    },
  },

  /* ── Howard County ────────────────────────────────────────────────── */
  {
    slug: "clarksville",
    name: "Clarksville",
    kind: "city",
    tier: 1,
    county: "Howard County",
    state: "MD",
    featured: true,
    lead: "Clarksville homes tend to be large, with roofs to match. Pineda's Roofing is a roofing contractor in Clarksville for roof replacement and repair on complex roofs, with the product details your HOA or village needs.",
    paragraphs: [
      "Clarksville sits along Route 108 in western Howard County, next to River Hill, one of Columbia's planned villages. The neighborhoods around it follow the same idea: planned communities with architectural review and larger homes, many built in the 1990s and 2000s.",
      "Those homes often have steep roofs broken up by valleys, dormers, skylights and roof-to-wall joints, and every one is a place where flashing has to be right. Past the subdivisions, older farmhouses sit on open land where wind hits hard.",
    ],
    highlights: [
      "Free roof inspections in Clarksville",
      "Complex roofs with valleys and dormers",
      "HOA and village approval details",
      "Skylight replacement",
      "Atlas Pinnacle Pristine shingles",
    ],
    neighborhoods: ["River Hill", "Pointers Run", "Simpsonville"],
    sections: [
      {
        heading: "Roof replacement on larger Clarksville homes",
        paragraphs: [
          "Big roofs with many angles fail at the details first. On a replacement we line every valley with ice and water shield, put in new step and counter flashing at the walls, and replace or reflash skylights while the roof is open.",
        ],
      },
      {
        heading: "HOA and village review in Clarksville",
        paragraphs: [
          "If your home is in River Hill or another community with architectural review, check before you schedule a new roof. We give you the shingle line, color and product sheets for your application and plan the work around the approval.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Clarksville, MD | Pineda's Roofing",
      description: "Roofing contractor in Clarksville: roof replacement for large, complex roofs, valley and skylight flashing, HOA and village approval details.",
    },
  },
  {
    slug: "west-friendship",
    name: "West Friendship",
    kind: "city",
    tier: 1,
    county: "Howard County",
    state: "MD",
    featured: true,
    lead: "Out in western Howard County, West Friendship homes sit on big lots and open land. Pineda's Roofing is a roofing contractor in West Friendship for roof replacement, wind damage repair and storm damage inspections.",
    paragraphs: [
      "West Friendship is rural Howard County: farms, horse properties and custom homes on large lots, with the county fairgrounds near the middle of it all.",
      "With few trees or buildings to block it, wind crosses open fields and hits roofs hard. Winters out here can also bring more snow and ice than eastern Howard County, which makes ice dams along the eaves a real risk.",
    ],
    highlights: [
      "Free roof inspections in West Friendship",
      "Wind damage repair",
      "Ice dam prevention and repair",
      "Roof replacement and repair",
      "Gutters and gutter guards",
    ],
    sections: [
      {
        heading: "Wind-resistant roof replacement in West Friendship",
        paragraphs: [
          "On exposed lots, the edges of a roof take the most force. We use sealed starter strips at the eaves and rakes, solid drip edge and shingles nailed to the manufacturer's high-wind pattern. Those details are what keep shingles down when a storm comes across open ground.",
        ],
      },
      {
        heading: "Ice dams and winter leaks in West Friendship",
        paragraphs: [
          "Ice dams form when attic heat melts snow that refreezes at the cold eaves. Every new roof gets ice and water shield at the eaves and valleys, and we check attic ventilation and insulation, where most ice dam problems start.",
        ],
      },
      {
        heading: "Garages and outbuildings in West Friendship",
        paragraphs: [
          "Many properties here have a detached garage, workshop or other outbuilding with a shingle roof. We can inspect and repair those on the same visit as the house.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in West Friendship, MD | Pineda's Roofing",
      description: "Roofing contractor in West Friendship: wind-resistant roof replacement, ice dam repair and storm damage inspections for rural Howard County homes.",
    },
  },

  /* ── Anne Arundel County ──────────────────────────────────────────── */
  {
    slug: "crofton",
    name: "Crofton",
    kind: "city",
    tier: 1,
    county: "Anne Arundel County",
    state: "MD",
    featured: true,
    lead: "Crofton was planned around its golf course in the 1960s, and many of its first homes are on their second or third roof. Pineda's Roofing is a roofing contractor in Crofton for roof replacement, repair and gutters.",
    paragraphs: [
      "The oldest Crofton neighborhoods wrap around the golf course along Crofton Parkway, with colonials, split-levels and ranchers from the 1960s and 1970s. Newer townhome and single-family communities spread out from there along Route 3 and Route 450.",
      "Many Crofton neighborhoods have covenants or HOA rules on exterior changes, including roof color and style. Tree-lined streets also mean full gutters and shaded slopes that stay damp after every rain.",
    ],
    highlights: [
      "Free roof inspections in Crofton",
      "HOA shingle and color details",
      "Roof replacement and repair",
      "Gutters and gutter guards",
      "Atlas Pinnacle Pristine shingles",
    ],
    neighborhoods: ["Crofton Village", "Walden", "Crofton Meadows"],
    sections: [
      {
        heading: "Roof replacement in Crofton",
        paragraphs: [
          "On 1960s and 1970s homes, tear-off often shows decking that has been through several roofs. We repair what's soft, replace worn flashing and improve attic ventilation. Before we schedule, we give you the shingle and color details your covenants or HOA ask for.",
        ],
      },
      {
        heading: "Algae streaks and shaded roofs in Crofton",
        paragraphs: [
          "Black streaks on a roof are algae, and they grow fastest on shaded, humid slopes. Atlas Pinnacle Pristine shingles carry 3M Scotchgard Protector to resist those streaks and keep a new roof looking clean longer.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Crofton, MD | Pineda's Roofing",
      description: "Roofing contractor in Crofton: roof replacement for 1960s to 1980s homes, covenant and HOA color details, algae-resistant shingles. Free inspections.",
    },
  },
  {
    slug: "odenton",
    name: "Odenton",
    kind: "city",
    tier: 1,
    county: "Anne Arundel County",
    state: "MD",
    featured: true,
    lead: "Odenton started as a railroad town and has grown fast next to Fort Meade. Pineda's Roofing is a roofing contractor in Odenton for townhome and single-family roof repair, replacement and storm damage inspections.",
    paragraphs: [
      "With Fort Meade next door, many Odenton homes belong to military families and people who work on post, and plenty are rented out while their owners are stationed elsewhere. Much of the housing is townhomes and single-family homes built in the last few decades, in communities like Piney Orchard and Seven Oaks.",
      "When you're away or your home is rented, a small leak can go unnoticed for a long time. A roof inspection with photos shows you the roof's condition even when you can't be there to see it.",
    ],
    highlights: [
      "Free roof inspections in Odenton",
      "Townhome roof replacement",
      "HOA shingle and color details",
      "Storm damage inspections with photos",
      "Gutters and gutter guards",
    ],
    neighborhoods: ["Piney Orchard", "Seven Oaks", "Two Rivers"],
    sections: [
      {
        heading: "Townhome roofing in Odenton",
        paragraphs: [
          "Townhome rows are often roofed at the same time, so they wear out together. When one unit is replaced, we tie the new roof into the neighbors' at the party walls and seal those joints, which is where townhome leaks usually start.",
          "Most Odenton communities have HOA rules on roof color, and we provide the product details for approval.",
        ],
      },
      {
        heading: "Roof inspections in Odenton before a move or sale",
        paragraphs: [
          "Getting ready to move, sell or rent your home out? We inspect the roof, flashing and gutters and send you photos and a written summary of what we found and what, if anything, needs work.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Odenton, MD | Pineda's Roofing",
      description: "Roofing contractor in Odenton near Fort Meade: townhome roof replacement, HOA color details and roof inspections with photos before a move or sale.",
    },
  },
  {
    slug: "pasadena",
    name: "Pasadena",
    kind: "city",
    tier: 1,
    county: "Anne Arundel County",
    state: "MD",
    featured: true,
    lead: "Pasadena is creek and river country, and its roofs take the wind and rain that come with it. Pineda's Roofing is a roofing contractor in Pasadena for wind damage repair, roof replacement and gutters.",
    paragraphs: [
      "Pasadena sits between the Patapsco and Magothy rivers, with neighborhoods along Rock Creek, Stoney Creek and Bodkin Creek. Many communities began as summer cottage colonies and grew into year-round neighborhoods, so homes range from enlarged cottages to newer waterfront houses.",
      "Wind-driven rain is the big problem here. Storms off the Bay push water sideways under shingle edges and behind flashing, and humid, shaded lots grow algae fast.",
    ],
    highlights: [
      "Free roof inspections in Pasadena",
      "Wind damage repair",
      "Chimney and flashing repair",
      "Algae-resistant Atlas shingles",
      "Storm damage inspections with photos",
    ],
    neighborhoods: ["Riviera Beach", "Lake Shore", "Green Haven"],
    sections: [
      {
        heading: "Wind-driven rain and roof repair in Pasadena",
        paragraphs: [
          "When rain blows sideways, it finds gaps a normal shower never would: lifted shingle tabs, loose drip edge and step flashing that was never sealed. We trace a leak back to where the water actually enters and fix that spot, not just the shingles over the stain.",
        ],
      },
      {
        heading: "Roofing on older cottages in Pasadena",
        paragraphs: [
          "Cottages that were added onto over the years often have roofs at several pitches, low-slope sections and tie-ins between old and new. We use a low-slope roof system where the pitch calls for it and rebuild the flashing where each addition meets the house.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Pasadena, MD | Pineda's Roofing",
      description: "Roofing contractor in Pasadena, MD: leak repair for wind-driven rain, roof replacement for creekside homes and cottages, algae-resistant shingles.",
    },
  },
  {
    slug: "edgewater",
    name: "Edgewater",
    kind: "city",
    tier: 1,
    county: "Anne Arundel County",
    state: "MD",
    featured: true,
    lead: "Pineda's Roofing is a roofing contractor in Edgewater for waterfront and wooded homes along the South River and the Mayo Peninsula, with roof replacement, repair and storm damage inspections.",
    paragraphs: [
      "Edgewater sits across the South River from Annapolis, with neighborhoods tucked along the creeks that feed the South and Rhode rivers. Some homes are right on the water. Many more are on wooded lots a short walk from it.",
      "Waterfront homes take wind and wind-driven rain head-on, while wooded lots deal with falling limbs and shade. Both show up on the roof: lifted shingles and loose flashing near the water, and moss, algae and clogged gutters under the trees.",
    ],
    highlights: [
      "Free roof inspections in Edgewater",
      "Wind damage repair",
      "Chimney and flashing repair",
      "Gutters and gutter guards",
      "Atlas Pinnacle Pristine shingles",
    ],
    neighborhoods: ["Mayo", "Londontowne", "Selby-on-the-Bay"],
    sections: [
      {
        heading: "Roof replacement on the water in Edgewater",
        paragraphs: [
          "Close to the water, a roof's edges take most of the force. On new roofs we use sealed starter strips, solid drip edge and rake metal, and high-wind nailing so shingles stay put in a nor'easter or a summer squall.",
        ],
      },
      {
        heading: "Wooded lots and gutters in Edgewater",
        paragraphs: [
          "Under tall trees, gutters fill fast and roofs stay damp. We clean or replace gutters, add guards where leaf fall is heavy and check shaded slopes for soft spots and moss. For new roofs, algae-resistant Atlas shingles help keep black streaks away.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Edgewater, MD | Pineda's Roofing",
      description: "Roofing contractor in Edgewater: roof replacement and wind damage repair for waterfront and wooded homes on the South River. Free roof inspections.",
    },
  },

  /* ── Prince George's County ───────────────────────────────────────── */
  {
    slug: "hyattsville",
    name: "Hyattsville",
    kind: "city",
    tier: 1,
    county: "Prince George's County",
    state: "MD",
    featured: true,
    lead: "Hyattsville's porches, gables and old trees are a big part of its charm, and they're why its roofs need a careful hand. Pineda's Roofing is a roofing contractor in Hyattsville for older-home roof repair and replacement.",
    paragraphs: [
      "Hyattsville is one of Prince George's County's older towns, with Victorians, foursquares and Craftsman bungalows from the late 1800s and early 1900s, many inside its historic district. Newer streets filled in with Cape Cods and brick colonials after the war.",
      "The older homes have gables, dormers, porch roofs and chimneys, plus decking that has been through many rounds of re-roofing. Some still have built-in box gutters, which rot from the inside when they leak.",
    ],
    highlights: [
      "Free roof inspections in Hyattsville",
      "Chimney and flashing repair",
      "Flat and low-slope roofs",
      "Gutters and gutter guards",
      "Siding and trim repair",
    ],
    neighborhoods: ["Historic Hyattsville", "University Hills", "West Hyattsville"],
    sections: [
      {
        heading: "Roof repair on older Hyattsville homes",
        paragraphs: [
          "On a Victorian or foursquare, a leak can start at a dormer, a porch tie-in, a chimney or a box gutter. We find which one it is before we fix anything, and we replace rotted trim and fascia along with the roofing when we find it.",
        ],
      },
      {
        heading: "Porch roofs in Hyattsville",
        paragraphs: [
          "Front and wraparound porches often have a low-slope roof that shingles weren't made for. We replace those with a flat or low-slope roof system and reflash the joint where the porch meets the house.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Hyattsville, MD | Pineda's Roofing",
      description: "Roofing contractor in Hyattsville: roof repair for Victorians and bungalows, porch roofs, box gutters and chimney flashing. Family-owned, MHIC# 142024.",
    },
  },
  {
    slug: "greenbelt",
    name: "Greenbelt",
    kind: "city",
    tier: 1,
    county: "Prince George's County",
    state: "MD",
    featured: true,
    lead: "Greenbelt was built in the 1930s as a New Deal planned town, and its homes still follow that plan. Pineda's Roofing is a roofing contractor in Greenbelt for roof repair and replacement on its townhomes, rowhouses and single-family homes.",
    paragraphs: [
      "Old Greenbelt's rowhouses and garden apartments were built by the federal government as one of the New Deal's \"greenbelt\" towns, laid out around walkways, a town center and the lake. Many of the original homes are part of a housing cooperative, which sets the rules for exterior work.",
      "Greenbelt also has single-family homes in neighborhoods like Boxwood Village and Lakewood, and townhome and condo communities east of the Parkway. Tall trees around the lake and Greenbelt Park shade many roofs and fill gutters every fall.",
    ],
    highlights: [
      "Free roof inspections in Greenbelt",
      "Townhome roof replacement",
      "Flat and low-slope roofs",
      "Gutters and gutter guards",
      "Storm damage inspections with photos",
    ],
    neighborhoods: ["Old Greenbelt", "Boxwood Village", "Lakewood", "Windsor Green"],
    sections: [
      {
        heading: "Roofing in Old Greenbelt",
        paragraphs: [
          "If your home is part of the cooperative, roof and exterior work goes through the cooperative's own process, so check with them first. For homes outside the co-op, we inspect, repair and replace roofs with a tear-off to the deck, new flashing and photos of what we find.",
        ],
      },
      {
        heading: "Townhome and single-family roofs in Greenbelt",
        paragraphs: [
          "Townhomes in the newer parts of Greenbelt share roof lines with their neighbors, and many communities have rules on shingle color. We tie each new roof into the next one cleanly and provide the product details for approval.",
          "On single-family homes under big trees, we check gutters and shaded slopes on every visit, since that's where water and rot build up.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Greenbelt, MD | Pineda's Roofing",
      description: "Roofing contractor in Greenbelt: roof repair and replacement for townhomes, rowhouses and single-family homes, gutters and storm damage inspections.",
    },
  },
  {
    slug: "clinton",
    name: "Clinton",
    kind: "city",
    tier: 1,
    county: "Prince George's County",
    state: "MD",
    featured: true,
    lead: "Clinton's roomy lots and tall trees are a big part of its appeal, and they shape what its roofs go through. Pineda's Roofing is a roofing contractor in Clinton for roof replacement, repair and storm damage inspections.",
    paragraphs: [
      "Clinton, once called Surrattsville, is home to the historic Surratt House, but most of its housing is suburban: ranchers, split-levels and colonials from the 1960s through the 1980s, with newer subdivisions farther out.",
      "Many homes sit on wooded lots. Summer thunderstorms bring down limbs, fall leaves fill the gutters and shaded roofs grow moss and algae. Older homes may also have a second layer of shingles hiding soft decking underneath.",
    ],
    highlights: [
      "Free roof inspections in Clinton",
      "Roof replacement and repair",
      "Storm damage inspections with photos",
      "Gutters and gutter guards",
      "Siding and trim repair",
    ],
    sections: [
      {
        heading: "Fallen limbs and storm damage in Clinton",
        paragraphs: [
          "A falling limb can crack decking or break shingles even when the damage looks small from the ground. We inspect the whole roof, photograph every problem we find and tarp an opening to keep water out. We can also meet with your adjuster.",
        ],
      },
      {
        heading: "Roof replacement on 1960s to 1980s homes in Clinton",
        paragraphs: [
          "Homes from these decades are often on their second or third roof. We tear off every layer, repair the decking and add the attic ventilation many of these houses were built without.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Clinton, MD | Pineda's Roofing",
      description: "Roofing contractor in Clinton, MD: roof replacement for 1960s to 1980s homes, storm damage inspections with photos after fallen limbs, and gutters.",
    },
  },

  /* ── Carroll County ───────────────────────────────────────────────── */
  {
    slug: "eldersburg",
    name: "Eldersburg",
    kind: "city",
    tier: 2,
    county: "Carroll County",
    state: "MD",
    featured: true,
    lead: "Pineda's Roofing is a roofing contractor in Eldersburg for roof replacement, ice dam and wind damage repair, and gutters on the subdivisions around Liberty Road.",
    paragraphs: [
      "Eldersburg grew into a busy suburb in southern Carroll County, near Liberty Reservoir and the Route 26 and Route 32 corridors. Most homes are colonials, split-foyers and townhomes from the 1980s and 1990s, and many are still on their first or second roof.",
      "Carroll County winters bring more snow and ice than the communities closer to the Bay, and open lots let wind hit roofs from every side. Ice dams and wind-lifted shingles are two of the most common problems on homes like these.",
    ],
    highlights: [
      "Free roof inspections in Eldersburg",
      "Ice dam prevention and repair",
      "Wind damage repair",
      "Roof replacement and repair",
      "Gutters and gutter guards",
    ],
    neighborhoods: ["Carrolltowne", "Sykesville"],
    sections: [
      {
        heading: "Replacing original roofs in Eldersburg",
        paragraphs: [
          "When a roof from the 1980s or 1990s is replaced, we tear off to the deck, add ice and water shield at the eaves and valleys and correct the attic ventilation. That combination is what keeps ice dams from coming back.",
          "On open lots, we also nail shingles to the manufacturer's high-wind pattern and use sealed starter strips at the edges.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Eldersburg, MD | Pineda's Roofing",
      description: "Roofing contractor in Eldersburg: roof replacement for 1980s and 1990s homes, ice dam and wind damage repair, gutters. Free roof inspections.",
    },
  },
  {
    slug: "sykesville",
    name: "Sykesville",
    kind: "city",
    tier: 2,
    county: "Carroll County",
    state: "MD",
    featured: true,
    lead: "Sykesville's historic Main Street runs down to the Patapsco, and newer neighborhoods spread out around it. Pineda's Roofing is a roofing contractor in Sykesville for both.",
    paragraphs: [
      "Downtown Sykesville grew up around the railroad along the Patapsco River, and its older homes have steep roofs, porches, chimneys and decades-old flashing. Some sit on steep hillsides, where gutters and downspouts have to move a lot of water.",
      "Around the town, newer subdivisions blend into Eldersburg, with roofs from the 1980s on that are now due for replacement. Like the rest of Carroll County, Sykesville gets snow, ice and strong winter wind.",
    ],
    highlights: [
      "Free roof inspections in Sykesville",
      "Chimney and flashing repair",
      "Roof replacement and repair",
      "Gutters and gutter guards",
      "Siding and trim repair",
    ],
    neighborhoods: ["Downtown Sykesville", "Eldersburg"],
    sections: [
      {
        heading: "Older homes along Main Street in Sykesville",
        paragraphs: [
          "Many of the town's older homes have steep roofs, porch roofs and brick chimneys. We rebuild chimney and porch flashing instead of reusing worn metal. If your home is in the town's historic district, visible exterior changes can need review, and we give you product details and photos for it.",
        ],
      },
      {
        heading: "Gutters on hillside homes in Sykesville",
        paragraphs: [
          "On a steep lot, water from the roof has to be carried well away from the foundation. We size gutters and downspouts for the roof and make sure they drain away from the house, not toward the next wall downhill.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Sykesville, MD | Pineda's Roofing",
      description: "Roofing contractor in Sykesville: roof repair for historic Main Street homes, chimney flashing, gutters for hillside lots and roof replacement.",
    },
  },

  /* ── Frederick County ─────────────────────────────────────────────── */
  {
    slug: "urbana",
    name: "Urbana",
    kind: "city",
    tier: 2,
    county: "Frederick County",
    state: "MD",
    featured: true,
    lead: "Urbana has grown from a small crossroads into one of Frederick County's newer planned communities. Pineda's Roofing is a roofing contractor in Urbana for roof replacement, HOA approvals and storm damage inspections.",
    paragraphs: [
      "Most Urbana homes are in the Villages of Urbana and nearby communities built in the last few decades, with townhomes and single-family homes under HOA rules. The earliest of them are reaching the age when builder roofs start to fail.",
      "Urbana sits on open, rolling land along I-270, with Sugarloaf Mountain to the south. Wind crosses that open ground easily, and winters bring more snow and ice than the suburbs closer to D.C.",
    ],
    highlights: [
      "Free roof inspections in Urbana",
      "HOA shingle and color details",
      "Townhome roof replacement",
      "Ice dam prevention and repair",
      "Atlas Pinnacle Pristine shingles",
    ],
    neighborhoods: ["Villages of Urbana", "Urbana Highlands"],
    sections: [
      {
        heading: "Builder-grade roofs in Urbana",
        paragraphs: [
          "Builder-grade roofs on newer homes often have thin underlayment and minimal ventilation. When one starts to fail, we replace it with a full tear-off, synthetic underlayment, ice and water shield at the eaves and valleys, and proper ridge venting.",
        ],
      },
      {
        heading: "HOA approvals for a new roof in Urbana",
        paragraphs: [
          "Most Urbana communities have an architectural review process for roof color and style. We give you the shingle line, color name and product sheet for your application and schedule the work after approval.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Urbana, MD | Pineda's Roofing",
      description: "Roofing contractor in Urbana: replacing builder-grade roofs, HOA shingle and color details, townhome roofs and ice dam prevention. Free inspections.",
    },
  },
  {
    slug: "middletown",
    name: "Middletown",
    kind: "city",
    tier: 2,
    county: "Frederick County",
    state: "MD",
    featured: true,
    lead: "Middletown's historic Main Street and the farmland around it sit in a wide valley between Catoctin Mountain and South Mountain. Pineda's Roofing is a roofing contractor in Middletown for roofs that face that valley's wind and winters.",
    paragraphs: [
      "Along Main Street, older brick and frame homes have steep roofs, chimneys and decades-old flashing. Around the town, newer subdivisions and farmhouses on open land make up the rest of the Middletown Valley.",
      "Wind moves through the valley with little to slow it down, and winters here are colder and snowier than in the D.C. suburbs. Ice dams, lifted shingles and chimney leaks are the problems homes here face most.",
    ],
    highlights: [
      "Free roof inspections in Middletown",
      "Chimney and flashing repair",
      "Ice dam prevention and repair",
      "Wind damage repair",
      "Roof replacement and repair",
    ],
    neighborhoods: ["Historic Main Street", "Middletown Valley"],
    sections: [
      {
        heading: "Chimney leaks on older Middletown homes",
        paragraphs: [
          "On older Middletown homes, the chimney is the most common leak point. We repair the step and counter flashing, check the mortar and the cap, and fix the chimney and the roof around it together.",
        ],
      },
      {
        heading: "Roofs on open land around Middletown",
        paragraphs: [
          "Farmhouses and homes on open lots take the full force of the wind. We use sealed starter strips at every edge and nail shingles to the manufacturer's high-wind pattern, and every new roof gets ice and water shield at the eaves and valleys for winter.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Middletown, MD | Pineda's Roofing",
      description: "Roofing contractor in Middletown, MD: chimney leak repair on older homes, wind-resistant roofs for open land and ice dam prevention. Free inspections.",
    },
  },
  {
    slug: "new-market",
    name: "New Market",
    kind: "city",
    tier: 2,
    county: "Frederick County",
    state: "MD",
    featured: true,
    lead: "New Market was laid out in the 1790s, and its Main Street is still lined with homes from its early days. Pineda's Roofing is a roofing contractor in New Market for those historic homes and the newer communities around Lake Linganore.",
    paragraphs: [
      "New Market's historic district along Main Street is known for its antique shops and its long row of old brick and frame homes, with steep roofs, chimneys and porches. Old homes mean old flashing, and often decking that has been patched more than once.",
      "Just outside town, Lake Linganore and the subdivisions around it have homes from the last few decades, many under HOA rules and many ready for their first replacement. Old and new homes alike face Frederick County's colder winters and the ice dams that come with them.",
    ],
    highlights: [
      "Free roof inspections in New Market",
      "Chimney and flashing repair",
      "HOA shingle and color details",
      "Ice dam prevention and repair",
      "Atlas Pinnacle Pristine shingles",
    ],
    neighborhoods: ["Historic New Market", "Lake Linganore"],
    sections: [
      {
        heading: "Historic district roofing in New Market",
        paragraphs: [
          "Exterior changes in New Market's historic district can need review before work starts, so plan ahead. We provide the product information and photos for the application and schedule after approval.",
          "On homes this old, we expect some decking and flashing repair under the shingles, and we tell you so up front.",
        ],
      },
      {
        heading: "Roofs around Lake Linganore",
        paragraphs: [
          "Homes around Lake Linganore sit on wooded, hilly lots, where shade keeps roofs damp and gutters fill with leaves. We check for algae, soft spots and gutter overflow, and we provide the product details your HOA needs for a new roof.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in New Market, MD | Pineda's Roofing",
      description: "Roofing contractor in New Market: roofing for historic district homes and Lake Linganore communities, chimney flashing and ice dams. Free inspections.",
    },
  },

  /* ── Montgomery County ────────────────────────────────────────────── */
  {
    slug: "aspen-hill",
    name: "Aspen Hill",
    kind: "city",
    tier: 2,
    county: "Montgomery County",
    state: "MD",
    featured: true,
    lead: "Pineda's Roofing is based nearby in Silver Spring and is a roofing contractor in Aspen Hill for roof replacement, repair and gutters on its split-levels, ramblers and townhomes.",
    paragraphs: [
      "Much of Aspen Hill was built in the 1960s and 1970s along Georgia Avenue and Connecticut Avenue, with split-levels, ramblers, colonials and rows of townhomes. Many are on their second or third roof, sometimes with an extra layer that hides problems underneath.",
      "Split-levels have roofs at different heights and walls where they meet, a common source of leaks. Townhome rows share edges with their neighbors and often follow HOA color rules.",
    ],
    highlights: [
      "Free roof inspections in Aspen Hill",
      "Close to our Silver Spring base",
      "Townhome roof replacement",
      "Gutters and gutter guards",
      "Storm damage inspections with photos",
    ],
    neighborhoods: ["Bel Pre", "Layhill"],
    sections: [
      {
        heading: "Split-level roof replacement in Aspen Hill",
        paragraphs: [
          "On a split-level, the wall between the upper and lower roofs needs new step flashing, with the siding or trim above it lapped correctly. We rebuild those joints with the new roof and add the attic ventilation many of these homes were built without.",
        ],
      },
      {
        heading: "Townhome roofs in Aspen Hill",
        paragraphs: [
          "When one townhome in a row gets a new roof, the tie-ins at the party walls decide whether it stays dry. We seal those transitions and give you the shingle and color details your HOA asks for.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Aspen Hill, MD | Pineda's Roofing",
      description: "Roofing contractor in Aspen Hill, near our Silver Spring base: split-level and townhome roof replacement, roof repair and gutters. Free inspections.",
    },
  },
  {
    slug: "takoma-park",
    name: "Takoma Park",
    kind: "city",
    tier: 2,
    county: "Montgomery County",
    state: "MD",
    featured: true,
    lead: "Takoma Park's Victorians, bungalows and foursquares sit under a heavy tree canopy. Pineda's Roofing, based next door in Silver Spring, is a roofing contractor in Takoma Park for older-home roof repair and replacement.",
    paragraphs: [
      "Takoma Park began as an early railroad suburb in the 1880s, and much of it is a county historic district. Its streets are lined with Victorians, Craftsman bungalows and foursquares, many with porches, dormers and chimneys.",
      "The big trees are part of the town's character. They also drop limbs in storms, fill gutters every fall and keep roofs shaded and damp, which is hard on older shingles and wood trim.",
    ],
    highlights: [
      "Free roof inspections in Takoma Park",
      "Based next door in Silver Spring",
      "Chimney and flashing repair",
      "Gutters and gutter guards",
      "Siding and trim repair",
    ],
    neighborhoods: ["Old Takoma", "North Takoma", "Pinecrest"],
    sections: [
      {
        heading: "Roof replacement in the Takoma Park historic district",
        paragraphs: [
          "Inside the historic district, exterior changes can need review by Montgomery County's Historic Preservation Commission. We give you the product details and photos for the application and plan the timing around it.",
        ],
      },
      {
        heading: "Older-home roof repair in Takoma Park",
        paragraphs: [
          "On a bungalow or Victorian, leaks often start where a porch roof meets the wall, around a dormer or at the chimney. We find the real entry point and repair the flashing, decking and trim together.",
        ],
      },
      {
        heading: "Gutters under the trees in Takoma Park",
        paragraphs: [
          "Leaves and seed pods clog gutters fast here, and overflowing water rots fascia and soaks foundations. We clean or replace gutters and add gutter guards where the canopy is heaviest.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Takoma Park, MD | Pineda's Roofing",
      description: "Roofing contractor in Takoma Park: roof repair and replacement for Victorians and bungalows, historic district details, chimney flashing and gutters.",
    },
  },

  /* ── Charles County ───────────────────────────────────────────────── */
  {
    slug: "waldorf",
    name: "Waldorf",
    kind: "city",
    tier: 2,
    county: "Charles County",
    state: "MD",
    featured: true,
    lead: "Waldorf has grown fast, and much of that growth is townhomes. Pineda's Roofing is a roofing contractor in Waldorf for townhome and single-family roof replacement, repair and storm damage inspections.",
    paragraphs: [
      "Waldorf and neighboring St. Charles, a planned community started in the 1970s, have spread out along Route 301 and Route 228. Many homes are townhomes and single-family homes in HOA communities, and roofs from the 1980s through the 2000s are now ready for replacement.",
      "Southern Maryland summers are hot and humid, with strong thunderstorms and the occasional remnants of a tropical storm. That means wind-lifted shingles, algae on shaded slopes and gutters that overflow in a downpour.",
    ],
    highlights: [
      "Free roof inspections in Waldorf",
      "Townhome roof replacement",
      "HOA shingle and color details",
      "Storm damage inspections with photos",
      "Algae-resistant Atlas shingles",
    ],
    neighborhoods: ["St. Charles", "Westlake", "Dorchester", "Smallwood"],
    sections: [
      {
        heading: "Townhome roof replacement in Waldorf",
        paragraphs: [
          "In a townhome row, each roof meets the next at the party wall. We tie the new roof into the neighbors' and seal those joints, and we can price the whole row when neighbors want to replace together.",
          "HOAs in Waldorf and St. Charles usually set rules on shingle color and style, so we give you the product details for approval first.",
        ],
      },
      {
        heading: "Storm damage roof repair in Waldorf",
        paragraphs: [
          "After a thunderstorm or tropical storm, we inspect for lifted, creased or missing shingles and damaged flashing, and we document everything with photos. We can also meet with your adjuster.",
        ],
      },
    ],
    seo: {
      title: "Roofing Contractor in Waldorf, MD | Pineda's Roofing",
      description: "Roofing contractor in Waldorf: townhome and single-family roof replacement, HOA color details and storm damage inspections with photos. Free inspections.",
    },
  },
];

/** [longitude, latitude] for the service-area map. */
export const newCityCoords: Record<string, [number, number]> = {
  "Owings Mills": [-76.7957, 39.4042],
  Pikesville: [-76.708, 39.3852],
  Parkville: [-76.5397, 39.3773],
  "Perry Hall": [-76.4636, 39.4126],
  Dundalk: [-76.5205, 39.2507],
  Halethorpe: [-76.6833, 39.2393],
  Clarksville: [-76.9429, 39.2065],
  "West Friendship": [-76.9586, 39.2997],
  Crofton: [-76.6842, 39.016],
  Odenton: [-76.6876, 39.0658],
  Pasadena: [-76.5711, 39.1073],
  Edgewater: [-76.5499, 38.9571],
  Hyattsville: [-76.9409, 38.9529],
  Greenbelt: [-76.8757, 39.0046],
  Clinton: [-76.8983, 38.7651],
  Eldersburg: [-76.9474, 39.4137],
  Sykesville: [-76.9689, 39.366],
  Urbana: [-77.3416, 39.3206],
  Middletown: [-77.5454, 39.4438],
  "New Market": [-77.2726, 39.3828],
  "Aspen Hill": [-77.0866, 39.0903],
  "Takoma Park": [-77.0075, 38.9779],
  Waldorf: [-76.9391, 38.6246],
};
