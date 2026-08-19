import type React from "react";
import "../globals.css";
import { Footer } from "@/components/Footer";
import { SmoothScrollProvider } from "@/components/Motion";
import { Nav } from "@/components/Nav";
import { getSiteSettings } from "@/lib/queries";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <SmoothScrollProvider>
      <Nav settings={settings} />
      {children}
      <Footer settings={settings} />
      <div className="film-grain" />
    </SmoothScrollProvider>
  );
}