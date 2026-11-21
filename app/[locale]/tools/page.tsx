import { getLocale, getTranslations } from "next-intl/server";
import {
  ArrowRightIcon,
  BrainCircuitIcon,
  DnaIcon,
  ScanLineIcon,
  ThermometerIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JsonLd } from "@/components/site/json-ld";
import type { ArticleLocale } from "@/lib/articles/types";
import { pageMetadata } from "@/lib/metadata";
import { PAGE_IMAGES, SITE_URL } from "@/lib/site";
import { webPageJsonLd } from "@/lib/structured-data";

type ToolEntry = { name: string; description: string; href: string };

const TOOL_ICONS = [DnaIcon, ThermometerIcon, ScanLineIcon, BrainCircuitIcon];

export async function generateMetadata() {
  const t = await getTranslations("tools");
  return pageMetadata({
    title: t("title"),
    description: t("subtitle"),
    path: "/tools",
  });
}

export default async function ToolsPage() {
  const t = await getTranslations("tools");
  const common = await getTranslations("common");
  const locale = (await getLocale()) as ArticleLocale;

  const list = t.raw("list") as ToolEntry[];

  const jsonLd = [
    webPageJsonLd({
      title: t("title"),
      description: t("subtitle"),
      path: "/tools",
      locale,
      image: PAGE_IMAGES["/tools"],
    }),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: t("title"),
      itemListElement: list.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.name,
        url: `${SITE_URL}/${locale}${tool.href}`,
      })),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <JsonLd data={jsonLd} />
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {list.map((tool, index) => {
          const Icon = TOOL_ICONS[index] ?? DnaIcon;
          return (
            <Link
              key={tool.href}
              href={
                tool.href as
                  | "/tools/dna-analyzer"
                  | "/tools/primer-tm"
                  | "/tools/orf-finder"
                  | "/tools/protein-features"
              }
            >
              <Card className="card-lift h-full hover:border-brand/40">
                <CardHeader>
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Icon className="size-5" />
                  </span>
                  <CardTitle>{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-1 text-sm font-medium text-brand">
                  {common("tryTool")}
                  <ArrowRightIcon className="size-4 rtl:rotate-180" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
