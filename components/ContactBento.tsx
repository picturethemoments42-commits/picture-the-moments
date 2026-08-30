import { Reveal } from "./Motion";
import { SanityImage } from "./SanityImage";
import type { ImageAsset } from "@/lib/types";

const pic = (url: string, alt: string): ImageAsset => ({ url, alt });

type Cell = {
  image: ImageAsset;
  label: string;
  className: string;
};

const CELLS: Cell[] = [
  {
    image: pic("/IMG_7753.JPG", "Indian bride portrait in gold jewelry"),
    label: "Weddings",
    className: "col-span-2 row-span-2"
  },
  {
    image: pic("/IMG_7756.JPG", "Marigold and candlelight at the ceremony"),
    label: "Ceremony",
    className: "col-span-1 row-span-1"
  },
  {
    image: pic("/IMG_7761.JPG", "Wedding venue with warm string lights"),
    label: "Celebrations",
    className: "col-span-1 row-span-1"
  },
  {
    image: pic("/IMG_7764.JPG", "Celebration table in warm light"),
    label: "Golden Hour",
    className: "col-span-2 row-span-1"
  },
  {
    image: pic("/IMG_7768.JPG", "Tactile shadows and sculpted gold"),
    label: "Details",
    className: "col-span-1 row-span-1"
  },
  {
    image: pic("/IMG_7752.JPG", "Jewelry and makeup details in rich light"),
    label: "The Look",
    className: "col-span-1 row-span-1"
  },
  {
    image: pic("/IMG_4677.JPG", "Cinematic Indian wedding ceremony in warm light"),
    label: "Films",
    className: "col-span-1 row-span-1"
  },
  {
    image: pic("/IMG_7757.JPG", "Couple at golden hour"),
    label: "Pre-Wedding",
    className: "col-span-1 row-span-1"
  }
];

/**
 * A bento grid of the studio's work, shown on the contact page. Each tile is a
 * real photo from the archive, revealed with a gentle stagger as it enters the
 * viewport.
 */
export function ContactBento() {
  return (
    <section className="px-6 pb-24 md:px-8">
      <div className="mx-auto max-w-container">
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">From the Archive</p>
          <h2 className="font-serif text-3xl text-ivory md:text-5xl">A few frames that set the tone.</h2>
        </div>

        <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[250px] md:grid-cols-4 md:gap-4">
          {CELLS.map((cell, index) => (
            <Reveal key={index} className={cell.className}>
              <figure className="image-vignette group relative h-full w-full overflow-hidden">
                <SanityImage
                  image={cell.image}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-105"
                />
                <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-espresso/85 via-espresso/10 to-transparent p-4 md:p-5">
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold">{cell.label}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}