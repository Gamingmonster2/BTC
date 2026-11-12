import type { ArticleLocale } from "@/lib/articles/types";
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
