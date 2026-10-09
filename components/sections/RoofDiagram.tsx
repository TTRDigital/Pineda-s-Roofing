import type { Card, Heading } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";

/* Hotspot positions in the SVG's 800 x 520 space, in the order of the CMS list. */
const SPOTS: [number, number][] = [
  [400, 126], // ridge vent
  [628, 236], // shingles
  [478, 196], // underlayment
  [470, 312], // ice & water shield
  [338, 226], // decking
  [186, 270], // rafters
];

function Label({ card, n, align }: { card: Card; n: number; align: "left" | "right" }) {
  return (
    <li className={`flex items-start gap-4 ${align === "right" ? "lg:flex-row" : "lg:flex-row-reverse lg:text-right"}`} data-reveal style={{ "--i": n } as React.CSSProperties}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink font-display text-base font-bold text-cyan">{n}</span>
      <span>
        <span className="block font-sans text-[1.125rem] font-bold text-ink">{card.title}</span>
        {card.text ? <span className="mt-1 block text-[0.95rem] leading-relaxed text-body">{card.text}</span> : null}
      </span>
    </li>
  );
}

/**
 * "What's under your shingles": a cutaway roof that peels back layer by
 * layer, with numbered hotspots that match the labels around it.
 */
export function RoofDiagram({ intro, layers }: { intro: Heading; layers: Card[] }) {
  if (!layers.length) return null;
  const left = layers.map((c, i) => ({ c, n: i + 1 })).filter((_, i) => i >= 3);
  const right = layers.map((c, i) => ({ c, n: i + 1 })).filter((_, i) => i < 3);
  return (
    <section className="section bg-white">
      <div className="container-x">
        <SectionHeading {...intro} />
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,8fr)_minmax(0,3fr)] lg:gap-6">
          <ul className="hidden gap-8 lg:order-1 lg:grid lg:grid-cols-1">
            {left.map(({ c, n }) => (
              <Label key={c.title} card={c} n={n} align="left" />
            ))}
          </ul>
          <figure className="lg:order-2" data-reveal>
            <svg viewBox="0 0 800 520" role="img" aria-label="Cutaway of a roof showing each layer from the rafters up to the shingles and ridge vent" className="h-auto w-full">
              <defs>
                <clipPath id="roof-clip">
                  <path d="M90 330 260 120h280l170 210Z" />
                </clipPath>
                <pattern id="shingles" width="40" height="22" patternUnits="userSpaceOnUse">
                  <rect width="40" height="22" fill="#2b2f36" />
                  <path d="M0 21.5h40M20 0v11M0 11h40M10 11v11M30 11v11" stroke="#1b1e23" strokeWidth="1.5" />
                  <rect x="2" y="2" width="16" height="8" fill="#343943" />
                  <rect x="22" y="13" width="16" height="7" fill="#30353e" />
                </pattern>
                <pattern id="decking" width="96" height="48" patternUnits="userSpaceOnUse">
                  <rect width="96" height="48" fill="#d9b886" />
                  <path d="M0 47.5h96M95.5 0v48" stroke="#b38f5d" strokeWidth="1.5" />
                  <path d="M10 12c14 4 30-3 48 2M30 30c12 3 26-2 40 1" stroke="#c9a46f" strokeWidth="1.2" fill="none" />
                </pattern>
                <pattern id="underlayment" width="60" height="26" patternUnits="userSpaceOnUse">
                  <rect width="60" height="26" fill="#e7ecf0" />
                  <path d="M0 25.5h60" stroke="#c7d0d8" strokeWidth="1.5" />
                  <text x="6" y="16" fontSize="7" fill="#9aa6b2" fontFamily="sans-serif" letterSpacing="1">
                    SYNTHETIC
                  </text>
                </pattern>
                <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#f4f6f8" />
                  <stop offset="1" stopColor="#e2e7ec" />
                </linearGradient>
              </defs>

              {/* ground shadow */}
              <ellipse cx="400" cy="492" rx="330" ry="16" fill="#0b0d10" opacity="0.08" />

              {/* walls */}
              <rect x="130" y="330" width="540" height="156" fill="url(#wall)" stroke="#cfd6dd" strokeWidth="2" />
              <rect x="190" y="370" width="74" height="70" rx="3" fill="#0b0d10" />
              <path d="M227 370v70M190 405h74" stroke="#e2e7ec" strokeWidth="3" />
              <rect x="536" y="370" width="74" height="70" rx="3" fill="#0b0d10" />
              <path d="M573 370v70M536 405h74" stroke="#e2e7ec" strokeWidth="3" />
              <rect x="372" y="380" width="56" height="106" rx="3" fill="#14171c" />
              <circle cx="418" cy="436" r="3" fill="#00b4f0" />

              {/* roof layers, peeled left to right */}
              <g clipPath="url(#roof-clip)">
                {/* rafters & trusses */}
                <rect x="80" y="110" width="200" height="230" fill="#f3e6d0" />
                {Array.from({ length: 9 }, (_, i) => (
                  <rect key={i} x={96 + i * 22} y="110" width="9" height="230" fill="#c48b4f" />
                ))}
                <path d="M80 300h200M80 230h200M80 160h200" stroke="#a8743f" strokeWidth="6" />
                {/* plywood decking */}
                <rect x="280" y="110" width="120" height="230" fill="url(#decking)" />
                {/* underlayment */}
                <rect x="400" y="110" width="140" height="230" fill="url(#underlayment)" />
                {/* ice & water shield along the eave */}
                <rect x="400" y="292" width="140" height="48" fill="#3a4049" />
                <path d="M400 292h140" stroke="#00b4f0" strokeWidth="2" strokeDasharray="6 5" />
                {/* shingles */}
                <rect x="540" y="110" width="180" height="230" fill="url(#shingles)" />
              </g>

              {/* roof outline, ridge vent, drip edge and gutter */}
              <path d="M90 330 260 120h280l170 210" fill="none" stroke="#0b0d10" strokeWidth="4" strokeLinejoin="round" />
              <rect x="252" y="110" width="296" height="14" rx="4" fill="#0b0d10" />
              <path d="M268 117h264" stroke="#00b4f0" strokeWidth="2" strokeDasharray="4 6" />
              <path d="M84 334h632" stroke="#9aa6b2" strokeWidth="4" />
              <rect x="80" y="336" width="640" height="12" rx="4" fill="#cfd6dd" />

              {/* hotspots */}
              {SPOTS.slice(0, layers.length).map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="16" fill="#00b4f0" className="hotspot-ping" />
                  <circle cx={x} cy={y} r="16" fill="#00b4f0" stroke="#fff" strokeWidth="3" />
                  <text x={x} y={y + 5.5} textAnchor="middle" fontSize="16" fontWeight="700" fill="#0b0d10" fontFamily="sans-serif">
                    {i + 1}
                  </text>
                </g>
              ))}
            </svg>
          </figure>
          <ul className="hidden gap-8 lg:order-3 lg:grid lg:grid-cols-1">
            {right.map(({ c, n }) => (
              <Label key={c.title} card={c} n={n} align="right" />
            ))}
          </ul>
          {/* Phones and tablets: one list in order 1 to 6, under the diagram. */}
          <ol className="grid gap-7 sm:grid-cols-2 lg:hidden">
            {layers.map((c, i) => (
              <Label key={c.title} card={c} n={i + 1} align="right" />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
