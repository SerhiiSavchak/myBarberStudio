# Performance Optimizations

## Summary of Changes

### A) Hero Video
- **preload="metadata"** — Video loads metadata first, full buffer after; reduces initial bandwidth
- **Poster image** — Fast LCP with hero-poster.jpg; preloaded via `<link rel="preload">` in layout
- **width/height** — Fixed dimensions to prevent layout shift (CLS)
- **WebM support** — Run `pnpm video:optimize` (requires ffmpeg) to create hero-video.webm for smaller mobile load; browser falls back to MP4

### B) Above-the-Fold / LCP
- Hero poster preload in layout head
- Video poster shows immediately while video loads
- Native scroll-based parallax (no Framer Motion in Hero)

### C) JS / TBT Reduction
- **Hero**: Replaced Framer Motion with native `useState` + `useEffect` scroll listener + CSS `transform`
- **SiteLoader**: Replaced Framer Motion with pure CSS animations
- Framer Motion now only loads in below-the-fold chunks (About, Tattoo, Gallery, Masters, PricingModal)

### D) Font Optimization
- Reduced font weights: Exo_2 and Inter use 400, 500, 700 only (removed 600)
- Already using `next/font` with `display: "swap"`

### E) Image Optimization
- **next.config**: `images.unoptimized: false` — Next.js image optimization enabled
- All images use `next/image` with proper `sizes`
- Below-the-fold sections lazy-loaded via dynamic imports

### F) General
- Tailwind content includes `hooks/` and `lib/`
- Bundle analyzer: `pnpm build:analyze`

## Video Optimization Script

Create WebM (smaller for mobile):

```bash
# Linux/macOS
pnpm video:optimize

# Windows (PowerShell)
.\scripts\optimize-hero-video.ps1
```

Requires [ffmpeg](https://ffmpeg.org/). After running, add `hero-video.webm` to `public/` and the Hero component will use it (WebM first, MP4 fallback).

## Validation

1. **Lighthouse** (Chrome DevTools → Lighthouse, mobile emulation):
   - LCP, TBT, CLS, Speed Index

2. **Hero video autoplay** — Verify on:
   - iOS Safari (muted + playsInline required)
   - Android Chrome
   - Desktop Chrome

3. **No regressions** — Layout, styling, parallax, loader animation
