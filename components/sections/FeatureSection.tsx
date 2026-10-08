import type { FeatureBlock } from "@/lib/types";
import { IconTile } from "@/components/ui/Icon";
import { HighlightBoxes } from "@/components/ui/HighlightBoxes";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";

/**
 * The client's preferred way to present a service: photo on one side; on the
 * other an icon tile, heading with a cyan rule, a larger lead sentence, one
 * or two short paragraphs, then "What we offer" highlight boxes and buttons.
 */
export function FeatureSection({
  block,
  index = 0,
  tone = "white",
  headingLevel = "h2",
}: {
  block: FeatureBlock;
  index?: number;
  tone?: "white" | "mist" | "dark";
  headingLevel?: "h2" | "h3";
}) {
  const dark = tone === "dark";
  const imageRight = block.imageSide ? block.imageSide === "right" : index % 2 === 1;
  const H = headingLevel;
  const bg = dark ? "bg-ink on-dark" : tone === "mist" ? "bg-mist" : "bg-white";

  return (
    <section id={block.anchor} className={`section ${bg}`}>
      <div className={`container-x grid items-center gap-12 lg:gap-16 ${imageRight ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"}`}>
        {block.image ? (
          <div className={`relative isolate ${imageRight ? "lg:order-2" : ""}`} data-reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-photo)] lg:aspect-[4/3.4]">
              <Photo image={block.image} sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
            <span aria-hidden="true" className={`absolute -bottom-4 h-24 w-24 rounded-[var(--radius-card)] bg-cyan ${imageRight ? "-right-4" : "-left-4"} -z-10 hidden lg:block`} />
          </div>
        ) : null}

        <div className={block.image ? "" : "lg:col-span-2 lg:max-w-4xl"}>
          {block.icon ? (
            <div data-reveal>
              <IconTile name={block.icon} dark={dark} />
            </div>
          ) : null}
          {block.eyebrow ? (
            <p className={`eyebrow mt-6 ${dark ? "on-dark" : ""}`} data-reveal>
              {block.eyebrow}
            </p>
          ) : null}
          <H className={`mt-4 text-h2 uppercase ${dark ? "text-white" : "text-ink"}`} data-reveal>
            {block.title}
          </H>
          <span className="accent-rule mt-5" aria-hidden="true" />
          {block.lead ? (
            <p className={`mt-6 text-lead ${dark ? "text-white" : "text-ink"}`} data-reveal>
              {block.lead}
            </p>
          ) : null}
          {block.paragraphs?.length ? (
            <div className={`prose-short mt-5 ${dark ? "text-on-dark" : "text-body"}`} data-reveal>
              {block.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          ) : null}
          {block.highlights?.length ? (
            <div className="mt-8">
              <HighlightBoxes items={block.highlights} label={block.highlightsLabel ?? "What we offer"} />
            </div>
          ) : null}
          {block.ctas?.length ? (
            <div className="mt-9 flex flex-wrap gap-4" data-reveal>
              {block.ctas.map((c, i) => (
                <Button key={c.href + c.label} href={c.href} variant={i === 0 ? (dark ? "primary" : "dark") : dark ? "outline-light" : "outline"} arrow={i === 0}>
                  {c.label}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Several feature sections, alternating photo side and background. */
export function FeatureSections({ blocks, startTone = "white" }: { blocks: FeatureBlock[]; startTone?: "white" | "mist" }) {
  return (
    <>
      {blocks.map((b, i) => (
        <FeatureSection key={b.title} block={b} index={i} tone={(i % 2 === 0) === (startTone === "white") ? "white" : "mist"} />
      ))}
    </>
  );
}
