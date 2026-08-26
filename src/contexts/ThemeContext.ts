import { createContext } from "react";

type ThemeContextType = {
    theme: string;
    setTheme: (value: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({ theme: "", setTheme: () => { } })
