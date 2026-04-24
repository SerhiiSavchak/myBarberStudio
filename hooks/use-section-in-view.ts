"use client";

import { useInView } from "./use-in-view";

/** Shared options for section reveal animations — single observer pattern */
const SECTION_IN_VIEW_OPTIONS = {
  once: true,
  /** 0 = fire as soon as any pixel of the target is in the root (reliable for thin lines) */
  amount: 0,
  margin: "0px",
} as const;

export function useSectionInView() {
  return useInView(SECTION_IN_VIEW_OPTIONS);
}
