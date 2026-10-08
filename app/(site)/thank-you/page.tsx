import type { Metadata } from "next";
import Image from "next/image";
import { getSiteSettings } from "@/lib/content";
import { images } from "@/lib/data/images";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Thank you", robots: { index: false, follow: false } };

export default async function ThankYouPage() {
  const settings = await getSiteSettings();
  return (
    <section className="section on-dark bg-ink">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
        <div>
          <p className="eyebrow on-dark">Request received</p>
          <h1 className="mt-4 text-h1 uppercase text-white">Thank you. We&apos;ll be in touch soon.</h1>
          <span className="accent-rule mt-6" aria-hidden="true" />
          <p className="mt-6 max-w-xl text-lead text-on-dark">
            A member of the Pineda family will call you within 24 hours to set up your free inspection. Roof leaking right now? Call {settings.phone} for emergency service.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href={settings.phoneHref}>Call {settings.phone}</Button>
            <Button href="/gallery" variant="outline-light">
              See our work
            </Button>
          </div>
        </div>
        <Image src={images.eagleThumbsUp.src} alt={images.eagleThumbsUp.alt} width={images.eagleThumbsUp.width} height={images.eagleThumbsUp.height} sizes="320px" className="mx-auto h-auto w-full max-w-[300px]" />
      </div>
    </section>
  );
}
