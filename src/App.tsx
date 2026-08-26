import { createContext, useEffect, useState } from "react";
import "./App.css";
import LandingDisplay from "./components/LandingDisplay/LandingDisplay";

type ThemeContextType = { 
  theme: string;
  setTheme: (value: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({theme: "", setTheme: () =>{}})

function App() {

  const [theme, setTheme] = useState<string>("light")

  useEffect(() => {
    const loadedTheme = localStorage.getItem("theme")
    if (loadedTheme) { setTheme(loadedTheme) }
  }, [])

  return (
    <div data-testid="app">
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <LandingDisplay />
      </ThemeContext.Provider>
    </div>
  );
}

export default App;