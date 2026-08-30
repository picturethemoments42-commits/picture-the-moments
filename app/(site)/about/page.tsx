import Link from "next/link";
import { CtaSection } from "@/components/CtaSection";
import { ExperienceCarousel } from "@/components/ExperienceCarousel";
import { getSiteSettings } from "@/lib/queries";

export const metadata = {
  title: "Experience | Picture the moments"
};

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const whatsappUrl = settings.whatsappUrl || "https://wa.me/918437807609";

  return (
    <main className="px-6 pb-28 pt-40 md:px-8">
      <section className="mx-auto max-w-container">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">The Experience</p>
        <div className="grid gap-10 md:grid-cols-12">
          <h1 className="font-serif text-4xl leading-tight text-ivory md:col-span-7 md:text-6xl">
            A wedding story should feel as considered as the celebration itself.
          </h1>
          <div className="space-y-8 text-base font-light leading-8 text-muted md:col-span-4 md:col-start-9">
            <p>
              We plan each commission as an editorial narrative, from ritual pacing and family portraits to dusk portraits, decor studies, and cinematic films.
            </p>
            <p>
              The result is not a gallery of isolated moments. It is a living archive: tactile, emotional, and designed to be revisited for decades.
            </p>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary">
              Book a Consultation
            </a>
          </div>
        </div>
      </section>

      <ExperienceCarousel />

      <CtaSection />
    </main>
  );
}
