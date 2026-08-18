import { useEffect } from "react";
import { getPokemon } from "./api/pokemonApi";

function App() {
  useEffect(() => {
    getPokemon("pikachu").then((pokemon) => {
      console.log(pokemon);
    });
  }, []);

  return <h1>Pokémon App</h1>;
}

export default App;
