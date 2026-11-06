import type { Img } from "../types";
import { images } from "./images.ts";

/*
 * Project example pages (/projects). Each page needs a REAL city or county, the problem found and what was done.
 * Roberto has not supplied those facts yet, so every fact slot is a [PLACEHOLDER]. The photos are real Pineda's
 * job photos already on the site; which job each one shows (and where) is for Roberto to confirm.
 * Nothing here is a claim about a specific customer or address.
 */

export type ProjectStudy = {
  slug: string;
  title: string;
  /** Service this job belongs to, linked from the page. */
  service: { label: string; href: string };
  /** City or county. PLACEHOLDER until confirmed. */
  location: string;
  /** Link to the place's service-area page once the location is known. */
  locationHref?: string;
  problem: string;
  work: string[];
  result: string;
  photos: Img[];
  before?: Img;
  after?: Img;
};

export const projectStudies: ProjectStudy[] = [
  {
    slug: "chimney-crown-rebuild",
    title: "Chimney rebuild and new crown",
    service: { label: "Chimney repair", href: "/services/chimneys" },
    location: "[PLACEHOLDER: city or county of this job]",
    problem: "[PLACEHOLDER: what was wrong, in Roberto's words. The photos show a brick chimney with the top courses being rebuilt before a new crown.]",
    work: ["Rebuilt the top courses of the chimney (from the job photos)", "Formed and poured a new crown around the flues (from the job photos)", "Installed new chimney caps (from the job photos)", "[PLACEHOLDER: anything else done, materials used, how long it took]"],
    result: "[PLACEHOLDER: outcome and anything the homeowner told us.]",
    photos: [images.chimneyCrownRebuildBefore, images.chimneyCrownPour, images.chimneyCrownRebuildAfter],
    before: images.chimneyCrownRebuildBefore,
    after: images.chimneyCrownRebuildAfter,
  },
  {
    slug: "chimney-repointing-and-caps",
    title: "Chimney repointing and new caps",
    service: { label: "Chimney repair", href: "/services/chimneys" },
    location: "[PLACEHOLDER: city or county of this job]",
    problem: "[PLACEHOLDER: what was wrong. The before photo shows stained, crumbling mortar and an old crown.]",
    work: ["Repointed the brick (fresh mortar joints, from the job photos)", "New crown and two flue caps (from the job photos)", "[PLACEHOLDER: anything else done, materials used, how long it took]"],
    result: "[PLACEHOLDER: outcome and anything the homeowner told us.]",
    photos: [images.chimneyRepointBefore, images.chimneyRepointCaps],
    before: images.chimneyRepointBefore,
    after: images.chimneyRepointCaps,
  },
  {
    slug: "storm-damage-fallen-tree",
    title: "Storm damage from a fallen tree",
    service: { label: "Storm restoration", href: "/services/storm-restoration" },
    location: "[PLACEHOLDER: city or county of this job]",
    problem: "[PLACEHOLDER: what happened and what the roof looked like. The photo shows a fallen tree resting on a house roof after a storm.]",
    work: ["[PLACEHOLDER: emergency tarping or securing, if done]", "[PLACEHOLDER: repairs and replacement work]", "[PLACEHOLDER: insurance documentation, if Pineda's helped with it]"],
    result: "[PLACEHOLDER: outcome.]",
    photos: [images.fallenTreeHouse],
  },
  {
    slug: "new-shingle-roof-two-story",
    title: "New shingle roof on a two-story home",
    service: { label: "Roof replacement", href: "/services/roof-replacement" },
    location: "[PLACEHOLDER: city or county of this job]",
    problem: "[PLACEHOLDER: age and condition of the old roof, and why it was replaced.]",
    work: ["Synthetic underlayment installed before the shingles (from the job photos)", "New shingle roof installed (from the job photos)", "[PLACEHOLDER: shingle product and color, flashing and ventilation work, how long it took]"],
    result: "[PLACEHOLDER: outcome.]",
    photos: [images.aerialNewShingleRoof, images.homeNewRoofAerial],
  },
];
