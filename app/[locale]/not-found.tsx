import { getTranslations } from "next-intl/server";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function LocaleNotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">{t("description")}</p>
      <Button
        className="mt-8"
        nativeButton={false}
        render={<Link href="/" />}
      >
        <ArrowLeftIcon className="rtl:rotate-180" />
        {t("backHome")}
      </Button>
    </div>
  );
}
