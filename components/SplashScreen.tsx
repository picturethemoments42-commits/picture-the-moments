"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Full-screen splash shown on page load.
 *
 * The overlay is opaque and mounted from the very first paint (so the page is
 * never glimpsed underneath), the two panels come in from the top & bottom and
 * meet in the middle, the logo fades in, holds for ~1s, then the whole overlay
 * fades away together. Runs once per mount via the shared layout. Respects
 * prefers-reduced-motion.
 */
export function SplashScreen({ studioName }: { studioName: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLParagraphElement>(null);

  // useLayoutEffect runs synchronously before the browser paints, so the
  // splash is set up (and covers the page) before the landing page can flash.
  useLayoutEffect(() => {
    const root = rootRef.current;
    const top = topRef.current;
    const bottom = bottomRef.current;
    const brand = brandRef.current;
    if (!root || !top || !bottom || !brand) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Start with panels fully off-screen (top above viewport, bottom below)
    // and the logo invisible. The opaque root covers the page the whole time.
    gsap.set(root, { autoAlpha: 1 });
    gsap.set(top, { yPercent: -100 });
    gsap.set(bottom, { yPercent: 100 });
    gsap.set(brand, { opacity: 0, y: 14 });

    if (reduced) {
      gsap.set(root, { display: "none" });
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => gsap.set(root, { display: "none" }),
    });

    // 1. Panels slide in from top & bottom and meet in the middle (cover page).
    tl.to(top, { duration: 1, yPercent: 0 })
      .to(bottom, { duration: 1, yPercent: 0 }, "<")
      // 2. Logo fades in at the centre (slightly overlapping the panels closing).
      .fromTo(
        brand,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.5",
      )
      // 3. Hold for 1s, then the whole overlay fades out together.
      .to(root, { autoAlpha: 0, duration: 0.8, ease: "power2.inOut" }, "+=1");
  }, [studioName]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[120] bg-espresso p-4"
      aria-hidden="true"
    >
      {/* Top panel */}
      <div
        ref={topRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-surface border-2 border-b-0 border-gold"
      />
      {/* Bottom panel */}
      <div
        ref={bottomRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-surface border-2 border-t-0 border-gold"
      />
      {/* Logo, centred on the overlay */}
      <p
        ref={brandRef}
        className="brand-glow absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-serif text-3xl capitalize md:text-5xl"
      >
        {studioName}
      </p>
    </div>
  );
}
