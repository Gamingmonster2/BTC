import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from "lucide-react";
import { ArticleBody } from "@/components/articles/article-body";
import { Comments } from "@/components/site/comments";
import { Badge } from "@/components/ui/badge";
import { ARTICLE_SLUGS, getArticle } from "@/lib/articles";
import type { ArticleLocale } from "@/lib/articles/types";
import { pageMetadata } from "@/lib/metadata";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLE_SLUGS.map((slug) => ({ slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

function formatDate(iso: string, locale: ArticleLocale) {
  return new Intl.DateTimeFormat(
    locale === "ar" ? "ar-LY-u-nu-latn" : "en-GB",
    { year: "numeric", month: "long", day: "numeric" }
  ).format(new Date(iso));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const locale = (await getLocale()) as ArticleLocale;
  const content = article.content[locale] ?? article.content.ar;

  return pageMetadata({
    title: content.title,
    description: content.summary,
    path: `/learn/${article.slug}`,
    type: "article",
    publishedTime: article.date,
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const locale = (await getLocale()) as ArticleLocale;
  const content = article.content[locale] ?? article.content.ar;
  const t = await getTranslations("learn");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    description: content.summary,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: locale,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/${locale}/learn/${article.slug}`,
  };

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Link
        href={`/${locale}/learn`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4 rtl:rotate-180" />
        {t("backToLearn")}
      </Link>

      <header className="mt-6 border-b pb-8">
        {article.tool && (
          <Badge variant="secondary" className="mb-3">
            {t("toolArticle")}
          </Badge>
        )}
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
          {content.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
          {content.summary}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarIcon className="size-3.5" />
            {formatDate(article.date, locale)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="size-3.5" />
            {t("readingTime", { minutes: article.readingMinutes })}
          </span>
        </div>
      </header>

      <div className="mt-8">
        <ArticleBody article={article} locale={locale} />
      </div>

      <Comments />
    </article>
  );
}
