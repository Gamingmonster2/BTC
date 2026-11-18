import { cn } from "cn";

/**
 * Animated gradient text (Magic UI "aurora text" pattern), implemented with a
 * pure-CSS animated background so it adds no JavaScript to the Worker bundle.
 */
export function AuroraText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cn("text-aurora", className)}>{children}</span>;
}
