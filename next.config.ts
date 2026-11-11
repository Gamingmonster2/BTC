import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // NOTE: `cacheComponents` / `partialPrefetching` are intentionally disabled.
  // OpenNext for Cloudflare (1.20.x) does not yet run Cache Components staged
  // renders correctly on workerd; combined with `proxy.ts` it makes pages hang.
  // Re-enable once the upstream scheduler fix ships in a stable release.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withNextIntl(nextConfig);

// Makes Cloudflare bindings (env vars, etc.) available during `next dev`.
initOpenNextCloudflareForDev();
