import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

/**
 * Legacy paths from the previous btc.org.ly site.
 *
 * Arabic permalinks are non-ASCII, so they are matched on the decoded pathname
 * here rather than in `next.config.ts` (where `source` matching is byte-based).
 * A 301 passes the old URL's ranking on to the new page.
 */
const LEGACY_REDIRECTS: Record<string, string> = {
  "/new-btc": "/ar",
  "/new-btc/index.php": "/ar",
  "/مكتب-الإعلام-والنشر": "/ar",
};

export default function proxy(request: NextRequest) {
  const url = request.nextUrl;

  let path = url.pathname;
  try {
    path = decodeURIComponent(path);
  } catch {
    // Malformed escape sequence — leave the path untouched.
  }

  const normalized = path.replace(/\/+$/, "") || "/";
  const legacyTarget = LEGACY_REDIRECTS[normalized];
  if (legacyTarget) {
    return NextResponse.redirect(new URL(legacyTarget, url), 301);
  }

  return intl(request);
}

export const config = {
  // Match all pathnames except for
  // - API routes, route handlers
  // - internal Next.js paths
  // - static files (anything with a dot)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
