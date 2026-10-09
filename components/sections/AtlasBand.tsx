import Image from "next/image";
import { images } from "@/lib/data/images";
import { Button } from "@/components/ui/Button";
import { HighlightBoxes } from "@/components/ui/HighlightBoxes";

/** Dark band promoting the Atlas page. */
export function AtlasBand() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink">
      <div className="container-x grid items-center gap-10 py-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:py-20">
        <div>
          <p className="eyebrow on-dark">Atlas Roofing</p>
          <h2 className="mt-4 text-h2 uppercase text-white">Atlas Pinnacle Pristine on every roof</h2>
          <span className="accent-rule mt-5" aria-hidden="true" />
          <p className="mt-6 max-w-xl text-lead text-on-dark">Premium shingles are our standard, not an upsell. 3M Scotchgard Protector keeps Maryland roofs free of algae streaks.</p>
          <div className="mt-8 max-w-xl">
            <HighlightBoxes items={["3M Scotchgard algae protection", "Built for high winds", "Wide range of colors", "Manufacturer-backed warranty"]} />
          </div>
          <div className="mt-9">
            <Button href="/atlas-roofing" arrow>
              Why we install Atlas
            </Button>
          </div>
        </div>
        <div className="relative hidden aspect-square overflow-hidden rounded-[var(--radius-card)] lg:block">
          <Image src={images.pinnaclePristineBundles.src} alt={images.pinnaclePristineBundles.alt} fill sizes="40vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
