"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface HeroReadyContextValue {
  /** True when hero media is visually ready (playing or poster fallback) — loader may reveal */
  heroReady: boolean;
  /** Called by Hero when media lifecycle reaches playing or fallback */
  setHeroReady: () => void;
}

const HeroReadyContext = createContext<HeroReadyContextValue>({
  heroReady: false,
  setHeroReady: () => {},
});

export function HeroReadyProvider({ children }: { children: ReactNode }) {
  const [heroReady, setHeroReadyState] = useState(false);
  const setHeroReady = useCallback(() => setHeroReadyState(true), []);

  return (
    <HeroReadyContext.Provider value={{ heroReady, setHeroReady }}>
      {children}
    </HeroReadyContext.Provider>
  );
}

export function useHeroReady() {
  return useContext(HeroReadyContext);
}
