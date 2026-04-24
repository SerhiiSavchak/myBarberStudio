"use client";

import { useLayoutEffect, useState, type RefObject } from "react";

/** Stable width in px for the element — used for full-bleed images inside a clipping mask. */
export function useElementWidth<T extends HTMLElement>(ref: RefObject<T | null>): number {
  const [w, setW] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = () => setW(el.getBoundingClientRect().width);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return w;
}
