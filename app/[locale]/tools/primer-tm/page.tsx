import { getTranslations } from "next-intl/server";
import { PrimerTm } from "@/components/tools/primer-tm";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const t = await getTranslations("primer");
  return pageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/tools/primer-tm",
  });
}

export default async function PrimerTmPage() {
  const t = await getTranslations("primer");

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 text-muted-foreground">{t("description")}</p>
      <div className="mt-8">
        <PrimerTm />
      </div>
    </div>
  );
}
