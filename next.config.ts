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

  async redirects() {
    return [
      // One canonical host: www → apex.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.btc.org.ly" }],
        destination: "https://btc.org.ly/:path*",
        permanent: true,
      },
      // Legacy WordPress URLs from the previous btc.org.ly site. Keep these
      // permanent (301) so existing search results and inbound links transfer
      // their ranking to the new pages instead of hitting a 404.
      { source: "/new-btc", destination: "/ar", permanent: true },
      { source: "/new-btc/:path*", destination: "/ar", permanent: true },
      { source: "/index.php", destination: "/ar", permanent: true },
      { source: "/index.php/:path*", destination: "/ar", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);

// Makes Cloudflare bindings (env vars, etc.) available during `next dev`.
initOpenNextCloudflareForDev();
