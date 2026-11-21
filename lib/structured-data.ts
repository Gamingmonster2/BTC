import type { Article, ArticleLocale } from "@/lib/articles/types";
import { SITE_URL } from "@/lib/site";

/**
 * Structured data for a browser tool page.
 *
 * `SoftwareApplication` is the schema.org type Google uses for web apps; the
 * free offer and `isAccessibleForFree` flags make the "free" nature explicit
 * instead of leaving it to inference from the page copy.
 */
export function softwareApplicationJsonLd({
  name,
  description,
  path,
  locale,
}: {
  name: string;
  description: string;
  path: string;
  locale: ArticleLocale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: `${SITE_URL}/${locale}${path}`,
    applicationCategory: "EducationalApplication",
    applicationSubCategory: "Bioinformatics",
    operatingSystem: "Any modern web browser",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    inLanguage: locale,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/** `WebPage` node that ties a page to the site-wide `WebSite` in the layout. */
export function webPageJsonLd({
  title,
  description,
  path,
  locale,
  image,
}: {
  title: string;
  description: string;
  /** Locale-free path, e.g. `/about` or `/learn/dna-vs-rna`. */
  path: string;
  locale: ArticleLocale;
  image?: string;
}) {
  const url = `${SITE_URL}/${locale}${path === "/" ? "" : path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: locale,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    ...(image
      ? {
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: `${SITE_URL}${image}`,
          },
        }
      : {}),
  };
}

/** `Article` node for a Learn deep link, with its cover and canonical URL. */
export function articleJsonLd({
  article,
  locale,
  title,
  description,
}: {
  article: Article;
  locale: ArticleLocale;
  title: string;
  description: string;
}) {
  const url = `${SITE_URL}/${locale}/learn/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: locale,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@id": `${url}#webpage` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    ...(article.cover
      ? {
          image: {
            "@type": "ImageObject",
            url: `${SITE_URL}${article.cover.src}`,
            caption: article.cover.alt[locale],
          },
        }
      : {}),
  };
}

/** `BreadcrumbList` for a page. `path` values must include the locale prefix. */
export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
