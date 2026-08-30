import { createContext } from "react";

type NavigationContextType = {
  stackNavigation: string[];
  navigationIndex: number;
  setStackNavigation: (value: string[]) => void;
  setNavigationIndex: (value: number) => void;
};

export const NavigationContext = createContext<NavigationContextType>({
  stackNavigation: ["/"],
  navigationIndex: 0,
  setStackNavigation: () => {},
  setNavigationIndex: () => {},
});
