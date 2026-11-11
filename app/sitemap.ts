import type { MetadataRoute } from "next";
import { LOCALES, PUBLIC_ROUTES, localeUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PUBLIC_ROUTES.flatMap((route) =>
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
