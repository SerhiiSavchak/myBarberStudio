/**
 * Builds tab + Apple touch icons from the header logo PNG.
 * Source: public/images/logo/header-logo-dark.png
 * White / light-neutral pixels → near-black; red accents preserved.
 * Output uses a transparent canvas (no solid fill behind the mark).
 * Run: npm run favicon
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const srcPath = path.join(root, "public/images/logo/header-logo-dark.png");

/** Letterbox / padding — fully transparent (browser tab supplies the backdrop) */
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

/**
 * Larger than 1 draws the logo bigger inside the favicon tile (thin triangle outline reads badly at 16px).
 * Big tile can use slightly less zoom to avoid harsh crops.
 */
const ZOOM_SMALL = 1.5;
const ZOOM_MEDIUM = 1.42;
const ZOOM_APPLE = 1.34;

/**
 * Turns bright grayscale / whitish strokes into ink black; skips saturated pixels (reds).
 */
function repaintBrightNeutralPixelsToBlack(rgbaBuffer, channels) {
  if (channels !== 4) {
    throw new Error(`Expected 4-channel RGBA, got ${channels}`);
  }
  for (let i = 0; i < rgbaBuffer.length; i += 4) {
    const a = rgbaBuffer[i + 3];
    if (a < 26) continue;
    const r = rgbaBuffer[i];
    const g = rgbaBuffer[i + 1];
    const b = rgbaBuffer[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const saturation = max === 0 ? 0 : (max - min) / max;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    if (luminance >= 0.62 && saturation <= 0.24) {
      rgbaBuffer[i] = 8;
      rgbaBuffer[i + 1] = 8;
      rgbaBuffer[i + 2] = 8;
    }
  }
}

async function preprocessedLogoPngBuffer() {
  const { data, info } = await sharp(srcPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const buf = Buffer.from(data);
  repaintBrightNeutralPixelsToBlack(buf, info.channels);
  return sharp(buf, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .png()
    .toBuffer();
}

async function toSquarePng(logoBuf, size, zoom) {
  const targetLong = Math.round(size * zoom);
  const resized = await sharp(logoBuf)
    .resize(targetLong, targetLong, { fit: "inside", background: TRANSPARENT })
    .png()
    .toBuffer();

  const meta = await sharp(resized).metadata();
  const rw = meta.width ?? size;
  const rh = meta.height ?? size;

  if (rw < size || rh < size) {
    return sharp(resized).resize(size, size, { fit: "contain", background: TRANSPARENT }).png().toBuffer();
  }

  const left = Math.max(0, Math.min(Math.floor((rw - size) / 2), rw - size));
  const top = Math.max(0, Math.min(Math.floor((rh - size) / 2), rh - size));

  return sharp(resized).extract({ left, top, width: size, height: size }).png().toBuffer();
}

async function main() {
  const logoPng = await preprocessedLogoPngBuffer();

  const [ico48, ico32, ico16] = await Promise.all([
    toSquarePng(logoPng, 48, ZOOM_SMALL),
    toSquarePng(logoPng, 32, ZOOM_SMALL),
    toSquarePng(logoPng, 16, ZOOM_SMALL),
  ]);
  const icoBuffer = await pngToIco([ico48, ico32, ico16]);
  fs.mkdirSync(path.join(root, "app"), { recursive: true });
  fs.writeFileSync(path.join(root, "app/favicon.ico"), icoBuffer);

  fs.writeFileSync(
    path.join(root, "app/icon.png"),
    await toSquarePng(logoPng, 96, ZOOM_MEDIUM)
  );

  fs.writeFileSync(
    path.join(root, "app/apple-icon.png"),
    await toSquarePng(logoPng, 180, ZOOM_APPLE)
  );

  console.log("Written app/favicon.ico, app/icon.png, app/apple-icon.png");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
