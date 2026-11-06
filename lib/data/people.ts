import type { Img } from "../types";
import { images } from "./images.ts";

/*
 * Team member pages (/about-us/roberto-pineda, /about-us/fredy-pineda).
 * Bios and final photos are NOT in hand yet (Roberto is resending them). Everything marked [PLACEHOLDER ...]
 * is a slot for real content. The photos below are the ones already on the old site; swap them when the new
 * ones arrive. Nothing here is a claim about a person: roles come from Roberto's Nov 6 request
 * (Roberto = owner, Fredy = partner), to be confirmed.
 */

export type PersonPage = {
  slug: string;
  name: string;
  role: string;
  /** Short card text on the About page. */
  summary: string;
  image?: Img;
  /** Bio paragraphs. Placeholders are marked. */
  bio: string[];
  /** Short "what they handle" boxes. Placeholders are marked. */
  focus: string[];
  /** Short personal facts to fill in. */
  facts: { label: string; value: string }[];
};

export const PH = "[PLACEHOLDER]";

export const people: PersonPage[] = [
  {
    slug: "roberto-pineda",
    name: "Roberto Pineda",
    role: "Owner",
    summary: "Roberto is the owner of Pineda's Roofing. [PLACEHOLDER: one sentence about Roberto from his own words.]",
    image: images.robertoPineda,
    bio: [
      "[PLACEHOLDER: Roberto's bio goes here. Roberto is resending his bio and photo. Suggested points: how he got into roofing, how long he has worked in the trade, what he is proud of, and what he wants every customer to know.]",
      "[PLACEHOLDER: Roberto's role in the company today, for example estimates, customer calls, jobsite visits or crew scheduling. To be confirmed by Roberto.]",
    ],
    focus: ["[PLACEHOLDER: what Roberto handles]", "[PLACEHOLDER: areas he works in]", "[PLACEHOLDER: a favorite kind of project]"],
    facts: [
      { label: "Role", value: "Owner" },
      { label: "Based in", value: "Silver Spring, MD" },
      { label: "Years in roofing", value: "[PLACEHOLDER]" },
      { label: "Languages", value: "[PLACEHOLDER]" },
    ],
  },
  {
    slug: "fredy-pineda",
    name: "Fredy Pineda",
    role: "Partner",
    summary: "Fredy is a partner at Pineda's Roofing. [PLACEHOLDER: one sentence about Fredy from his own words.]",
    image: images.freddyPineda,
    bio: [
      "[PLACEHOLDER: Fredy's bio goes here. Roberto is resending the bios and photos. Suggested points: how he got into roofing, how long he has worked in the trade, what he is proud of, and what he wants every customer to know.]",
      "[PLACEHOLDER: Fredy's role in the company today, for example estimates, customer calls, jobsite visits or crew scheduling. To be confirmed by Roberto.]",
    ],
    focus: ["[PLACEHOLDER: what Fredy handles]", "[PLACEHOLDER: areas he works in]", "[PLACEHOLDER: a favorite kind of project]"],
    facts: [
      { label: "Role", value: "Partner" },
      { label: "Based in", value: "Silver Spring, MD" },
      { label: "Years in roofing", value: "[PLACEHOLDER]" },
      { label: "Languages", value: "[PLACEHOLDER]" },
    ],
  },
];
