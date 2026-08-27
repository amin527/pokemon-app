import { useState } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { Route, Routes } from "react-router"
import LandingDisplay from "./components/LandingDisplay/LandingDisplay";
import "./App.css";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";

function App() {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("theme") ?? "light";
  });

  console.log(theme);

  return (
    <div data-testid="app">
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Routes>
          <Route path="/" element={<LandingDisplay />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </ThemeContext.Provider>
    </div>
  );
}
export default App;
