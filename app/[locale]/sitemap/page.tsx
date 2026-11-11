import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRightIcon, ExternalLinkIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { ARTICLES } from "@/lib/articles";
import type { ArticleLocale } from "@/lib/articles/types";
import { pageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata() {
  const t = await getTranslations("sitemap");
  return pageMetadata({
    title: t("title"),
    description: t("subtitle"),
    path: "/sitemap",
  });
}

type Entry = { title: string; description?: string; href: string };

export default async function SitemapPage() {
  const t = await getTranslations("sitemap");
  const nav = await getTranslations("nav");
  const tools = await getTranslations("tools");
  const locale = (await getLocale()) as ArticleLocale;

  const pages: Entry[] = [
    { title: nav("home"), href: "/" },
    { title: nav("about"), href: "/about" },
    { title: nav("tools"), href: "/tools" },
    { title: nav("learn"), href: "/learn" },
    { title: nav("contact"), href: "/contact" },
  ];

  const toolList = tools.raw("list") as Array<{
    name: string;
    description: string;
    href: string;
  }>;

  const toolEntries: Entry[] = toolList.map((tool) => ({
    title: tool.name,
    description: tool.description,
    href: tool.href,
  }));

  const articles: Entry[] = ARTICLES.map((article) => {
    const content = article.content[locale] ?? article.content.ar;
    return {
      title: content.title,
      description: content.summary,
      href: `/learn/${article.slug}`,
    };
  });

  const sections = [
    { key: "pages", entries: pages },
    { key: "tools", entries: toolEntries },
    { key: "articles", entries: articles },
  ] as const;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <Badge variant="secondary" className="mb-4">
        {t("badge")}
      </Badge>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
      <p className="mt-4 leading-8 text-muted-foreground">{t("intro")}</p>

      {sections.map((section) => (
        <section key={section.key} className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight">
            {t(`sections.${section.key}`)}
          </h2>
          <ul className="mt-3 divide-y rounded-xl border">
            {section.entries.map((entry) => (
              <li key={entry.href}>
                <Link
                  href={entry.href}
                  className="group flex items-start justify-between gap-3 px-4 py-3 transition-colors hover:bg-muted/50"
                >
                  <span>
                    <span className="block text-sm font-medium">
                      {entry.title}
                    </span>
                    {entry.description && (
                      <span className="mt-0.5 block text-sm text-muted-foreground">
                        {entry.description}
                      </span>
                    )}
                  </span>
                  <ArrowRightIcon className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">
          {t("sections.technical")}
        </h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <a
              href={`${SITE_URL}/sitemap.xml`}
              className="inline-flex items-center gap-1.5 text-primary underline-offset-4 hover:underline"
            >
              {t("xml")}
              <ExternalLinkIcon className="size-3.5" />
            </a>
          </li>
          <li>
            <a
              href={`${SITE_URL}/robots.txt`}
              className="inline-flex items-center gap-1.5 text-primary underline-offset-4 hover:underline"
            >
              {t("robots")}
              <ExternalLinkIcon className="size-3.5" />
            </a>
          </li>
        </ul>
      </section>

      <p className="mt-10 rounded-lg border border-s-4 border-s-primary/50 bg-muted/40 p-4 text-sm leading-6 text-muted-foreground">
        {t("note")}
      </p>
    </div>
  );
}
