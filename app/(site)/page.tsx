import Link from "next/link";
import { ArrowRight, Pause, Play } from "lucide-react";
import { CtaSection } from "@/components/CtaSection";
import { ProjectTile } from "@/components/ProjectTile";
import { Reveal } from "@/components/Motion";
import { SanityImage } from "@/components/SanityImage";
import { getHomePage } from "@/lib/queries";

export async function generateMetadata() {
  const page = await getHomePage();
  return {
    title: page.seo?.metadataTitle || "Picture the moments",
    description: page.seo?.metadataDescription || "Cinematic Indian wedding photography rooted in heritage."
  };
}

export default async function HomePage() {
  const page = await getHomePage();
  const heroImage = page.hero.media.image || page.hero.media.poster;
  const works =
    page.selectedWorks ?? {
      eyebrow: "Portfolio",
      title: "Selected Works",
      description: "",
      ctaText: "View Full Portfolio",
      ctaLink: "/projects",
      mode: "all" as const
    };
  const experience =
    page.experience ?? {
      eyebrow: "The Experience",
      title: "Unhurried, cinematic, and deeply personal.",
      body: "From the first call to the final gallery, every commission is planned like an editorial production and held like a family archive.",
      ctaText: "Explore The Experience",
      ctaLink: "/about"
    };

  return (
    <main>
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
        <div className="image-vignette absolute inset-0">
          {page.hero.media.type === "video" && page.hero.media.videoUrl ? (
            <video className="h-full w-full object-cover" poster={heroImage?.url} autoPlay muted loop playsInline>
              <source src={page.hero.media.videoUrl} />
            </video>
          ) : (
            <SanityImage image={heroImage} fill priority sizes="100vw" className="object-cover" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/20 via-transparent to-espresso" />
        <div className="relative z-10 mx-auto mt-20 max-w-4xl px-6 text-center">
          {page.hero.subheading ? (
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-muted">{page.hero.subheading}</p>
          ) : null}
          <h1 className="font-serif text-4xl leading-tight text-gold md:text-6xl">{page.hero.headline}</h1>
          <Link href={page.hero.ctaLink} className="btn-ghost mt-9">
            {page.hero.ctaText} <ArrowRight size={15} />
          </Link>
        </div>
        {page.hero.media.type === "video" ? (
          <button className="absolute bottom-8 right-8 z-20 rounded-full border border-gold/60 p-4 text-gold" aria-label="Play or pause hero video">
            <Play size={18} className="hidden" />
            <Pause size={18} />
          </button>
        ) : null}
      </section>

      <section className="bg-espresso px-6 py-28 md:px-8 md:py-36">
        <Reveal className="mx-auto grid max-w-3xl gap-12 text-center">
          <div className="mx-auto h-24 w-px bg-gradient-to-b from-transparent via-gold to-transparent" />
          <p className="text-lg font-light leading-9 text-muted md:text-xl">{page.manifesto}</p>
          <div className="mx-auto h-24 w-px bg-gradient-to-b from-transparent via-gold to-transparent" />
        </Reveal>
      </section>

      <section className="overflow-hidden bg-surface px-6 py-28 md:px-8 md:py-36">
        <div className="mx-auto mb-12 flex max-w-container items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">{works.eyebrow}</p>
            <h2 className="font-serif text-3xl text-ivory md:text-5xl">{works.title}</h2>
            {works.description ? <p className="mt-4 max-w-2xl text-sm font-light leading-6 text-muted">{works.description}</p> : null}
            {/* Mobile-only cue that the carousel scrolls sideways */}
            <p className="mt-6 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold md:hidden">
              Swipe to explore
              <ArrowRight size={13} strokeWidth={1.8} className="swipe-nudge" aria-hidden="true" />
            </p>
          </div>
          <Link href={works.ctaLink} className="btn-ghost hidden md:inline-flex">{works.ctaText}</Link>
        </div>
        <div className="relative">
          <div className="flex snap-x gap-8 overflow-x-auto pb-6">
            {page.highlights.map((project, index) => (
              <div key={project._id} className="w-[86vw] shrink-0 snap-center md:w-[58vw]">
                <ProjectTile project={project} priority={index === 0} tall />
              </div>
            ))}
          </div>
          {/* Soft right-edge fade suggesting there is more to scroll into */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-surface via-surface/60 to-transparent md:w-16" />
        </div>
      </section>

      <section className="px-6 py-28 md:px-8 md:py-36">
        <div className="mx-auto grid max-w-container gap-10 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">{experience.eyebrow}</p>
            <h2 className="font-serif text-3xl leading-tight text-ivory md:text-5xl">{experience.title}</h2>
          </Reveal>
          <Reveal className="md:col-span-5 md:col-start-8">
            <p className="text-base font-light leading-8 text-muted">{experience.body}</p>
            {experience.ctaText && experience.ctaLink ? (
              <Link href={experience.ctaLink} className="btn-primary mt-8">{experience.ctaText}</Link>
            ) : null}
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </main>
  );
}
