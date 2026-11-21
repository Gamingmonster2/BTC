import { getLocale, getTranslations } from "next-intl/server";
import {
  ArrowRightIcon,
  BookOpenIcon,
  BrainCircuitIcon,
  DnaIcon,
  FlaskConicalIcon,
  ScanLineIcon,
  SparklesIcon,
  ThermometerIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArtImage } from "@/components/site/art-image";
import { JsonLd } from "@/components/site/json-ld";
import { PhotoCover } from "@/components/site/photo-cover";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Marquee } from "@/components/magicui/marquee";
import { Meteors } from "@/components/magicui/meteors";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { GridPattern } from "@/components/magicui/patterns";
import { ARTICLES } from "@/lib/articles";
import type { ArticleLocale } from "@/lib/articles/types";
import { pageMetadata } from "@/lib/metadata";
import { PAGE_IMAGES } from "@/lib/site";
import { webPageJsonLd } from "@/lib/structured-data";

export async function generateMetadata() {
  const meta = await getTranslations("meta");
  const base = await pageMetadata({
    title: meta("title"),
    description: meta("description"),
    path: "/",
  });
  // The layout title template would otherwise repeat the site name.
  return { ...base, title: { absolute: meta("title") } };
}

const FEATURE_ICONS = [FlaskConicalIcon, BookOpenIcon, SparklesIcon];
const TOOL_ICONS = [DnaIcon, ThermometerIcon, ScanLineIcon, BrainCircuitIcon];

const HOW_IMAGES = [
  "/art/step-paste.svg",
  "/art/step-analyze.svg",
  "/art/step-result.svg",
];

type ToolEntry = { name: string; description: string; href: string };
type StatEntry = { value: number; suffix: string; label: string };
type StepEntry = { title: string; description: string };

export default async function HomePage() {
  const t = await getTranslations("home");
  const tools = await getTranslations("tools");
  const locale = (await getLocale()) as ArticleLocale;

  const toolList = tools.raw("list") as ToolEntry[];
  const stats = t.raw("stats") as StatEntry[];
  const steps = t.raw("howSteps") as StepEntry[];
  const keywords = t.raw("marquee") as string[];
  const latest = ARTICLES.slice(0, 3);
  const jsonLd = webPageJsonLd({
    title: t("title"),
    description: t("subtitle"),
    path: "/",
    locale,
    image: PAGE_IMAGES["/"],
  });

  return (
    <div className="w-full">
      <JsonLd data={jsonLd} />
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="surface pointer-events-none absolute inset-0 -z-10">
          <GridPattern
            id="hero-grid"
            size={64}
            className="text-foreground/[0.055] mask-fade-b"
          />
          <Meteors className="opacity-70" />
        </div>

        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div>
            <Badge variant="outline" className="mb-6 gap-1.5 bg-background/60">
              <SparklesIcon className="size-3 text-brand" />
              {t("badge")}
            </Badge>
            <h1 className="max-w-2xl text-4xl font-bold leading-[1.12] tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]">
              <AuroraText>{t("title")}</AuroraText>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              {t("subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="glow-brand"
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

            <dl className="mt-10 grid max-w-lg grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="text-2xl font-semibold tracking-tight text-brand">
                      <NumberTicker value={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-tight text-muted-foreground">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border bg-card shadow-2xl shadow-brand/10">
              <BorderBeam duration={10} />
              <div className="aspect-[16/11] w-full">
                <ArtImage
                  src="/art/hero.svg"
                  alt={t("heroImageAlt")}
                  priority
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
              </div>
            </div>
            <div className="animate-float absolute -bottom-5 start-4 rounded-xl border bg-background/85 px-3 py-2 text-xs font-medium shadow-lg backdrop-blur">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-brand" />
                {t("chipBrowser")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Marquee */}
      <section className="border-y bg-muted/30 py-4">
        <Marquee className="mask-fade-x [--gap:3rem]">
          {keywords.map((word) => (
            <span
              key={word}
              className="flex items-center gap-3 text-sm font-medium text-muted-foreground"
            >
              <span className="size-1.5 rounded-full bg-brand/60" />
              {word}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ------------------------------------------------------------ Features */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <BlurFade>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("featuresTitle")}
          </h2>
        </BlurFade>
        <BentoGrid className="mt-8">
          {[0, 1, 2].map((i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <BlurFade key={i} delay={i * 80}>
                <BentoCard className="h-full">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-medium">{t(`features.${i}.title`)}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                    {t(`features.${i}.description`)}
                  </p>
                </BentoCard>
              </BlurFade>
            );
          })}
        </BentoGrid>
      </section>

      {/* --------------------------------------------------------- How it works */}
      <section className="relative overflow-hidden border-y bg-muted/20 py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {t("howTitle")}
            </h2>
            <p className="mt-2 text-muted-foreground">{t("howSubtitle")}</p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((step, i) => (
              <BlurFade key={step.title} delay={i * 100}>
                <div className="group h-full overflow-hidden rounded-2xl border bg-card card-lift">
                  <div className="relative aspect-[3/2] w-full overflow-hidden">
                    <ArtImage
                      src={HOW_IMAGES[i]}
                      alt={step.title}
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute start-3 top-3 flex size-7 items-center justify-center rounded-full border border-white/20 bg-black/50 text-xs font-semibold text-white backdrop-blur">
                      {i + 1}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-medium">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- Tools */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
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

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {toolList.map((tool, i) => {
            const Icon = TOOL_ICONS[i] ?? DnaIcon;
            return (
              <BlurFade key={tool.href} delay={i * 70}>
                <Link
                  href={
                    tool.href as
                      | "/tools/dna-analyzer"
                      | "/tools/primer-tm"
                      | "/tools/orf-finder"
                      | "/tools/protein-features"
                  }
                  className="block h-full"
                >
                  <div className="card-lift flex h-full flex-col rounded-2xl border bg-card p-5 hover:border-brand/40">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
                      <Icon className="size-4.5" />
                    </span>
                    <h3 className="mt-4 text-sm font-medium leading-snug">
                      {tool.name}
                    </h3>
                    <p className="mt-1.5 flex-1 text-xs leading-5 text-muted-foreground">
                      {tool.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand">
                      {t("ctaTools")}
                      <ArrowRightIcon className="size-3 rtl:rotate-180" />
                    </span>
                  </div>
                </Link>
              </BlurFade>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------ Articles */}
      <section className="border-t bg-muted/20 py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {t("latestTitle")}
              </h2>
              <p className="mt-1 text-muted-foreground">
                {t("latestSubtitle")}
              </p>
            </div>
            <Button
              variant="ghost"
              nativeButton={false}
              render={<Link href="/learn" />}
            >
              {t("ctaLearn")}
              <ArrowRightIcon className="rtl:rotate-180" />
            </Button>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {latest.map((article, i) => {
              const content = article.content[locale] ?? article.content.ar;
              return (
                <BlurFade key={article.slug} delay={i * 80}>
                  <a
                    href={`/${locale}/learn/${article.slug}`}
                    className="group block h-full overflow-hidden rounded-2xl border bg-card card-lift"
                  >
                    {article.cover && (
                      <PhotoCover
                        compact
                        src={article.cover.src}
                        alt={article.cover.alt[locale]}
                        eyebrow={t("latestTitle")}
                        sizes="(max-width: 768px) 100vw, 360px"
                      />
                    )}
                    <div className="p-5">
                      <h3 className="text-sm font-medium leading-snug">
                        {content.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted-foreground">
                        {content.summary}
                      </p>
                    </div>
                  </a>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- About */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border bg-card p-8">
          <div className="pointer-events-none absolute inset-0 -z-0 opacity-60">
            <GridPattern
              id="about-grid"
              size={44}
              className="text-foreground/[0.05]"
            />
          </div>
          <div className="relative">
            <h2 className="text-xl font-semibold tracking-tight">
              {t("aboutTitle")}
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              {t("aboutText")}
            </p>
            <Button
              variant="outline"
              className="mt-5"
              nativeButton={false}
              render={<Link href="/about" />}
            >
              {t("ctaAbout")}
              <ArrowRightIcon className="rtl:rotate-180" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
