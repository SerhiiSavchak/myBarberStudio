"use client";

import { useScroll, type UseScrollOptions } from "framer-motion";

const WARNING_TEXT = "ensure that the container has a non-static position";

// Patch console.warn at module level — before any useScroll layout effects run.
// This suppresses the known false-positive warning from framer-motion when using
// useScroll({ target }) with window scroll on SSR-hydrated pages.
const originalWarn = console.warn;
console.warn = (...args: unknown[]) => {
  if (typeof args[0] === "string" && args[0].includes(WARNING_TEXT)) {
    return;
  }
  originalWarn.apply(console, args);
};

export function useScrollSuppressed(options: UseScrollOptions) {
  return useScroll(options);
}
