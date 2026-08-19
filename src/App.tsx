import PokemonGrid from "./components/PokemonGrid/PokemonGrid";
import { useEffect, useState } from "react";
import { getPokemonList, getPokemon } from "./api/pokemonApi";
import type { Pokemon } from "./types/pokemon";
import Pagination from "./components/Pagination/Pagination";
import PokemonSearch from "./components/PokemonSearch/PokemonSearch";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<Pokemon | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 20;

  async function searchPokemon(query: string) {
    try {
      const pokemon = await getPokemon(query);
      const pokemonFormatted = {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other["official-artwork"].front_default,
        types: pokemon.types.map((type) => type.type.name),
      };
      setSearchResult(pokemonFormatted);
      setSearchError(null);
    } catch {
      setSearchResult(null);
      setSearchError("No Pokémon found");
    }
  }

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);

    if (!value.trim()) {
      setSearchResult(null);
      setSearchError(null);
    }
  };

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

  useEffect(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return;
    }

    const timeout = setTimeout(() => {
      searchPokemon(query);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm]);

  return (
    <div>
      {searchError && <div className="error-message">{searchError}</div>}
      <PokemonSearch
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
      />
      <PokemonGrid pokemon={searchResult ? [searchResult] : pokemon} />
      {!searchResult && (
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPrevious={() => setCurrentPage((page) => page - 1)}
          onNext={() => setCurrentPage((page) => page + 1)}
        />
      )}
    </div>
  );
}

export default App;
