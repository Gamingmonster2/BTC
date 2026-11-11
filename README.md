# BTC — Bioinformatics & AI for the Life Sciences

An independent, open-source software platform offering bioinformatics tools that run
entirely in the browser, plus Arabic-first educational content in bioinformatics and
computational biology.

Live domain (not connected yet): `btc.org.ly`

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
  transcription to mRNA, translation to protein, approximate molecular weight.
- **Primer Tm calculator** — length, GC content, Wallace (2+4) Tm, salt-adjusted Tm,
  reverse complement, GC clamp check.
- Honest About page, Learn section scaffold, contact form.
- SEO: per-page metadata, canonical URLs, `hreflang`, `sitemap.xml`, `robots.txt`,
  localized 404 pages.

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
  site/                header, footer, theme + language switchers, contact form
  tools/               interactive bioinformatics tools
  ui/                  shadcn/ui components
i18n/                  routing, request config, navigation wrappers
lib/
  bio/                 pure bioinformatics logic (DNA, primer)
  metadata.ts, site.ts
messages/              ar.json, en.json
proxy.ts               next-intl locale middleware (Next.js `proxy` convention)
```

## Configuration

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://btc.org.ly` | Canonical origin used in metadata, sitemap and robots |

## Accuracy notes

Tool outputs are educational estimates. The primer Tm formulas are simplified
(Wallace rule and a salt-adjusted approximation at 50 mM Na⁺). For laboratory-grade
design, use dedicated software such as Primer3 or OligoCalc.

## License

MIT — see [LICENSE](./LICENSE).
