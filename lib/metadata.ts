import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

/**
 * Build page metadata (title, description, canonical and hreflang alternates)
 * for a route that exists under every locale prefix.
 *
 * Pass `type: "article"` with a publication date for Learn articles so search
 * engines and social previews treat the page as an article.
 */
export async function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}): Promise<Metadata> {
  const locale = await getLocale();

  const languages = Object.fromEntries(
    routing.locales.map((alt) => [alt, `/${alt}${path}`])
  );

  const url = `/${locale}${path}`;

  const images = [
    {
      url: "/og.png",
      width: 1200,
      height: 630,
      alt: "BTC — Bioinformatics & AI for the Life Sciences",
    },
  ];

  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? {
          type: "article",
          title,
          description,
          url,
          images,
          publishedTime,
          modifiedTime: modifiedTime ?? publishedTime,
        }
      : {
          type: "website",
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
        "x-default": `/${routing.defaultLocale}${path}`,
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
