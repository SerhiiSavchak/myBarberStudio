# Hero Video Refactor — Audit & Changes

## Audit Findings

### 1. Critical Issues (Fixed)

| Issue | Root Cause | Fix |
|------|------------|-----|
| **Visible play button** | `autoplayBlocked` state showed a click-to-play overlay when autoplay was blocked | Removed entirely. When autoplay is blocked, poster stays visible with no UI. |
| **Premature ready signal** | `signalReady()` was called on `canplaythrough` before `play()` resolved | Now signal only when `play()` promise resolves, or on error/timeout/autoplay block. |
| **Race condition** | `canplay` → `play()` (async) and `canplaythrough` → `signalReady()` could fire in wrong order | Single flow: `canplay` → `tryPlayAndSignal()` → signal when `play()` resolves. |
| **Duplicate signal paths** | Both `canplaythrough` and `play().catch()` could signal, plus timeout | Simplified to: play resolves → signal; play rejects → signal; error → signal; timeout → signal. |

### 2. Structural Issues (Fixed)

- **Overcomplicated logic**: Two separate handlers (canplay + canplaythrough) with different responsibilities. Replaced with one `tryPlayAndSignal()` that awaits `play()`.
- **Dead code**: Removed `autoplayBlocked` state and play button JSX.
- **Unused listener**: Removed `canplaythrough` — we now rely on `play()` resolution for success path.

### 3. Loader / Video Sync

- Loader hides when `heroReady` is set.
- `heroReady` is now set only when video is actually playing (or we've given up: error, timeout, autoplay blocked).
- No more hiding loader while video is still buffering or not started.

### 4. Mobile / Autoplay

- `muted`, `playsInline`, `autoPlay`, `loop` — all correct for iOS Safari.
- `pointer-events: none` on video — prevents tap-to-play overlay on mobile.
- CSS: added `::-webkit-media-controls-overlay-play-button` and stronger hiding rules.

### 5. Fallback Behavior

- **Autoplay blocked**: Poster stays visible, no play icon, loader still hides.
- **Video error**: `signalReady()` called, poster remains.
- **Timeout (4s)**: `signalReady()` called regardless of video state.

### 6. What Was NOT Changed (By Design)

- **Poster**: Kept — provides clean fallback frame when video fails or autoplay blocked.
- **visibilitychange**: Kept — silently retries `play()` when user returns to tab.
- **SiteLoader logic**: Unchanged — MIN_DURATION, FALLBACK_WAIT, scheduleHide flow remain.
- **Hero entrance animations**: Unchanged — CSS-driven, no hydration issues.

## Files Modified

1. **`components/Hero.tsx`**
   - Removed `autoplayBlocked` state and play button overlay.
   - Replaced `play()` + `canplaythrough` with `tryPlayAndSignal()` that awaits `play()`.
   - Added `aria-hidden` to video (decorative background).
   - Simplified effect cleanup.

2. **`app/globals.css`**
   - Added `pointer-events: none` to `.hero-video`.
   - Added `::-webkit-media-controls-overlay-play-button` and stronger hiding rules.

3. **`app/layout.tsx`**
   - Added `<link rel="preload" href="/hero-video.mp4" as="video" type="video/mp4" />` for earlier video fetch.

## Verification Checklist

- [x] Build passes
- [x] No lint errors
- [ ] First load: hero video autoplays
- [ ] Refresh: same behavior
- [ ] Hard refresh: same behavior
- [ ] Mobile: autoplay works (muted + playsInline)
- [ ] Mobile: no play icon visible
- [ ] Autoplay blocked: poster visible, no play button
- [ ] No console errors

## Testing Notes

1. **Desktop**: Open site, verify video plays and loader hides smoothly.
2. **Mobile (Safari)**: Test with Low Power Mode off; autoplay should work when muted.
3. **Autoplay blocked**: In DevTools → Network, throttle to "Slow 3G", or use a browser that blocks autoplay; verify poster shows and no play icon appears.
4. **Hard refresh**: Ctrl+Shift+R (or Cmd+Shift+R) to ensure no stale cache.
