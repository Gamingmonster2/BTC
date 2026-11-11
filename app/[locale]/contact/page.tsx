import { getTranslations } from "next-intl/server";
import { WhatsAppContact } from "@/components/site/whatsapp-contact";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const t = await getTranslations("contact");
  return pageMetadata({
    title: t("title"),
    description: t("subtitle"),
    path: "/contact",
  });
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>
      <div className="mt-10">
        <WhatsAppContact />
      </div>
    </div>
  );
}
