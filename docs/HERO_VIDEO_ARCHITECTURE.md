# Hero Background Video — Architecture

Reusable pattern for reliable hero background video across projects.

## Lifecycle

```
mount → video attached → canplay → play() → [playing | fallback] → signalReady
```

- **playing**: `play()` resolved, video is playing
- **fallback**: `play()` rejected (autoplay blocked), error, or timeout — poster stays, no play icon

## Components

### 1. `useHeroVideo` (hooks/use-hero-video.ts)

Manages video lifecycle. Returns `videoRef`. Calls `onReady` when:
- `play()` resolves (video playing), or
- `play()` rejects (autoplay blocked), or
- `error` event, or
- `maxWaitMs` timeout

**Video attributes**: `autoPlay`, `muted`, `loop`, `playsInline`, `preload="auto"`, `poster`

### 2. `HeroReadyContext` (lib/hero-ready-context.tsx)

- `heroReady`: boolean — true when hero media is visually safe to reveal
- `setHeroReady`: called by Hero when ready

### 3. `SiteLoader`

Reveal strategy: `(minDuration passed) AND (heroReady OR load+fallback)`
- `heroReady`: from Hero
- Fallback: if no Hero (other page), hide after `load` + `FALLBACK_WAIT_MS`
- Never hides before `MIN_DURATION_MS`

### 4. Hero component

Uses `useHeroVideo`, passes `setHeroReady`. Renders video with correct attributes.

## CSS Requirements

```css
/* Hide native controls */
.hero-video::-webkit-media-controls,
.hero-video::-webkit-media-controls-overlay-play-button { display: none !important; }
.hero-video { pointer-events: none; }

/* Prevent black flash */
.hero-entrance-video { background: hsl(var(--background)); }
```

## Layout Preload

```html
<link rel="preload" href="/hero-poster.jpg" as="image" fetchPriority="high" />
<link rel="preload" href="/hero-video.mp4" as="video" type="video/mp4" />
```

## Applying to Another Project

1. Copy `hooks/use-hero-video.ts`
2. Copy `lib/hero-ready-context.tsx`
3. Add `HeroReadyProvider` to layout, wrap `SiteLoader` + children
4. Hero: use `useHeroVideo`, pass `setHeroReady`
5. SiteLoader: use `useHeroReady`, implement same reveal logic
6. Add CSS rules for `.hero-video` and `.hero-entrance-video`
