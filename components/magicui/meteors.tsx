import { cn } from "cn";

/** Deterministic meteor field — fixed values avoid hydration mismatches. */
const METEORS = [
  { top: "8%", left: "12%", delay: "0s", duration: "5.2s" },
  { top: "18%", left: "38%", delay: "1.4s", duration: "6.1s" },
  { top: "4%", left: "62%", delay: "2.8s", duration: "4.6s" },
  { top: "26%", left: "84%", delay: "0.7s", duration: "7s" },
  { top: "38%", left: "22%", delay: "3.4s", duration: "5.8s" },
  { top: "44%", left: "54%", delay: "2.1s", duration: "6.6s" },
  { top: "32%", left: "72%", delay: "4.2s", duration: "5.1s" },
  { top: "12%", left: "92%", delay: "1.1s", duration: "6.9s" },
  { top: "56%", left: "8%", delay: "3.9s", duration: "5.5s" },
  { top: "62%", left: "44%", delay: "0.3s", duration: "7.3s" },
  { top: "52%", left: "68%", delay: "5.1s", duration: "4.9s" },
  { top: "66%", left: "88%", delay: "2.6s", duration: "6.2s" },
  { top: "74%", left: "28%", delay: "1.8s", duration: "5.4s" },
  { top: "80%", left: "58%", delay: "4.6s", duration: "6.8s" },
];

export function Meteors({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {METEORS.map((meteor, index) => (
        <span
          key={index}
          className="animate-meteor absolute size-0.5 rotate-[215deg] rounded-full bg-brand shadow-[0_0_0_1px_rgba(45,212,191,0.25)] before:absolute before:top-1/2 before:h-px before:w-[70px] before:translate-x-[-100%] before:translate-y-[-50%] before:bg-gradient-to-r before:from-brand before:to-transparent before:content-['']"
          style={{
            top: meteor.top,
            left: meteor.left,
            animationDelay: meteor.delay,
            animationDuration: meteor.duration,
          }}
        />
      ))}
    </div>
  );
}
