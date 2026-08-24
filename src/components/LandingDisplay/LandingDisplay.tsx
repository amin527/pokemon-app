import "./LandingDisplay.css";
import PokemonGrid from "../PokemonGrid/PokemonGrid";
import Pagination from "../Pagination/Pagination";
import PokemonSearch from "../PokemonSearch/PokemonSearch";
import PokemonGridSkeleton from "../PokemonGridSkeleton/PokemonGridSkeleton";
import { useCallback, useEffect, useRef, useState } from "react";
import { searchPokemon } from "../../functions/searchPokemon";
import { loadPokemon } from "../../functions/loadPokemon";
import type { Pokemon } from "../../types/pokemon";
import BottomNavbar from "../BottomNavbar/BottomNavbar";
import { calculatePokemonFetchSize } from "../../functions/calculatePokemonFetchSize";
import { useComponentWidth } from "../../hooks/useComponentWidth";
import { POKEMON_GRID_HORIZONTAL_MARGIN } from "../../constants/PokemonGridConstants";


function LandingDisplay() {

  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonFetchSize, setPokemonFetchSize] = useState(0);

  const pokemonGridComponent = useRef(null);
  const pokemonGridWidth = useComponentWidth({ component: pokemonGridComponent });

  console.log("pokemonFetchSize: ", pokemonFetchSize)
  console.log("pokemonGridWidth: ", pokemonGridWidth)

  const handleNext = useCallback(() => {
    setIsLoading(true);
    setCurrentPage((page) => page + 1);
  }, [])

  const handlePrevious = useCallback(() => {
    setIsLoading(true);
    setCurrentPage((page) => page - 1);
  }, []);

  const handleSearchTermChange = useCallback((value: string) => {
    setSearchTerm(value);

    if (!value.trim()) {
      setSearchResult(null);
      setError(null);
    }
  }, []);


  useEffect(() => {
    if (pokemonGridWidth > 0) {
      setPokemonFetchSize(calculatePokemonFetchSize(pokemonGridWidth - 2 * POKEMON_GRID_HORIZONTAL_MARGIN));
    }
  }, [pokemonGridWidth])

  useEffect(() => {
    loadPokemon({
      pokemonFetchSize,
      currentPage,
      setError,
      setPokemon,
      setIsLoading,
    });
  }, [currentPage, pokemonFetchSize]);

  useEffect(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) { return; }

    // Forced timeout added to make the fetch look longer
    const timeout = setTimeout(() => {
      searchPokemon({ query, setSearchResult, setError });
    }, 500);
    return () => { clearTimeout(timeout); };
  }, [searchTerm]);

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      <PokemonSearch
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
      />
      <div ref={pokemonGridComponent}>
        {isLoading ? (
          <PokemonGridSkeleton pokemonFetchSize={pokemonFetchSize} />
        ) : (
          <PokemonGrid
            pokemonGridWidth={pokemonGridWidth}
            pokemon={searchResult ? [searchResult] : pokemon}
          />
        )}
      </div>
      {!searchResult && (
        <BottomNavbar>
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </BottomNavbar>
      )}
    </div>
  );
}
export default LandingDisplay;
