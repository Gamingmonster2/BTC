import { getTranslations } from "next-intl/server";
import { EyeIcon, ScaleIcon, TargetIcon, BadgeCheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const t = await getTranslations("about");
  return pageMetadata({
    title: t("title"),
    description: t("intro"),
    path: "/about",
  });
}

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <Badge variant="outline" className="mb-4">
          {t("badge")}
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {t("intro")}
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <EyeIcon className="size-5" />
            </span>
            <CardTitle>{t("visionTitle")}</CardTitle>
            <CardDescription>{t("visionText")}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <TargetIcon className="size-5" />
            </span>
            <CardTitle>{t("missionTitle")}</CardTitle>
            <CardDescription>{t("missionText")}</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <BadgeCheckIcon className="size-5" />
          </span>
          <CardTitle>{t("transparencyTitle")}</CardTitle>
          <CardDescription className="leading-relaxed">
            {t("transparencyText")}
          </CardDescription>
        </CardHeader>
      </Card>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("valuesTitle")}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Card key={i}>
              <CardHeader>
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ScaleIcon className="size-5" />
                </span>
                <CardTitle>{t(`values.${i}.title`)}</CardTitle>
                <CardDescription>
                  {t(`values.${i}.description`)}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
