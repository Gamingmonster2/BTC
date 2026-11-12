import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRightIcon, BookOpenIcon } from "lucide-react";
import { OrfFinder } from "@/components/tools/orf-finder";
import { JsonLd } from "@/components/site/json-ld";
import { getToolArticle } from "@/lib/articles";
import type { ArticleLocale } from "@/lib/articles/types";
import { pageMetadata } from "@/lib/metadata";
import {
  breadcrumbJsonLd,
  softwareApplicationJsonLd,
} from "@/lib/structured-data";

export async function generateMetadata() {
  const t = await getTranslations("orf");
  return pageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/tools/orf-finder",
  });
}

export default async function OrfFinderPage() {
  const t = await getTranslations("orf");
  const common = await getTranslations("common");
  const nav = await getTranslations("nav");
  const tools = await getTranslations("tools");
  const locale = (await getLocale()) as ArticleLocale;
  const guide = getToolArticle("orf-finder");

  const path = "/tools/orf-finder";
  const jsonLd = [
    softwareApplicationJsonLd({
      name: t("title"),
      description: t("description"),
      path,
      locale,
    }),
    breadcrumbJsonLd([
      { name: nav("home"), path: `/${locale}` },
      { name: tools("title"), path: `/${locale}/tools` },
      { name: t("title"), path: `/${locale}${path}` },
    ]),
  ];

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <JsonLd data={jsonLd} />
      <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 text-muted-foreground">{t("description")}</p>
      <div className="mt-8">
        <OrfFinder />
      </div>

      {guide && (
        <Link
          href={`/${locale}/learn/${guide.slug}`}
          className="group mt-10 block rounded-xl border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium">
            <BookOpenIcon className="size-4" />
            {common("readGuide")}
            <ArrowRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
          </span>
          <p className="mt-1 text-sm text-muted-foreground">
            {guide.content[locale].title}
          </p>
        </Link>
      )}
    </div>
  );
}
