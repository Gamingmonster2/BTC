import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — الصفحة غير موجودة | Page not found",
  description:
    "الرابط المطلوب غير متاح. The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground antialiased">
        <div className="w-full max-w-lg space-y-8 text-center">
          <p className="font-mono text-sm text-muted-foreground">404</p>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              الصفحة غير موجودة
            </h1>
            <p className="text-sm text-muted-foreground">
              الرابط الذي طلبته غير متاح أو تم نقله.
            </p>
          </div>

          <div className="space-y-2 border-t pt-6" dir="ltr" lang="en">
            <h2 className="text-lg font-semibold tracking-tight">
              Page not found
            </h2>
            <p className="text-sm text-muted-foreground">
              The page you are looking for does not exist or has moved.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/ar"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground"
            >
              العودة إلى الرئيسية
            </Link>
            <Link
              href="/en"
              className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium hover:bg-muted"
            >
              Back to home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
