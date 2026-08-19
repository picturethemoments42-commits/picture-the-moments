import Link from "next/link";
import { Menu } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

export function Nav({ settings }: { settings: SiteSettings }) {
  const links = settings.navLinks ?? [];
  const ctaLabel = settings.navCtaLabel || "Book a Consultation";
  const ctaLink = settings.navCtaLink || "/contact";

  return (
    <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-espresso/80 to-transparent">
      <div className="mx-auto flex max-w-container items-center justify-between px-6 py-6 md:px-8">
        <Link href="/" className="brand-glow font-serif text-2xl md:text-3xl">
          {settings.studioName}
        </Link>
        <div className="hidden items-center gap-8 text-[0.72rem] font-medium uppercase tracking-[0.15em] text-muted md:flex">
          {links.map((link) => (
            <Link key={`${link.label}-${link.href}`} href={link.href} className="transition hover:text-gold">
              {link.label}
            </Link>
          ))}
        </div>
        <Link href={ctaLink} className="btn-primary hidden md:inline-flex">
          {ctaLabel}
        </Link>
        <button className="text-gold md:hidden" aria-label="Open menu">
          <Menu size={30} strokeWidth={1.4} />
        </button>
      </div>
    </nav>
  );
}
