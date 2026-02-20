"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

/** Shared options for section reveal animations — single observer pattern via framer-motion */
const SECTION_IN_VIEW_OPTIONS = {
  once: true,
  amount: 0.25,
  margin: "-50px 0px",
} as const;

export function useSectionInView() {
  const ref = useRef(null);
  const inView = useInView(ref, SECTION_IN_VIEW_OPTIONS);
  return { ref, inView };
}
