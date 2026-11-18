import { cn } from "cn";

/**
 * CSS-only infinite marquee (Magic UI pattern). Two identical tracks are
 * translated by -50% of the container width, so the loop is seamless.
 */
export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
}: {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--gap:2.5rem] [gap:var(--gap)]",
        className
      )}
    >
      {[0, 1].map((index) => (
        <div
          key={index}
          aria-hidden={index === 1}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            reverse ? "animate-marquee-reverse" : "animate-marquee",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
