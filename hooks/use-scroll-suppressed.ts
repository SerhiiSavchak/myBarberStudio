"use client";

import { useLayoutEffect } from "react";
import { useScroll, type UseScrollOptions } from "framer-motion";

const WARNING_TEXT = "ensure that the container has a non-static position";

/**
 * Wrapper around framer-motion useScroll that suppresses the
 * false-positive "non-static position" console warning.
 *
 * The warning fires because framer-motion checks offsetParent
 * in a useLayoutEffect before CSS/Tailwind styles hydrate on
 * the server-rendered HTML, seeing position:static on the
 * not-yet-styled container. The actual scroll tracking works
 * correctly once styles are applied.
 */
export function useScrollSuppressed(options: UseScrollOptions) {
  // Patch console.warn in a useLayoutEffect (runs same phase as FM's check)
  useLayoutEffect(() => {
    const originalWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      if (typeof args[0] === "string" && args[0].includes(WARNING_TEXT)) {
        return;
      }
      originalWarn.apply(console, args);
    };

    // Restore on next microtask — FM's layoutEffect will have already fired
    queueMicrotask(() => {
      console.warn = originalWarn;
    });

    return () => {
      console.warn = originalWarn;
    };
  }, []);

  return useScroll(options);
}
