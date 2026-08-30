import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSiteSettings } from "@/lib/queries";

export async function CtaSection({ showConsultCta = true }: { showConsultCta?: boolean }) {
  const settings = await getSiteSettings();
  const whatsappUrl = settings.whatsappUrl || "https://wa.me/918437807609";

  return (
    <section className="relative mt-8 overflow-hidden bg-surface">
      <div className="max-w-3xl px-6 py-20 text-left lg:mx-auto lg:text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          Begin Your Story
        </p>
        <h2 className="font-serif text-4xl leading-tight text-ivory md:text-6xl">
          Your celebration deserves to be remembered.
        </h2>
        <p className="mt-5 max-w-xl text-base font-light leading-7 text-muted lg:mx-auto">
          We accept a limited number of commissions each season so every story
          receives the time and attention it deserves.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4 lg:justify-center">
          {showConsultCta ? (
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary">
              Book a Consultation <ArrowRight size={15} />
            </a>
          ) : null}
          <Link href="/projects" className="btn-ghost">
            View the Archive
          </Link>
        </div>
      </div>
    </section>
  );
}
