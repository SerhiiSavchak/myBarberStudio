/**
 * Hero background media — explicit lifecycle types.
 * Single source of truth for media state and reveal coordination.
 */

export type HeroMediaState =
  | "idle" // Video not yet attached
  | "loading" // Video mounted, buffering
  | "canplay" // Enough data to play
  | "attempting_play" // play() in progress
  | "playing" // Video actually playing
  | "fallback" // Autoplay blocked or error — poster is safe
  | "error"; // Load error

/** True when video is playing or poster fallback is active — safe to reveal */
export type VisualReady = boolean;

/** True when loader may dismiss — derived from visualReady + minDuration */
export type RevealAllowed = boolean;

export const HERO_MEDIA_CONSTANTS = {
  /** Max wait before forcing fallback — allow slow networks + large buffers after optimized transcodes */
  FALLBACK_MS: 15_000,
  /** Min loader display time — polish */
  MIN_LOADER_MS: 500,
  /** Loader exit fade duration */
  EXIT_DURATION_MS: 350,
  /** Fallback when no Hero on page — interface readiness, not media */
  NO_HERO_FALLBACK_MS: 800,
  /** 0 = start after next paint (double rAF); optional override if re-prioritizing vs images */
  VIDEO_LOAD_DELAY_MS: 0,
} as const;
