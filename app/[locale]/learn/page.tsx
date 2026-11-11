import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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

      <p className="mx-auto mt-12 max-w-3xl text-muted-foreground">
        {t("intro")}
      </p>

      <div className="mt-8">
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
