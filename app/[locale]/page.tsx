import { getTranslations } from "next-intl/server";
import {
  ArrowRightIcon,
  BookOpenIcon,
  DnaIcon,
  FlaskConicalIcon,
  SparklesIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FEATURE_ICONS = [FlaskConicalIcon, BookOpenIcon, SparklesIcon];

export default async function HomePage() {
  const t = await getTranslations("home");
  const tools = await getTranslations("tools");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      {/* Hero */}
      <section className="flex flex-col items-center py-16 text-center sm:py-24">
        <Badge variant="outline" className="mb-6">
          {t("badge")}
        </Badge>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {t("subtitle")}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/tools" />}
          >
            {t("ctaTools")}
            <ArrowRightIcon className="rtl:rotate-180" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/about" />}
          >
            {t("ctaAbout")}
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("featuresTitle")}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <Card key={i}>
                <CardHeader>
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <CardTitle>{t(`features.${i}.title`)}</CardTitle>
                  <CardDescription>
                    {t(`features.${i}.description`)}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Tools */}
      <section className="py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {t("toolsTitle")}
            </h2>
            <p className="mt-1 text-muted-foreground">{t("toolsSubtitle")}</p>
          </div>
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href="/tools" />}
          >
            {t("ctaTools")}
            <ArrowRightIcon className="rtl:rotate-180" />
          </Button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[0, 1].map((i) => (
            <Link key={i} href={tools(`list.${i}.href`) as "/tools/dna-analyzer" | "/tools/primer-tm"}>
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <DnaIcon className="size-5" />
                  </span>
                  <CardTitle>{tools(`list.${i}.name`)}</CardTitle>
                  <CardDescription>
                    {tools(`list.${i}.description`)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-sm font-medium text-primary">
                    {t("ctaTools")}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* About snippet */}
      <section className="py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{t("aboutTitle")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{t("aboutText")}</p>
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/about" />}
            >
              {t("ctaAbout")}
              <ArrowRightIcon className="rtl:rotate-180" />
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
