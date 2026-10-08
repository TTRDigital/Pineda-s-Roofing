import Image from "next/image";
import { images } from "@/lib/data/images";
import { Button } from "@/components/ui/Button";
import { SiteShell } from "@/components/layout/SiteShell";
import "./globals.css";

export default function NotFound() {
  return (
    <SiteShell>
    <section className="section on-dark bg-ink">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
        <div>
          <p className="eyebrow on-dark">Error 404</p>
          <h1 className="mt-4 text-h1 uppercase text-white">This page blew off the roof</h1>
          <p className="mt-6 max-w-xl text-lead text-on-dark">The page you&apos;re looking for has moved or doesn&apos;t exist. Let&apos;s get you back on solid ground.</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/" arrow>
              Back to home
            </Button>
            <Button href="/services" variant="outline-light">
              Our services
            </Button>
          </div>
        </div>
        <Image src={images.eagleTapeMeasure.src} alt="" width={images.eagleTapeMeasure.width} height={images.eagleTapeMeasure.height} sizes="320px" className="mx-auto h-auto w-full max-w-[300px]" />
      </div>
    </section>
    </SiteShell>
  );
}
