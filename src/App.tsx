import { useState } from "react";
import "./App.css";
import LandingDisplay from "./components/LandingDisplay/LandingDisplay";
import { ThemeContext } from "./contexts/ThemeContext";

function App() {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("theme") ?? "light";
  });

  return (
    <div data-testid="app">
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <LandingDisplay />
      </ThemeContext.Provider>
    </div>
  );
}
export default App;
