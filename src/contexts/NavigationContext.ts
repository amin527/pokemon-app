import { createContext } from "react";

type NavigationContextType = {
  navigationHistory: string[];
  navigationIndex: number;
  setNavigationHistory: (value: string[]) => void;
  setNavigationIndex: (value: number) => void;
};

export const NavigationContext = createContext<NavigationContextType>({
  navigationHistory: ["/"],
  navigationIndex: 0,
  setNavigationHistory: () => {},
  setNavigationIndex: () => {},
});
