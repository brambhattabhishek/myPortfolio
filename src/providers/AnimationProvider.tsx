
import { createContext, useContext, ReactNode } from "react";
import { AnimatePresence } from "framer-motion";

interface AnimationProviderProps {
  children: ReactNode;
}

const AnimationContext = createContext<null>(null);

export function AnimationProvider({ children }: AnimationProviderProps) {
  return (
    <AnimationContext.Provider value={null}>
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
}
