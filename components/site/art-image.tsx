import Image from "next/image";
import { cn } from "cn";

/**
 * Renders one of the generated vector illustrations.
 *
 * SVGs are served unoptimized: the Next image optimizer refuses SVG input
 * unless `dangerouslyAllowSVG` is enabled, and these files are already small.
 */
export function ArtImage({
  src,
  alt,
  className,
  priority = false,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={800}
      unoptimized
      priority={priority}
      sizes={sizes}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
