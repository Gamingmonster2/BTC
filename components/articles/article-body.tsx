import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Article, ArticleLocale } from "@/lib/articles/types";

/**
 * Render a structured article body.
 *
 * Articles are plain data (see `lib/articles/types.ts`) so the renderer owns
 * direction, spacing and internal links. Code blocks are forced to LTR even in
 * the Arabic version, because DNA and protein strings are read left to right.
 */
export function ArticleBody({
  article,
  locale,
}: {
  article: Article;
  locale: ArticleLocale;
}) {
  const { blocks } = article.content[locale];

  return (
    <div className="space-y-5">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={index}
                className="pt-4 text-xl font-semibold tracking-tight"
              >
                {block.text}
              </h2>
            );

          case "p":
            return (
              <p
                key={index}
                className="leading-8 text-foreground/90 text-pretty"
              >
                {block.text}
              </p>
            );

          case "ul":
            return (
              <ul
                key={index}
                className="list-disc space-y-2 ps-6 leading-7 text-foreground/90"
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol
                key={index}
                className="list-decimal space-y-2 ps-6 leading-7 text-foreground/90"
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            );

          case "code":
            return (
              <figure key={index} className="space-y-2">
                {block.label && (
                  <figcaption className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {block.label}
                  </figcaption>
                )}
                <pre
                  dir="ltr"
                  className="overflow-x-auto rounded-lg border bg-muted/50 p-4 text-start font-mono text-xs leading-6"
                >
                  <code>{block.text}</code>
                </pre>
              </figure>
            );

          case "note":
            return (
              <div
                key={index}
                className="rounded-lg border border-s-4 border-s-primary/50 bg-muted/40 p-4"
              >
                {block.title && (
                  <p className="text-sm font-semibold">{block.title}</p>
                )}
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {block.text}
                </p>
              </div>
            );

          case "tool":
            return (
              <Link
                key={index}
                href={`/${locale}${block.href}`}
                className="group block"
              >
                <Card className="transition-colors group-hover:bg-muted/50">
                  <CardHeader>
                    <span className="text-xs font-medium uppercase tracking-wide text-primary">
                      {block.label}
                    </span>
                    <CardTitle className="flex items-center gap-2">
                      {block.title}
                      <ArrowRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                    </CardTitle>
                    <CardDescription>{block.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
        }
      })}
    </div>
  );
}
