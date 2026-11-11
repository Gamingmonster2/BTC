import { getTranslations } from "next-intl/server";
import { DnaIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";

// Evaluated at build time: pages are statically prerendered, so the year is
// baked into the HTML and only changes on a new deployment.
const CURRENT_YEAR = new Date().getFullYear();

const FOOTER_NAV = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "tools", href: "/tools" },
  { key: "learn", href: "/learn" },
  { key: "contact", href: "/contact" },
  { key: "sitemap", href: "/sitemap" },
] as const;

const FOOTER_TOOLS = [
  { key: "dna", href: "/tools/dna-analyzer" },
  { key: "primer", href: "/tools/primer-tm" },
] as const;

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const brand = await getTranslations("brand");
  const tools = await getTranslations("tools");
  const year = CURRENT_YEAR;

  return (
    <footer className="border-t">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <DnaIcon className="size-4" />
            </span>
            <span>{brand("short")}</span>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            {brand("tagline")}
          </p>
          <p className="max-w-xs text-sm text-muted-foreground">
            {t("description")}
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium">{t("navigation")}</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {FOOTER_NAV.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {nav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium">{t("tools")}</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {FOOTER_TOOLS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {tools(`list.${item.key === "dna" ? "0" : "1"}.name`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>
            © {year} {brand("short")}. {t("rights")}
          </p>
          <p>{t("builtWith")}</p>
        </div>
      </div>
    </footer>
  );
}
