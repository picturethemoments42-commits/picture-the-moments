import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-gold/15 bg-surface px-6 py-12 md:px-8">
      <div className="mx-auto grid max-w-container gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="brand-glow font-serif text-3xl md:text-4xl">{settings.studioName}</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-muted">{settings.footerText}</p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-muted md:col-span-5 md:justify-end">
          {(settings.footerLinks ?? []).map((link) => (
            <Link key={`${link.label}-${link.href}`} href={link.href} className="hover:text-gold">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-4 md:col-span-2 md:justify-end">
          <a href={settings.instagramUrl} aria-label="Instagram" className="text-gold"><Instagram size={20} /></a>
          <a href={settings.whatsappUrl} aria-label="WhatsApp" className="text-gold"><MessageCircle size={20} /></a>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-container pt-6 text-xs uppercase tracking-[0.14em] text-muted/60">
        © 2026 {settings.studioName}
      </div>
    </footer>
  );
}
