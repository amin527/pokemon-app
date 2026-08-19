import PokemonGrid from "./components/PokemonGrid/PokemonGrid";
import { useEffect, useState } from "react";
import { getPokemonList, getPokemon } from "./api/pokemonApi";
import type { Pokemon } from "./types/pokemon";
import Pagination from "./components/Pagination/Pagination";

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 20;

  useEffect(() => {
    async function fetchPokemon() {
      const offset = (currentPage - 1) * PAGE_SIZE;
      const pokemonListBasic = await getPokemonList(PAGE_SIZE, offset);
      const pokemonListDetailed = await Promise.all(
        pokemonListBasic.results.map((pokemonBasic) =>
          getPokemon(pokemonBasic.name),
        ),
      );
      const pokemonListFormatted = pokemonListDetailed.map(
        (pokemonDetailed) => ({
          id: pokemonDetailed.id,
          name: pokemonDetailed.name,
          image:
            pokemonDetailed.sprites.other["official-artwork"].front_default,
          types: pokemonDetailed.types.map((type) => type.type.name),
        }),
      );
      setPokemon(pokemonListFormatted);
    }
    fetchPokemon();
  }, [currentPage]);

  return (
    <div>
      <PokemonGrid pokemon={pokemon} />
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPrevious={() => setCurrentPage((page) => page - 1)}
        onNext={() => setCurrentPage((page) => page + 1)}
      />
    </div>
  );
}

export default App;
