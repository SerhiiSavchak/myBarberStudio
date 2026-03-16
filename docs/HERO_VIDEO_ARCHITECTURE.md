# Hero Background Video — Architecture

Deterministic hero background video with explicit media lifecycle.

## Lifecycle (State Machine)

```
idle → loading → canplay → attempting_play → [playing | fallback]
```

- **playing**: `play()` resolved or `playing` event — video is visually ready
- **fallback**: `play()` rejected (autoplay blocked), `error` event, or timeout — poster is safe to show

## Components

### 1. `useHeroMediaLifecycle` (hooks/use-hero-media-lifecycle.ts)

Manages video lifecycle with callback ref for robust attachment. Returns `videoCallbackRef`. Calls `onVisualReady` when:
- `play()` resolves (playing), or
- `playing` event fires, or
- `play()` rejects (autoplay blocked), or
- `error` event, or
- `fallbackMs` timeout

**Robust attachment**: Uses callback ref — no reliance on first effect run. Listeners attach when element is in DOM.

### 2. `HeroReadyContext` (lib/hero-ready-context.tsx)

- `heroReady`: true when hero media is visually safe to reveal
- `setHeroReady`: called by Hero when lifecycle reaches playing or fallback

### 3. `SiteLoader`

Reveal strategy: `(minDuration passed) AND (heroReady OR load+NO_HERO_FALLBACK_MS)`
- `heroReady`: from Hero when visualReady
- Fallback: if no Hero (non-home page), hide after `load` + `NO_HERO_FALLBACK_MS`
- Constants from `lib/hero-media-types.ts`

### 4. Hero component

Uses `useHeroMediaLifecycle`, passes `setHeroReady` as `onVisualReady`. Renders video with `ref={videoCallbackRef}`.

## Constants (lib/hero-media-types.ts)

- `FALLBACK_MS`: 4500 — max wait before forcing fallback
- `MIN_LOADER_MS`: 600 — minimum loader display time
- `EXIT_DURATION_MS`: 400 — loader exit fade
- `NO_HERO_FALLBACK_MS`: 3500 — fallback when no Hero on page

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

1. Copy `hooks/use-hero-media-lifecycle.ts`
2. Copy `lib/hero-media-types.ts`
3. Copy `lib/hero-ready-context.tsx`
4. Add `HeroReadyProvider` to layout, wrap `SiteLoader` + children
5. Hero: use `useHeroMediaLifecycle`, pass `setHeroReady` as `onVisualReady`
6. SiteLoader: use `useHeroReady`, implement reveal with constants from hero-media-types
7. Add CSS rules for `.hero-video` and `.hero-entrance-video`
