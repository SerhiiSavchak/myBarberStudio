"use client";

import { useCallback, useRef } from "react";
import { useHoverNone } from "./use-media-query";

const MOVE_THRESHOLD_PX = 10;
const FEEDBACK_DURATION_MS = 120;

/**
 * Scroll-safe tap with micro-feedback.
 * - Tap → immediate action (click propagates) + 80–120ms visual feedback
 * - If touch moves > 10px → treat as scroll, prevent click
 *
 * Desktop: no handlers (hover unchanged).
 * Mobile: scroll guard + brief tap-feedback class.
 */
export function useScrollSafeTap() {
  const isTouchDevice = useHoverNone();
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const scrollDetectedRef = useRef(false);
  const elRef = useRef<HTMLElement | null>(null);

  const setRef = useCallback((node: HTMLElement | null) => {
    elRef.current = node;
  }, []);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!isTouchDevice) return;
      const t = e.touches[0];
      if (t) {
        touchStartRef.current = { x: t.clientX, y: t.clientY };
        scrollDetectedRef.current = false;
      }
    },
    [isTouchDevice]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isTouchDevice || !touchStartRef.current) return;
      const t = e.touches[0];
      if (!t) return;
      const dx = Math.abs(t.clientX - touchStartRef.current.x);
      const dy = Math.abs(t.clientY - touchStartRef.current.y);
      if (dx > MOVE_THRESHOLD_PX || dy > MOVE_THRESHOLD_PX) {
        scrollDetectedRef.current = true;
      }
    },
    [isTouchDevice]
  );

  const onTouchEnd = useCallback(() => {
    touchStartRef.current = null;
  }, []);

  const onClickCapture = useCallback(
    (e: React.MouseEvent) => {
      if (!isTouchDevice) return;
      if (scrollDetectedRef.current) {
        e.preventDefault();
        e.stopPropagation();
        scrollDetectedRef.current = false;
        return;
      }
      const el = (e.currentTarget as HTMLElement) || elRef.current;
      if (el) {
        el.classList.add("tap-feedback");
        setTimeout(() => el.classList.remove("tap-feedback"), FEEDBACK_DURATION_MS);
      }
    },
    [isTouchDevice]
  );

  return {
    ref: setRef,
    tapHandlers: isTouchDevice
      ? {
          onTouchStart,
          onTouchMove,
          onTouchEnd,
          onClickCapture,
        }
      : {},
  };
}
