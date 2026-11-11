import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes, route handlers
  // - internal Next.js paths
  // - static files (anything with a dot)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
