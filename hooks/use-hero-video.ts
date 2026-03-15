"use client";

import { useEffect, useRef } from "react";

export interface UseHeroVideoOptions {
  /** Called once when hero is visually ready to reveal (playing or fallback) */
  onReady: () => void;
  /** Max wait before forcing fallback (safety, not primary path) */
  maxWaitMs?: number;
}

/**
 * Manages hero background video lifecycle: load → canplay → play() → ready.
 * Deterministic readiness: signals only when video is playing OR fallback is safe.
 * No play icon, no broken states.
 */
export function useHeroVideo(options: UseHeroVideoOptions) {
  const { onReady, maxWaitMs = 4000 } = options;
  const videoRef = useRef<HTMLVideoElement>(null);
  const readySignaledRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const signalReady = () => {
      if (readySignaledRef.current) return;
      readySignaledRef.current = true;
      onReady();
    };

    const tryPlayAndSignal = async () => {
      try {
        await video.play();
        signalReady();
      } catch {
        /* Autoplay blocked: poster stays, no play icon. Still safe to reveal. */
        signalReady();
      }
    };

    const onCanPlay = () => tryPlayAndSignal();
    const onError = () => signalReady();

    if (video.readyState >= 3) {
      tryPlayAndSignal();
    } else {
      video.addEventListener("canplay", onCanPlay, { once: true });
      video.addEventListener("error", onError, { once: true });
    }

    const timeout = setTimeout(signalReady, maxWaitMs);

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("visibilitychange", onVisibility);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
    };
  }, [onReady, maxWaitMs]);

  return { videoRef };
}
