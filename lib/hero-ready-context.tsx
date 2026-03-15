"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface HeroReadyContextValue {
  /** Hero video is ready to play (canplaythrough) or has failed with fallback */
  heroReady: boolean;
  /** Call when hero video is ready — triggers loader to hide (after MIN_DURATION) */
  setHeroReady: () => void;
}

const HeroReadyContext = createContext<HeroReadyContextValue>({
  heroReady: false,
  setHeroReady: () => {},
});

export function HeroReadyProvider({ children }: { children: ReactNode }) {
  const [heroReady, setHeroReadyState] = useState(false);

  const setHeroReady = useCallback(() => {
    setHeroReadyState(true);
  }, []);

  return (
    <HeroReadyContext.Provider value={{ heroReady, setHeroReady }}>
      {children}
    </HeroReadyContext.Provider>
  );
}

export function useHeroReady() {
  return useContext(HeroReadyContext);
}
