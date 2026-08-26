import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="mx-auto my-8 max-w-3xl text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Begin Your Story</p>
        <h2 className="font-serif text-4xl leading-tight text-ivory md:text-6xl">
          Your celebration deserves to be remembered.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base font-light leading-7 text-muted">
          We accept a limited number of commissions each season so every story receives the time and attention it
          deserves.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link href="/contact" className="btn-primary">
            Book a Consultation <ArrowRight size={15} />
          </Link>
          <Link href="/projects" className="btn-ghost">
            View the Archive
          </Link>
        </div>
      </div>
    </section>
  );
}