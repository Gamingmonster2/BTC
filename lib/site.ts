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
  {
    path: "/tools/protein-features",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  { path: "/about", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/learn", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/sitemap", priority: 0.3, changeFrequency: "yearly" as const },
];

/**
 * Main image for each non-dynamic route, expressed as a public source path.
 * Article and tool pages do not need an entry: `lib/metadata.ts` resolves
 * their cover straight from the article data.
 */
export const PAGE_IMAGES: Record<string, string> = {
  "/": "/images/articles/what-is-btc.webp",
  "/learn": "/images/articles/bioinformatics-glossary.webp",
  "/tools": "/images/articles/arabic-bioinformatics-tools.webp",
  "/about": "/images/articles/protein-features-ai.webp",
  "/contact": "/images/articles/what-is-btc.webp",
  "/sitemap": "/images/articles/bioinformatics-glossary.webp",
};

/** Build an absolute URL for a locale + path pair. */
export function localeUrl(locale: string, path: string): string {
  const suffix = path === "/" ? "" : path;
  return `${SITE_URL}/${locale}${suffix}`;
}
