import { cn } from "cn";

/**
 * Frosted-glass panel with a light sweep (Magic UI "glass card" pattern).
 *
 * CSS-first: the shine is a single transformed gradient, so it adds no
 * JavaScript to the Worker bundle and disappears under reduced-motion.
 */
export function GlassCard({
  children,
  className,
  shine = true,
}: {
  children: React.ReactNode;
  className?: string;
  shine?: boolean;
}) {
  return (
    <div className={cn("glass-panel relative overflow-hidden rounded-2xl", className)}>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
      />
      {shine && (
        <span
          aria-hidden
          className="glass-shine pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 animate-shine motion-reduce:hidden"
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
