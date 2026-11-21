// Downloads the free Pexels photos used as article covers and writes optimised
// WebP files to public/images/articles.
//
// Run with: node scripts/download-photos.mjs
//
// Source: Pexels (https://www.pexels.com/license/). All selected images are
// abstract molecular / neural-network artwork: no people, no animals, no
// living creatures. Attribution is not required by the Pexels licence, but the
// photographer and source page are recorded in SOURCES.md.

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "images", "articles");
await mkdir(OUT, { recursive: true });

const PHOTOS = [
  {
    slug: "what-is-btc",
    id: 35967917,
    url: "https://images.pexels.com/photos/35967917/pexels-photo-35967917/free-photo-of-abstract-visual-representation-of-dna-helix.png",
  },
  {
    slug: "dna-analyzer-guide",
    id: 25626515,
    url: "https://images.pexels.com/photos/25626515/pexels-photo-25626515/free-photo-of-close-up-of-abstract-shapes.jpeg",
  },
  {
    slug: "primer-tm-guide",
    id: 17485658,
    url: "https://images.pexels.com/photos/17485658/pexels-photo-17485658/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-depicts-how-ai-could-adapt-to-an-infinite-amount-of-uses-it-was-created-by-nidia-dias-as-part-of-the-visualising-ai-pr.png",
  },
  {
    slug: "orf-finder-guide",
    id: 25626518,
    url: "https://images.pexels.com/photos/25626518/pexels-photo-25626518/free-photo-of-abstract-shapes-of-molecule.jpeg",
  },
  {
    slug: "arabic-bioinformatics-tools",
    id: 28844047,
    url: "https://images.pexels.com/photos/28844047/pexels-photo-28844047/free-photo-of-dynamic-abstract-twisting-shapes-in-cool-tones.jpeg",
  },
  {
    slug: "protein-features-ai",
    id: 17485707,
    url: "https://images.pexels.com/photos/17485707/pexels-photo-17485707/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-visualises-an-artificial-neural-network-as-physical-objects-the-complex-structure-represents-a-network-of-infor.png",
  },
  {
    slug: "genetic-code-basics",
    id: 13014236,
    url: "https://images.pexels.com/photos/13014236/pexels-photo-13014236.jpeg",
  },
  {
    slug: "dna-vs-rna",
    id: 39588768,
    url: "https://images.pexels.com/photos/39588768/pexels-photo-39588768/free-photo-of-futuristic-dna-helix-structure-with-golden-accents.png",
  },
  {
    slug: "kmers-and-motifs",
    id: 25626587,
    url: "https://images.pexels.com/photos/25626587/pexels-photo-25626587/free-photo-of-ai-generated-shapes.jpeg",
  },
  {
    slug: "ai-in-bioinformatics",
    id: 17483870,
    url: "https://images.pexels.com/photos/17483870/pexels-photo-17483870/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-was-inspired-neural-networks-used-in-deep-learning-it-was-created-by-novoto-studio-as-part-of-the-visualising-ai-proje.png",
  },
  {
    slug: "bioinformatics-glossary",
    id: 7722849,
    url: "https://images.pexels.com/photos/7722849/pexels-photo-7722849.jpeg",
  },
];

for (const photo of PHOTOS) {
  const response = await fetch(`${photo.url}?auto=compress&cs=tinysrgb&w=1600`, {
    signal: AbortSignal.timeout(60000),
  });
  if (!response.ok) throw new Error(`${photo.id}: HTTP ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());

  const output = await sharp(buffer)
    .rotate() // respect EXIF orientation
    .resize(1400, 933, { fit: "cover", position: "attention" })
    .webp({ quality: 80, effort: 5 })
    .toFile(path.join(OUT, `${photo.slug}.webp`));

  console.log(`${photo.slug}.webp: ${(output.size / 1024).toFixed(0)} kB`);
}

await writeFile(
  path.join(OUT, "SOURCES.md"),
  `# Article cover photos\n\n` +
    `All images come from [Pexels](https://www.pexels.com/license/) under the free Pexels licence. ` +
    `They are abstract molecular, DNA or neural-network artwork — no people, animals or other living creatures.\n\n` +
    PHOTOS.map(
      (p) =>
        `- \`${p.slug}.webp\` — Pexels photo #${p.id}, ` +
        `https://www.pexels.com/photo/${p.id}/`
    ).join("\n") +
    "\n"
);
console.log("Wrote SOURCES.md");
