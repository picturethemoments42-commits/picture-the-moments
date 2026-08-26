"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Instagram, Menu, MessageCircle, X } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

export function Nav({ settings }: { settings: SiteSettings }) {
  const links = settings.navLinks ?? [];
  const ctaLabel = settings.navCtaLabel || "Book a Consultation";
  const ctaLink = settings.navCtaLink || "/contact";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[90] transition-colors duration-300 ${
          scrolled ? "bg-espresso/85 backdrop-blur-md" : "bg-gradient-to-b from-espresso/80 to-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-container items-center justify-between px-5 py-3 md:px-8 md:py-4">
          <Link href="/" className="brand-glow font-serif text-xl capitalize leading-none md:text-2xl">
            {settings.studioName}
          </Link>
          <div className="hidden items-center gap-7 text-[0.7rem] font-medium uppercase tracking-[0.15em] text-muted md:flex">
            {links.map((link) => (
              <Link key={`${link.label}-${link.href}`} href={link.href} className="transition hover:text-gold">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href={ctaLink} className="btn-primary nav-cta-desktop">
              {ctaLabel}
            </Link>
            <button type="button" onClick={() => setOpen(true)} className="z-[95] text-gold md:hidden" aria-label="Open menu">
              <Menu size={26} strokeWidth={1.4} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — rendered as a sibling of the header (NOT inside it) so
          the header's backdrop-filter cannot turn `position: fixed` into a
          tiny, header-sized box. This is what made the menu appear to
          "not open" once the scrolled background kicked in. */}
      {open ? (
        <div className="menu-overlay fixed inset-0 z-[100] flex flex-col bg-espresso md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex items-center justify-between px-5 py-3">
            <span className="brand-glow font-serif text-xl capitalize">{settings.studioName}</span>
            <button type="button" onClick={() => setOpen(false)} className="text-gold" aria-label="Close menu">
              <X size={26} strokeWidth={1.4} />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center overflow-y-auto px-8">
            {links.map((link) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between border-b border-ivory/10 py-4 font-serif text-2xl text-ivory transition hover:text-gold"
              >
                {link.label}
                <ArrowRight size={18} className="text-gold transition group-hover:translate-x-1" />
              </Link>
            ))}
            <Link href={ctaLink} onClick={() => setOpen(false)} className="btn-primary mt-8 inline-flex w-full justify-center">
              {ctaLabel}
            </Link>
            <div className="mt-10 flex items-center justify-center gap-7">
              <a href={settings.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-gold transition hover:text-ivory">
                <Instagram size={24} />
              </a>
              <a href={settings.whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="text-gold transition hover:text-ivory">
                <MessageCircle size={24} />
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
