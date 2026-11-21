import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getArticle, getToolArticle } from "@/lib/articles";
import type { ArticleLocale } from "@/lib/articles/types";
import { PAGE_IMAGES, SITE_URL } from "@/lib/site";

/**
 * Build page metadata (title, description, canonical, hreflang alternates and
 * social cards) for a route that exists under every locale prefix.
 *
 * The cover image is resolved from the page's own data, so a new article or
 * tool automatically gets its own `og:image` without touching its page file.
 * Pass `image` explicitly only for a new kind of dynamic route (for example
 * `/event/[id]`) whose main image is not an article cover.
 *
 * Next merges metadata objects shallowly: a child `openGraph` object replaces
 * the one in the layout. That is why siteName/locale are repeated here.
 */
export async function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  image,
}: {
  title: string;
  description: string;
  /** Locale-free route path, e.g. `/learn/genetic-code-basics` or `/`. */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Explicit main image for routes not backed by article data. */
  image?: { src: string; alt?: string };
}): Promise<Metadata> {
  const locale = (await getLocale()) as ArticleLocale;
  const cleanPath = path === "/" ? "" : path;

  const languages = Object.fromEntries(
    routing.locales.map((alt) => [alt, `/${alt}${cleanPath}`])
  );

  const url = `/${locale}${cleanPath}`;
  const resolved = image ?? imageForPath(path, locale, title);
  const ogImage = toOgImage(resolved, title);
  const images = [ogImage];

  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? {
          type: "article",
          siteName: "BTC",
          locale: locale === "ar" ? "ar_LY" : "en_US",
          alternateLocale: locale === "ar" ? "en_US" : "ar_LY",
          title,
          description,
          url,
          images,
          publishedTime,
          modifiedTime: modifiedTime ?? publishedTime,
        }
      : {
          type: "website",
          siteName: "BTC",
          locale: locale === "ar" ? "ar_LY" : "en_US",
          alternateLocale: locale === "ar" ? "en_US" : "ar_LY",
          title,
          description,
          url,
          images,
        };

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...languages,
        "x-default": `/${routing.defaultLocale}${cleanPath}`,
      },
      types: {
        "application/rss+xml": `${SITE_URL}/rss.xml`,
      },
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

/** Find the page's main image from its own content, without page-level config. */
function imageForPath(
  path: string,
  locale: ArticleLocale,
  title: string
): { src: string; alt: string } | null {
  if (path.startsWith("/learn/")) {
    const article = getArticle(path.slice("/learn/".length));
    if (article?.cover) {
      return {
        src: article.cover.src,
        alt: article.cover.alt[locale] ?? article.cover.alt.ar,
      };
    }
  }

  if (path.startsWith("/tools/")) {
    const guide = getToolArticle(path.slice("/tools/".length));
    if (guide?.cover) {
      return {
        src: guide.cover.src,
        alt: guide.cover.alt[locale] ?? guide.cover.alt.ar,
      };
    }
  }

  const src = PAGE_IMAGES[path];
  return src ? { src, alt: title } : null;
}

type OgImage = { url: string; width: number; height: number; alt: string };

/** Point the social card at a crawler-friendly JPEG derived from the cover. */
function toOgImage(
  source: { src: string; alt?: string } | null,
  fallbackAlt: string
): OgImage {
  if (!source) {
    return {
      url: "/og.png",
      width: 1200,
      height: 630,
      alt: fallbackAlt,
    };
  }

  const cover = source.src.match(/^\/images\/articles\/([^/]+)\.webp$/);
  return {
    url: cover ? `/og/${cover[1]}.jpg` : source.src,
    width: 1200,
    height: 630,
    alt: source.alt ?? fallbackAlt,
  };
}
