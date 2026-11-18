import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRightIcon, BookOpenIcon } from "lucide-react";
import { ProteinFeaturesTool } from "@/components/tools/protein-features";
import { ArtImage } from "@/components/site/art-image";
import { JsonLd } from "@/components/site/json-ld";
import { BorderBeam } from "@/components/magicui/border-beam";
import { getToolArticle } from "@/lib/articles";
import type { ArticleLocale } from "@/lib/articles/types";
import { pageMetadata } from "@/lib/metadata";
import {
  breadcrumbJsonLd,
  softwareApplicationJsonLd,
} from "@/lib/structured-data";

export async function generateMetadata() {
  const t = await getTranslations("protein");
  return pageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/tools/protein-features",
  });
}

export default async function ProteinFeaturesPage() {
  const t = await getTranslations("protein");
  const common = await getTranslations("common");
  const nav = await getTranslations("nav");
  const tools = await getTranslations("tools");
  const locale = (await getLocale()) as ArticleLocale;
  const guide = getToolArticle("protein-features");

  const path = "/tools/protein-features";
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

      <div className="relative mb-10 overflow-hidden rounded-2xl border">
        <BorderBeam duration={9} />
        <div className="aspect-[3/1] w-full">
          <ArtImage
            src="/art/tool-protein.svg"
            alt={t("imageAlt")}
            priority
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-balance">
        {t("title")}
      </h1>
      <p className="mt-3 text-muted-foreground">{t("description")}</p>
      <div className="mt-8">
        <ProteinFeaturesTool />
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
