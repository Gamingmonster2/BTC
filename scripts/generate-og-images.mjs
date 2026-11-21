// Builds share-preview images from the article cover photos.
//
// Each /images/articles/<slug>.webp becomes /og/<slug>.jpg at the 1200x630
// ratio expected by Facebook, WhatsApp, X and LinkedIn. Keeping a JPEG copy
// matters because WebP previews are still unreliable in some social crawlers.
//
// Run with: node scripts/generate-og-images.mjs
// (Run scripts/download-photos.mjs first if the source WebP files are missing.)

import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = path.join(ROOT, "public", "images", "articles");
const OUT = path.join(ROOT, "public", "og");

await mkdir(OUT, { recursive: true });

const covers = (await readdir(SOURCE)).filter((file) => file.endsWith(".webp"));
if (covers.length === 0) throw new Error(`No cover images found in ${SOURCE}`);

for (const file of covers) {
  const slug = path.basename(file, ".webp");
  await sharp(path.join(SOURCE, file))
    .rotate()
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(path.join(OUT, `${slug}.jpg`));
  console.log(`og/${slug}.jpg`);
}
