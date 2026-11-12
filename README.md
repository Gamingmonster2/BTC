# BTC — Bioinformatics & AI for the Life Sciences

[![Live](https://img.shields.io/badge/live-btc.org.ly-0ea5e9)](https://btc.org.ly/ar)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4)](https://tailwindcss.com)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-f38020)](https://workers.cloudflare.com)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

An independent, open-source software platform offering bioinformatics tools that run
entirely in the browser, plus Arabic-first educational content in bioinformatics and
computational biology.

Live: **<https://btc.org.ly/ar>** (Arabic) · <https://btc.org.ly/en> (English)

> **Keywords / topics:** bioinformatics, computational biology, DNA sequence analysis,
> GC content, reverse complement, transcription, translation, primer design, primer Tm,
> melting temperature, molecular weight, Arabic bioinformatics, Arabic science education,
> RTL web app, Next.js, TypeScript, Cloudflare Workers, open source, browser-based tools,
> privacy-first, no data upload.

## What this project is — and is not

- **It is** a software initiative: interactive bioinformatics tools, Arabic educational
  content, and practical AI-for-biology material.
- **It is not** a wet lab. No laboratory experiments are performed or claimed.

This distinction is intentional and is stated on the public About page.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, Cache Components) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI components | shadcn/ui (Base UI primitives, RTL-enabled) |
| i18n | `next-intl` v4 with `next/root-params` |
| Theming | `next-themes` (light / dark / system) |

## Features (MVP)

- Bilingual site: Arabic (`/ar`, RTL) and English (`/en`, LTR), with locale-aware
  navigation, language switcher, and `hreflang` alternates.
- **DNA sequence analyzer** — base counts, GC content, reverse complement,
  transcription to mRNA, translation to protein in all three reading frames, and
  single-stranded molecular weight.
- **Primer Tm calculator** — length, GC content, Wallace (2+4) Tm with a validity
  warning, salt-adjusted Tm, reverse complement, and GC clamp strength.
- **ORF Finder** — six-frame scan on both strands, ATG start to the first in-frame
  stop codon, coordinates, nested hits, and copyable protein sequences.
- **Learn articles** — bilingual articles stored as structured TypeScript blocks,
  each internally linked to the tool it explains.
- **WhatsApp contact** — the number plus ready-made message templates (no server-side
  form, no stored messages).
- Honest About page, SEO metadata, canonical URLs, `hreflang`, `sitemap.xml`,
  `robots.txt`, an RSS feed, structured data (`WebSite`, `Organization`,
  `SoftwareApplication`, `BreadcrumbList`), and localized 404 pages.

All sequence analysis runs client-side; no sequence data leaves the browser.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The root path redirects to a locale prefix.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Project structure

```
app/
  [locale]/            root layout (html lang/dir), pages, localized 404
  robots.ts, sitemap.ts
  global-not-found.tsx
components/
  articles/            article body renderer (structured blocks)
  site/                header, footer, theme + language switchers, WhatsApp contact
  tools/               interactive bioinformatics tools
  ui/                  shadcn/ui components
i18n/                  routing, request config, navigation wrappers
lib/
  articles/            article content (AR + EN) and registry
  bio/                 pure bioinformatics logic (DNA, primer)
  metadata.ts, site.ts
messages/              ar.json, en.json
proxy.ts               next-intl locale middleware (Next.js `proxy` convention)
```

## Adding an article

1. Create `lib/articles/<slug>.ts` exporting an `Article` (see `lib/articles/types.ts`).
2. Register it in `lib/articles/index.ts`.
3. It is then available at `/<locale>/learn/<slug>`, listed on `/<locale>/learn`,
   and included in `sitemap.xml` automatically. Set `tool` to link the article to a
   tool page in both directions.

## Comments (opt-in)

Article pages render a Giscus (GitHub Discussions) comment box only when all four
public variables are set at build time:

| Variable | Example |
| --- | --- |
| `NEXT_PUBLIC_GISCUS_REPO` | `Gamingmonster2/BTC` |
| `NEXT_PUBLIC_GISCUS_REPO_ID` | from <https://giscus.app> |
| `NEXT_PUBLIC_GISCUS_CATEGORY` | `Comments` |
| `NEXT_PUBLIC_GISCUS_CATEGORY_ID` | from <https://giscus.app> |

Setup: make the repository public, install the giscus GitHub App, enable Discussions,
create a `Comments` category (Announcements type), then copy the IDs from giscus.app.
Without the variables the component renders nothing. Note that readers need a GitHub
account to comment, which is a real barrier for a general Arabic audience.

## Deployment (Cloudflare Workers)

This app is **not** a static site: it uses Server Components and middleware (`proxy.ts`),
so it cannot be deployed as Cloudflare Pages static assets. It deploys as a
**Cloudflare Worker** through the OpenNext adapter.

```bash
npm run preview   # build + run the Worker locally on http://localhost:8787
npm run deploy    # build + deploy to Cloudflare
```

- Build command: `npx opennextjs-cloudflare build`
- Deploy command: `npx wrangler deploy`
- Output: `.open-next/` (`worker.js` + `assets/`)
- Node.js: 22.x
- Config: `wrangler.jsonc`, `open-next.config.ts`

### Why `cacheComponents` is disabled

`next.config.ts` does not enable `cacheComponents` / `partialPrefetching`. OpenNext for
Cloudflare 1.20.x does not yet run Cache Components staged renders correctly on workerd:
the middleware bundle loads first and records the native `setImmediate`, so the
Cache Components scheduler never takes effect and any page rendered at request time
hangs with *"the Worker's code had hung"*. Re-enable only after the upstream scheduler
fix ships in a stable `@opennextjs/cloudflare` release.

## Configuration

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://btc.org.ly` | Canonical origin used in metadata, sitemap and robots |
| `NEXT_PUBLIC_GISCUS_*` | unset | Enables article comments (see above) |

## Accuracy notes

Tool outputs are educational estimates.

- **Molecular weight** uses standard single-stranded residue masses (A 313.21,
  T 304.20, G 329.21, C 289.18, minus 61.96 for the terminal phosphate). Double-stranded
  DNA weighs roughly twice as much; ambiguity codes are not counted.
- **Primer Tm** uses the Wallace rule (valid only for 14–20 nt, and the UI warns
  otherwise) and the Howley/OligoCalc salt-adjusted form with the `500/N` term at 50 mM
  Na⁺. A nearest-neighbor model is deliberately not implemented yet, because a
  half-correct implementation would be worse than an honest approximation. For
  laboratory-grade design, use dedicated software such as Primer3 or OligoCalc.
- **Translation** uses the standard genetic code and ignores mitochondrial or
  bacterial code variants. Ambiguous codons become `X`; stop codons become `*`.
- **ORF detection** scans all six frames (three per strand), starts at `ATG` and
  ends at the first in-frame `TAA`/`TAG`/`TGA`, or at the sequence end when no
  stop codon exists (flagged “no stop”). Up to 10 nested ATGs per stop-delimited
  region and at most 200 hits are returned, sorted by length. Splicing,
  alternative start codons (e.g. bacterial `GTG`/`TTG`), and non-standard genetic
  codes are not modelled. Input is capped at 50,000 bases.

## Sitemap and SEO

- `/<locale>/sitemap` — human-readable sitemap (every page, grouped by section).
- `/sitemap.xml` — machine-readable sitemap with `hreflang` alternates.
- `/rss.xml` — bilingual RSS feed for the Learn articles, linked from every page.
- `/robots.txt` — allows crawling, points at the sitemap.
- Legacy URLs from the previous site (`/new-btc/...`, `/wp-content/...`,
  `/ar/files/...`, Arabic permalinks) return **301** to a relevant page instead of
  404; `www.btc.org.ly` returns **308** to the apex domain.
- Article pages emit `Article` JSON-LD; tool pages emit `SoftwareApplication` +
  `BreadcrumbList`; the tools index emits `ItemList`; every page emits
  `WebSite` + `Organization` JSON-LD and canonical + `hreflang` alternates.

HTTPS is enforced at the Cloudflare edge: enable **SSL/TLS → Edge Certificates →
Always Use HTTPS** in the dashboard (the Worker does not redirect http itself).

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). In short: bilingual strings, documented
formulas, no tracking, and `tsc --noEmit` + `npm run lint` before a pull request.

Good first contributions:

- a new browser tool (sequence formats, codon usage, restriction sites),
- an Arabic explainer article for an existing tool,
- a translation or RTL fix.

## Discussions and support

- **Questions / ideas / general discussion:**
  [GitHub Discussions](https://github.com/Gamingmonster2/BTC/discussions)
- **Bug or feature request:**
  [Issues](https://github.com/Gamingmonster2/BTC/issues/new/choose)
- **Quick contact:** WhatsApp from <https://btc.org.ly/ar/contact>

### Supporting the project

The platform is free, has no ads, and runs without tracking. If it saves you time,
you can support its hosting and development:

- GitHub Sponsors: [github.com/sponsors/Gamingmonster2](https://github.com/sponsors/Gamingmonster2)
- Other ways (bank transfer, local payment apps): contact us via
  <https://btc.org.ly/ar/contact>

The Sponsor button is configured in [`.github/FUNDING.yml`](./.github/FUNDING.yml);
add your Ko-fi / Patreon / Liberapay handle there to show it automatically.

## License

MIT — see [LICENSE](./LICENSE).
