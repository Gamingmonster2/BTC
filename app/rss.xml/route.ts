import { ARTICLES } from "@/lib/articles";
import type { ArticleLocale } from "@/lib/articles/types";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const LOCALES: ArticleLocale[] = ["ar", "en"];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Bilingual RSS feed for the Learn articles.
 *
 * Prerendered at build time (`force-static`), so it costs nothing at request
 * time on the Worker. Feed readers and syndication services can follow it
 * without scraping the HTML pages.
 */
export function GET() {
  const items = ARTICLES.flatMap((article) =>
    LOCALES.map((locale) => {
      const content = article.content[locale];
      const url = `${SITE_URL}/${locale}/learn/${article.slug}`;
      return {
        title: content.title,
        link: url,
        description: content.summary,
        date: new Date(`${article.date}T00:00:00Z`).toUTCString(),
        timestamp: Date.parse(`${article.date}T00:00:00Z`),
        language: locale,
      };
    })
  ).sort((a, b) => b.timestamp - a.timestamp);

  const itemXml = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="true">${escapeXml(item.link)}</guid>
      <pubDate>${item.date}</pubDate>
      <description>${escapeXml(item.description)}</description>
      <dc:language>${item.language}</dc:language>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${SITE_NAME} — Learn</title>
    <link>${SITE_URL}/ar/learn</link>
    <description>Arabic and English articles on bioinformatics, DNA analysis and browser-based tools.</description>
    <language>ar</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${itemXml}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
