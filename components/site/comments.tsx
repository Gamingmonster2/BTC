"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";

/**
 * Opt-in comments powered by Giscus (GitHub Discussions).
 *
 * Comments are disabled unless all four public environment variables are set:
 *   NEXT_PUBLIC_GISCUS_REPO          e.g. "Gamingmonster2/BTC"
 *   NEXT_PUBLIC_GISCUS_REPO_ID       from https://giscus.app
 *   NEXT_PUBLIC_GISCUS_CATEGORY      e.g. "Comments"
 *   NEXT_PUBLIC_GISCUS_CATEGORY_ID   from https://giscus.app
 *
 * See the "Comments" section in README.md for setup steps.
 */
const REPO = process.env.NEXT_PUBLIC_GISCUS_REPO;
const REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
const CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
const CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

export function Comments() {
  const t = useTranslations("comments");
  const locale = useLocale();
  const container = useRef<HTMLDivElement>(null);

  const configured = Boolean(REPO && REPO_ID && CATEGORY && CATEGORY_ID);

  useEffect(() => {
    if (!REPO || !REPO_ID || !CATEGORY || !CATEGORY_ID) return;
    if (!container.current) return;

    const mount = container.current;
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", REPO);
    script.setAttribute("data-repo-id", REPO_ID);
    script.setAttribute("data-category", CATEGORY);
    script.setAttribute("data-category-id", CATEGORY_ID);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", locale === "ar" ? "ar" : "en");
    script.setAttribute("data-loading", "lazy");

    mount.appendChild(script);

    return () => {
      mount.replaceChildren();
    };
  }, [configured, locale]);

  if (!configured) return null;

  return (
    <section className="mt-14 border-t pt-8">
      <h2 className="text-lg font-semibold tracking-tight">{t("title")}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{t("note")}</p>
      <div ref={container} className="mt-6" />
    </section>
  );
}
