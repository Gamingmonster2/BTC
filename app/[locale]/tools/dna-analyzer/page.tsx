import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRightIcon, BookOpenIcon } from "lucide-react";
import { DnaAnalyzer } from "@/components/tools/dna-analyzer";
import { getToolArticle } from "@/lib/articles";
import type { ArticleLocale } from "@/lib/articles/types";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const t = await getTranslations("dna");
  return pageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/tools/dna-analyzer",
  });
}

export default async function DnaAnalyzerPage() {
  const t = await getTranslations("dna");
  const common = await getTranslations("common");
  const locale = (await getLocale()) as ArticleLocale;
  const guide = getToolArticle("dna-analyzer");

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 text-muted-foreground">{t("description")}</p>
      <div className="mt-8">
        <DnaAnalyzer />
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
