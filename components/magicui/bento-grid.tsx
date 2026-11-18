import { cn } from "cn";

/** Bento-style asymmetric grid (Magic UI "bento grid"). */
export function BentoGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(0,1fr)] gap-4 md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group/bento relative flex flex-col overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-colors hover:border-brand/40",
        className
      )}
    >
      {children}
    </div>
  );
}
