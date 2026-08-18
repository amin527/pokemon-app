import PokemonGrid from "./components/PokemonGrid/PokemonGrid";
import { useEffect, useState } from "react";
import { getPokemonList, getPokemon } from "./api/pokemonApi";
import type { Pokemon } from "./types/pokemon";

function App() {
  
  const [pokemon, setPokemon] = useState<Pokemon[]>([])

  useEffect(() => {
    async function loadPokemon(){
      const pokemonListBasic = await getPokemonList(20, 0);
      const pokemonListDetailed = await Promise.all(pokemonListBasic.results.map((pokemonBasic) => getPokemon(pokemonBasic.name)))
      const pokemonListFormatted = pokemonListDetailed.map((pokemonDetailed) => ({
        id: pokemonDetailed.id,
        name: pokemonDetailed.name,
        image: pokemonDetailed.sprites.other["official-artwork"].front_default,
        types: pokemonDetailed.types.map((type) => type.type.name),
      }))
      setPokemon(pokemonListFormatted)
    }
    loadPokemon();
  }, [])

  return (
    <div>
      <PokemonGrid pokemon={pokemon} />
    </div>
  );
}

export default App;
