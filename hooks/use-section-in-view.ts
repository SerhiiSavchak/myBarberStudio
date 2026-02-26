"use client";

import { useInView } from "./use-in-view";

/** Shared options for section reveal animations — single observer pattern */
const SECTION_IN_VIEW_OPTIONS = {
  once: true,
  amount: 0.25,
  margin: "-50px 0px",
} as const;

export function useSectionInView() {
  return useInView(SECTION_IN_VIEW_OPTIONS);
}
