import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ARTICLES } from "@/lib/articles";
import type { ArticleLocale } from "@/lib/articles/types";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const t = await getTranslations("learn");
  return pageMetadata({
    title: t("title"),
    description: t("subtitle"),
    path: "/learn",
  });
}

export default async function LearnPage() {
  const t = await getTranslations("learn");
  const locale = (await getLocale()) as ArticleLocale;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <Badge variant="secondary" className="mb-4">
          {t("badge")}
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      <p className="mx-auto mt-12 max-w-3xl leading-8 text-muted-foreground">
        {t("intro")}
      </p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold tracking-tight">
          {t("articlesTitle")}
        </h2>
        <div className="mt-4 grid gap-4">
          {ARTICLES.map((article) => {
            const content = article.content[locale] ?? article.content.ar;
            return (
              <Link
                key={article.slug}
                href={`/${locale}/learn/${article.slug}`}
                className="group block"
              >
                <Card className="transition-colors group-hover:bg-muted/50">
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2">
                      {article.tool && (
                        <Badge variant="outline">{t("toolArticle")}</Badge>
                      )}
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <ClockIcon className="size-3.5" />
                        {t("readingTime", {
                          minutes: article.readingMinutes,
                        })}
                      </span>
                    </div>
                    <CardTitle className="flex items-start justify-between gap-3 text-lg">
                      <span>{content.title}</span>
                      <ArrowRightIcon className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                    </CardTitle>
                    <CardDescription className="leading-6">
                      {content.summary}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight">
          {t("topicsTitle")}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  {t(`topics.${i}`)}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
