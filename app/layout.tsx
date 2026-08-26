import type { Metadata } from "next";
import type React from "react";
import { getSiteSettings } from "@/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: settings.metadataTitle || "Picture the moments | Cinematic Wedding Photography",
    description: settings.metadataDescription || "Picture the moments — cinematic Indian wedding photography."
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
