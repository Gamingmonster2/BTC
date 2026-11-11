import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

/**
 * Build page metadata (title, description, canonical and hreflang alternates)
 * for a route that exists under every locale prefix.
 */
export async function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Promise<Metadata> {
  const locale = await getLocale();

  const languages = Object.fromEntries(
    routing.locales.map((alt) => [alt, `/${alt}${path}`])
  );

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        ...languages,
        "x-default": `/${routing.defaultLocale}${path}`,
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: `/${locale}${path}`,
    },
  };
}
