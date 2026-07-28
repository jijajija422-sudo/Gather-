"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface ZenModeContextType {
  zenMode: boolean;
  toggleZenMode: () => void;
}

const ZenModeContext = createContext<ZenModeContextType>({
  zenMode: false,
  toggleZenMode: () => {},
});

export function ZenModeProvider({ children }: { children: ReactNode }) {
  const [zenMode, setZenMode] = useState(false);

  const toggleZenMode = useCallback(() => {
    setZenMode((prev) => !prev);
  }, []);

  return (
    <ZenModeContext.Provider value={{ zenMode, toggleZenMode }}>
      {children}
    </ZenModeContext.Provider>
  );
}

export function useZenMode() {
  const context = useContext(ZenModeContext);
  if (!context) {
    throw new Error("useZenMode must be used within a ZenModeProvider");
  }
  return context;
}
