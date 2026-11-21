import Image from "next/image";
import { cn } from "cn";
import { GlassCard } from "@/components/magicui/glass-card";
import { BorderBeam } from "@/components/magicui/border-beam";

/**
 * A photography cover with a frosted-glass overlay and animated shine.
 *
 * The image fills its parent, so the caller controls the aspect ratio. On a
 * phone the cover is taller (4:3); on wider screens it becomes a cinematic
 * strip. `sizes` lets next/image serve a appropriately sized file to each
 * device, which keeps the first paint quick on mobile.
 */
export function PhotoCover({
  src,
  alt,
  title,
  eyebrow,
  className,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px",
  compact = false,
}: {
  src: string;
  alt: string;
  title?: string;
  eyebrow?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative isolate w-full overflow-hidden rounded-2xl border border-white/10 bg-[#070b14] shadow-lg",
        compact ? "aspect-[4/3] sm:aspect-[3/2]" : "aspect-[4/3] sm:aspect-[2/1] lg:aspect-[21/9]",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-center transition-transform duration-700 ease-out motion-reduce:transition-none group-hover:scale-[1.05]"
      />

      {/* Keeps white glass text readable over both light and dark photos. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050912]/95 via-[#050912]/35 to-[#050912]/5" />

      {compact ? (
        <GlassCard className="absolute inset-x-3 bottom-3 rounded-xl px-3 py-2 sm:inset-x-4 sm:bottom-4">
          {eyebrow && (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-wide text-white/70 uppercase">
              <span className="size-1.5 rounded-full bg-brand-3" />
              {eyebrow}
            </span>
          )}
          {title && (
            <span className="mt-0.5 block line-clamp-2 text-xs leading-snug font-medium text-white sm:text-sm">
              {title}
            </span>
          )}
        </GlassCard>
      ) : (
        <GlassCard className="absolute inset-x-3 bottom-3 p-4 sm:inset-x-6 sm:bottom-6 sm:p-6">
          {eyebrow && (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.16em] text-white/70 uppercase sm:text-xs">
              <span className="size-1.5 rounded-full bg-brand-3" />
              {eyebrow}
            </span>
          )}
          {title && (
            <p className="mt-2 text-lg leading-tight font-semibold text-balance text-white sm:text-2xl lg:text-3xl">
              {title}
            </p>
          )}
        </GlassCard>
      )}

      <BorderBeam duration={12} size={110} />
    </div>
  );
}
