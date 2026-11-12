import type { Article } from "./types";
import { whatIsBtc } from "./what-is-btc";
import { dnaAnalyzerGuide } from "./dna-analyzer-guide";
import { primerTmGuide } from "./primer-tm-guide";
import { orfFinderGuide } from "./orf-finder-guide";
import { arabicBioinformaticsTools } from "./arabic-bioinformatics-tools";

/**
 * All published articles, newest first.
 * Add a new article by creating a file next to this one and appending it here.
 */
export const ARTICLES: Article[] = [
  arabicBioinformaticsTools,
  orfFinderGuide,
  whatIsBtc,
  dnaAnalyzerGuide,
  primerTmGuide,
];

/** Slugs of all published articles, used for static params and the sitemap. */
export const ARTICLE_SLUGS = ARTICLES.map((article) => article.slug);

/** Look up an article by its slug. */
export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

/** Look up the guide article for a tool slug. */
export function getToolArticle(tool: string): Article | undefined {
  return ARTICLES.find((article) => article.tool === tool);
}
