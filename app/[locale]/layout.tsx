import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import { routing } from "@/i18n/routing";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { ThemeProvider } from "@/components/site/theme-provider";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { DirectionProvider } from "@/components/ui/direction";
import "../globals.css";

const fontSans = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "BTC — Bioinformatics & AI for the Life Sciences",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  const locale = await getLocale();

  const languages = Object.fromEntries(
    routing.locales.map((alt) => [alt, `/${alt}`])
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: `%s — ${SITE_NAME}`,
    },
    description: t("description"),
    applicationName: SITE_NAME,
    alternates: {
      canonical: `/${locale}`,
      languages: { ...languages, "x-default": `/${routing.defaultLocale}` },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: locale === "ar" ? "ar_LY" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_LY",
      title: t("title"),
      description: t("description"),
      url: `/${locale}`,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  const meta = await getTranslations("meta");
  const dir = locale === "ar" ? "rtl" : "ltr";

  const siteJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/${locale}`,
        name: SITE_NAME,
        description: meta("description"),
        inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        description: meta("description"),
        sameAs: [],
      },
    ],
  };

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fontSans.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DirectionProvider direction={dir}>
            <NextIntlClientProvider messages={messages}>
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </NextIntlClientProvider>
          </DirectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
