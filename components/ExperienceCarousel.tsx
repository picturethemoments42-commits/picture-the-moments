"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SanityImage } from "./SanityImage";
import type { ImageAsset } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

const pic = (url: string, alt: string): ImageAsset => ({ url, alt });

type Slide = {
  image: ImageAsset;
  eyebrow: string;
  caption: string;
  wide?: boolean;
};

const SLIDES: Slide[] = [
  {
    image: pic("/IMG_7757.JPG", "Couple at golden hour"),
    eyebrow: "The First Meeting",
    caption: "Every story begins with a conversation and a walk through the light."
  },
  {
    image: pic("/IMG_7753.JPG", "Indian bride portrait in gold jewelry"),
    eyebrow: "The Bride",
    caption: "Portraits composed with patience, texture, and sculpted light."
  },
  {
    image: pic("/IMG_7756.JPG", "Marigold and candlelight at the ceremony"),
    eyebrow: "Rituals in Gold",
    caption: "Ceremony frames held close — marigold, candlelight, and tradition.",
    wide: true
  },
  {
    image: pic("/IMG_7761.JPG", "Wedding venue with warm string lights"),
    eyebrow: "The Celebration",
    caption: "Evening energy, music, and the glow of an unhurried celebration."
  },
  {
    image: pic("/IMG_7752.JPG", "Jewelry and makeup details in rich light"),
    eyebrow: "Details",
    caption: "Silk, gold, and skin — rendered as a tactile still life."
  },
  {
    image: pic("/IMG_7764.JPG", "Celebration table in warm light"),
    eyebrow: "Golden Hour",
    caption: "The softest light of the day held in a single frame.",
    wide: true
  },
  {
    image: pic("/IMG_7768.JPG", "Tactile shadows and sculpted gold"),
    eyebrow: "Heirlooms",
    caption: "Antique pieces and shadows that carry family history."
  },
  {
    image: pic("/IMG_4677.JPG", "Cinematic Indian wedding ceremony in warm light"),
    eyebrow: "The Film",
    caption: "A cinematic edit — every chapter, sequence, and beat."
  }
];

/**
 * Scroll-driven horizontal gallery for the Experience page.
 *
 * As the user scrolls vertically, the film strip glides horizontally with a
 * smooth GSAP scrub — a cinematic "carousel" tied to the scroll, not to clicks.
 * Falls back to a native horizontal scroll strip when reduced motion is set.
 */
export function ExperienceCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track.classList.add("overflow-x-auto");
      return;
    }

    const getAmount = () => Math.max(0, track.scrollWidth - window.innerWidth);

    const tween = gsap.to(track, {
      x: () => -getAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getAmount()}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen flex-col justify-center overflow-hidden bg-espresso"
    >
      <div className="mx-auto mb-10 flex w-full max-w-container items-end justify-between gap-6 px-6 md:px-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">The Process, In Frames</p>
          <h2 className="font-serif text-3xl text-ivory md:text-5xl">Scroll to walk through the story.</h2>
        </div>
        <p className="hidden shrink-0 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted/70 md:block">
          Scroll ↓
        </p>
      </div>

      <div
        ref={trackRef}
        className="flex items-center gap-5 px-6 pb-10 md:gap-8 md:px-8"
        style={{ willChange: "transform" }}
      >
        {SLIDES.map((slide, index) => (
          <figure
            key={index}
            className={`image-vignette group relative shrink-0 overflow-hidden ${
              slide.wide ? "h-[52vh] w-[78vw] md:h-[62vh] md:w-[52vw]" : "h-[52vh] w-[64vw] md:h-[62vh] md:w-[34vw]"
            }`}
          >
            <SanityImage
              image={slide.image}
              fill
              sizes={slide.wide ? "(min-width: 1024px) 52vw, 78vw" : "(min-width: 1024px) 34vw, 64vw"}
              className="object-cover transition duration-700 ease-out group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-6">
              <span className="mb-2 inline-block border border-gold/50 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-gold">
                {slide.eyebrow}
              </span>
              <p className="max-w-sm font-serif text-lg leading-snug text-ivory md:text-xl">{slide.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}