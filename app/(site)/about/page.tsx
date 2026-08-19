import Link from "next/link";

export const metadata = {
  title: "Experience | Picture the Moment"
};

export default function AboutPage() {
  return (
    <main className="px-6 pb-28 pt-40 md:px-8">
      <section className="mx-auto max-w-container">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">The Experience</p>
        <div className="grid gap-10 md:grid-cols-12">
          <h1 className="font-serif text-5xl leading-tight text-ivory md:col-span-7 md:text-7xl">
            A wedding story should feel as considered as the celebration itself.
          </h1>
          <div className="space-y-8 text-base font-light leading-8 text-muted md:col-span-4 md:col-start-9">
            <p>
              We plan each commission as an editorial narrative, from ritual pacing and family portraits to dusk portraits, decor studies, and cinematic films.
            </p>
            <p>
              The result is not a gallery of isolated moments. It is a living archive: tactile, emotional, and designed to be revisited for decades.
            </p>
            <Link href="/contact" className="btn-primary">Book a Consultation</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
