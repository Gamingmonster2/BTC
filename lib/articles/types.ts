/** Content model for the Learn articles.
 *
 * Articles are stored as structured blocks instead of Markdown so that the
 * renderer can control direction (RTL/LTR), code blocks and internal links
 * without pulling in a Markdown parser.
 */

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; text: string; label?: string }
  | { type: "note"; title?: string; text: string }
  | {
      type: "tool";
      href: string;
      label: string;
      title: string;
      description: string;
    };

export interface ArticleContent {
  title: string;
  summary: string;
  blocks: ArticleBlock[];
}

export type ArticleLocale = "ar" | "en";

export interface Article {
  slug: string;
  /** ISO publication date. */
  date: string;
  readingMinutes: number;
  /** Slug of the tool this article explains, if any. */
  tool?: string;
  content: Record<ArticleLocale, ArticleContent>;
}
