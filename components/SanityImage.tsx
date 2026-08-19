import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import type { ImageAsset } from "@/lib/types";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

type Props = {
  image?: ImageAsset;
  alt?: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  width?: number;
  height?: number;
};

export function getImageUrl(image?: ImageAsset, width = 1600) {
  if (!image) return "";
  if (image.url) return image.url;
  if (image.asset) return urlFor(image as SanityImageSource).width(width).auto("format").quality(82).url();
  return "";
}

export function SanityImage({ image, alt, fill, priority, className, sizes, width = 1400, height = 1800 }: Props) {
  const src = getImageUrl(image, width);
  if (!src) return null;
  const blurDataURL = image?.lqip || image?.asset?.metadata?.lqip;

  return (
    <Image
      src={src}
      alt={alt || image?.alt || ""}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      priority={priority}
      sizes={sizes || (fill ? "100vw" : undefined)}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
      className={className}
    />
  );
}
