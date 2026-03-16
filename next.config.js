/** @type {import('next').NextConfig} */
const fs = require("fs");
const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** WebM exists only after running pnpm video:optimize — avoid 404 when absent */
const heroWebmPath = path.join(process.cwd(), "public", "hero-video.webm");
const heroWebmAvailable = fs.existsSync(heroWebmPath);

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_HERO_WEBM_AVAILABLE: heroWebmAvailable ? "true" : "false",
  },
  images: {
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 640],
    formats: ["image/avif", "image/webp"],
  },
  devIndicators: {},
};

module.exports = withBundleAnalyzer(nextConfig);
