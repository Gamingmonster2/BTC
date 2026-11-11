import type { MetadataRoute } from "next";
import { ARTICLE_SLUGS } from "@/lib/articles";
import { LOCALES, PUBLIC_ROUTES, localeUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    ...PUBLIC_ROUTES,
    ...ARTICLE_SLUGS.map((slug) => ({
      path: `/learn/${slug}`,
      priority: 0.6,
      changeFrequency: "yearly" as const,
    })),
  ];

  return routes.flatMap((route) =>
    LOCALES.map((locale) => ({
      url: localeUrl(locale, route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((alt) => [alt, localeUrl(alt, route.path)])
        ),
      },
    }))
  );
}
