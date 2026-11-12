/** Central site configuration shared by metadata, robots and sitemap. */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://btc.org.ly"
).replace(/\/$/, "");

export const SITE_NAME = "BTC";

export const LOCALES = ["ar", "en"] as const;

/** All public routes, relative to the locale prefix. */
export const PUBLIC_ROUTES = [
  { path: "/", priority: 1, changeFrequency: "monthly" as const },
  { path: "/tools", priority: 0.9, changeFrequency: "monthly" as const },
  {
    path: "/tools/dna-analyzer",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/tools/primer-tm",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/tools/orf-finder",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  { path: "/about", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/learn", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/sitemap", priority: 0.3, changeFrequency: "yearly" as const },
];

/** Build an absolute URL for a locale + path pair. */
export function localeUrl(locale: string, path: string): string {
  const suffix = path === "/" ? "" : path;
  return `${SITE_URL}/${locale}${suffix}`;
}
