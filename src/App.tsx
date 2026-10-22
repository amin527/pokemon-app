import { useState } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { Route, Routes } from "react-router";
import { PokemonDetailsRoute } from "./components/PokemonDetailsRoute/PokemonDetailsRoute";

import LandingDisplay from "./components/LandingDisplay/LandingDisplay";
import "./App.css";
import Layout from "./components/Layout/Layout";


function App() {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("theme") ?? "light";
  });


  return (
    <div data-testid="app">
      <ThemeContext.Provider value={{ theme, setTheme }}>
          <Routes>
            <Route element={<Layout/>}>
              <Route path="/" element={<LandingDisplay />} />
              <Route path="/pokemon/:id" element={<PokemonDetailsRoute />} />
            </Route>
          </Routes>
      </ThemeContext.Provider>
    </div>
  );
}
export default App;
