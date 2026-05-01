/**
 * Hero LCP poster: PNG → WebP (smaller download, same Next/Image pipeline).
 * Run: node scripts/optimize-hero-poster.mjs
 * Requires: sharp (project dependency)
 */
import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const input = join(root, "public/videos/hero/hero-poster.png");
const output = join(root, "public/videos/hero/hero-poster.webp");

await sharp(input)
  /** Higher quality poster — sharper LCP hero still; ~2× bytes vs low quality, much less “artifacty”. */
  .webp({ quality: 92, effort: 6, smartSubsampleEnabled: false })
  .toFile(output);

console.log("Wrote", output);
