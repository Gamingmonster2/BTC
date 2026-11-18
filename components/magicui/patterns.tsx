import { cn } from "cn";

/**
 * SVG dot / grid backdrop (Magic UI "dot pattern" and "grid pattern").
 * `id` must be unique per page because SVG pattern ids are document-global.
 */
export function DotPattern({
  id,
  className,
  width = 22,
  height = 22,
  cx = 1,
  cy = 1,
  r = 1,
}: {
  id: string;
  className?: string;
  width?: number;
  height?: number;
  cx?: number;
  cy?: number;
  r?: number;
}) {
  return (
    <svg
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 size-full fill-current",
        className
      )}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <circle cx={cx} cy={cy} r={r} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export function GridPattern({
  id,
  className,
  size = 56,
}: {
  id: string;
  className?: string;
  size?: number;
}) {
  return (
    <svg
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 size-full stroke-current",
        className
      )}
    >
      <defs>
        <pattern
          id={id}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" strokeWidth={1} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} stroke="none" />
    </svg>
  );
}
