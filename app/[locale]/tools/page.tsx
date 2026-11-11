import { getTranslations } from "next-intl/server";
import { ArrowRightIcon, DnaIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pageMetadata } from "@/lib/metadata";

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

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {[0, 1].map((i) => (
          <Link
            key={i}
            href={
              t(`list.${i}.href`) as "/tools/dna-analyzer" | "/tools/primer-tm"
            }
          >
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardHeader>
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <DnaIcon className="size-5" />
                </span>
                <CardTitle>{t(`list.${i}.name`)}</CardTitle>
                <CardDescription>{t(`list.${i}.description`)}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-1 text-sm font-medium text-primary">
                {common("tryTool")}
                <ArrowRightIcon className="size-4 rtl:rotate-180" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
