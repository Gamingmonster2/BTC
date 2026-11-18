import { cn } from "cn";

/**
 * A light beam that travels around the border of its parent (Magic UI
 * "border beam" pattern). The parent must be `relative` and `overflow-hidden`
 * with a rounded corner; the beam inherits that radius.
 */
export function BorderBeam({
  className,
  duration = 6,
  delay = 0,
  size = 140,
  colorFrom = "var(--brand)",
  colorTo = "var(--brand-2)",
}: {
  className?: string;
  duration?: number;
  delay?: number;
  size?: number;
  colorFrom?: string;
  colorTo?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] p-px [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [mask-composite:exclude]",
        className
      )}
    >
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, transparent ${360 - size}deg, ${colorFrom} ${360 - size / 2}deg, ${colorTo} 360deg)`,
          animation: `beam-spin ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
          opacity: 0.9,
        }}
      />
    </div>
  );
}
