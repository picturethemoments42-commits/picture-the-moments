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
  const hudRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect runs synchronously before the browser paints, so the
  // splash is set up (and covers the page) before the landing page can flash.
  useLayoutEffect(() => {
    const root = rootRef.current;
    const top = topRef.current;
    const bottom = bottomRef.current;
    const brand = brandRef.current;
    const hud = hudRef.current;
    if (!root || !top || !bottom || !brand || !hud) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Start with panels fully off-screen (top above viewport, bottom below)
    // and the logo invisible. The opaque root covers the page the whole time.
    gsap.set(root, { autoAlpha: 1 });
    gsap.set(top, { yPercent: -100 });
    gsap.set(bottom, { yPercent: 100 });
    gsap.set(brand, { opacity: 0, y: 14 });
    gsap.set(hud, { autoAlpha: 0, y: 8 });

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
      // 3. Camera HUD fades in as the panels meet, like a viewfinder powering up.
      .fromTo(
        hud,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.6",
      )
      // 4. Hold for 1s, then the whole overlay fades out together.
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

      {/* Camera viewfinder HUD — corner marks and readouts in the border gold */}
      <div ref={hudRef} className="pointer-events-none absolute inset-0">
        {/* Corner viewfinder marks */}
        <span className="absolute left-5 top-5 h-4 w-4 border-l-2 border-t-2 border-gold" aria-hidden="true" />
        <span className="absolute right-5 top-5 h-4 w-4 border-r-2 border-t-2 border-gold" aria-hidden="true" />
        <span className="absolute bottom-5 left-5 h-4 w-4 border-b-2 border-l-2 border-gold" aria-hidden="true" />
        <span className="absolute bottom-5 right-5 h-4 w-4 border-b-2 border-r-2 border-gold" aria-hidden="true" />

        {/* Top-left: exposure readout */}
        <p className="absolute left-11 top-11 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-gold">
          ISO 800 · 35mm · f/1.8
        </p>

        {/* Top-right: remaining battery */}
        <p className="absolute right-11 top-11 flex items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-gold">
          <span className="block h-2.5 w-5 border border-gold p-px" aria-hidden="true">
            <span className="block h-full w-[85%] bg-gold" />
          </span>
          98%
        </p>

        {/* Bottom-left: frame counter */}
        <p className="absolute bottom-11 left-11 font-mono text-[0.6rem] font-semibold tracking-[0.2em] text-gold">
          024 / 240
        </p>

        {/* Bottom-right: REC indicator + timecode */}
        <p className="absolute bottom-11 right-11 flex items-center gap-1.5 font-mono text-[0.6rem] font-semibold tracking-[0.18em] text-gold">
          <span className="rec-blink h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
          REC 00:04:27
        </p>
      </div>
    </div>
  );
}
