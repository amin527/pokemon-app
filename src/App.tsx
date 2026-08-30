import { useState } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { Route, Routes } from "react-router";
import LandingDisplay from "./components/LandingDisplay/LandingDisplay";
import "./App.css";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";
import { NavigationContext } from "./contexts/NavigationContext";

function App() {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("theme") ?? "light";
  });

  const [stackNavigation, setStackNavigation] = useState<string[]>(["/"]);
  const [navigationIndex, setNavigationIndex] = useState<number>(0);

  return (
    <div data-testid="app">
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <NavigationContext.Provider
          value={{
            stackNavigation,
            setStackNavigation,
            navigationIndex,
            setNavigationIndex,
          }}
        >
          <Routes>
            <Route path="/" element={<LandingDisplay />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
          </Routes>
        </NavigationContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}
export default App;
