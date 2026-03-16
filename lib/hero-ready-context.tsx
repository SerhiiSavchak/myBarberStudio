"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface HeroReadyContextValue {
  /** True when Hero is mounted and poster is visible — loader may reveal (poster-first strategy) */
  heroReady: boolean;
  /** Called by Hero when mounted — poster is ready, video loads in background */
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
