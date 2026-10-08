import type { Img } from "../types";

/* Brand and insurer logo files in /public/images/logos, keyed by lower-case name. Uploading a logo in /cms overrides these. */
export const localLogos: Record<string, Img | undefined> = {
  "allstate": { src: "/images/logos/allstate.svg", alt: "Allstate logo", width: 600, height: 127 },
  "atlas": { src: "/images/logos/atlas.svg", alt: "Atlas logo", width: 600, height: 412 },
  "englert": { src: "/images/logos/englert.svg", alt: "Englert logo", width: 600, height: 106 },
  "farmers insurance": { src: "/images/logos/farmers.svg", alt: "Farmers Insurance logo", width: 600, height: 321 },
  "firestone": { src: "/images/logos/firestone.svg", alt: "Firestone logo", width: 600, height: 155 },
  "lomanco": { src: "/images/logos/lomanco.svg", alt: "Lomanco logo", width: 600, height: 164 },
  "mule-hide": { src: "/images/logos/mule-hide.png", alt: "Mule-Hide logo", width: 800, height: 137 },
  "pac-clad": { src: "/images/logos/pac-clad.svg", alt: "PAC-CLAD logo", width: 600, height: 198 },
  "paslode": { src: "/images/logos/paslode.svg", alt: "Paslode logo", width: 600, height: 188 },
  "polyglass": { src: "/images/logos/polyglass.png", alt: "Polyglass logo", width: 800, height: 229 },
  "progressive": { src: "/images/logos/progressive.svg", alt: "Progressive logo", width: 600, height: 73 },
  "state farm": { src: "/images/logos/state-farm.svg", alt: "State Farm logo", width: 600, height: 83 },
  "stinger": { src: "/images/logos/stinger.png", alt: "Stinger logo", width: 800, height: 229 },
  "usaa": { src: "/images/logos/usaa.svg", alt: "USAA logo", width: 600, height: 605 },
};
