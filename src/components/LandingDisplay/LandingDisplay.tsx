import PokemonGrid from "../PokemonGrid/PokemonGrid";
import Pagination from "../Pagination/Pagination";
import PokemonSearch from "../PokemonSearch/PokemonSearch";
import PokemonGridSkeleton from "../PokemonGridSkeleton/PokemonGridSkeleton";
import BottomNavbar from "../BottomNavbar/BottomNavbar";
import TopNavbar from "../TopNavbar/TopNavbar";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { searchPokemon } from "../../functions/searchPokemon";
import { loadPokemon } from "../../functions/loadPokemon";
import { calculatePokemonFetchSize } from "../../functions/calculatePokemonFetchSize";
import { useComponentWidth } from "../../hooks/useComponentWidth";
import { POKEMON_GRID_HORIZONTAL_MARGIN } from "../../constants/PokemonGridConstants";
import { ThemeContext } from "../../contexts/ThemeContext";
import type { Pokemon } from "../../types/Pokemon";

import "./LandingDisplay.css";
import "../../animations/shake.css"
import "../../animations/pop.css"

function LandingDisplay() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { theme } = useContext(ThemeContext);

  const pokemonGridComponent = useRef(null);
  const pokemonGridWidth = useComponentWidth({
    component: pokemonGridComponent,
  });

  const handleNext = useCallback(() => {
    setIsLoading(true);
    setCurrentPage((page) => page + 1);
  }, []);

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

  const pokemonFetchSize =
    pokemonGridWidth > 0
      ? calculatePokemonFetchSize(
          pokemonGridWidth - 2 * POKEMON_GRID_HORIZONTAL_MARGIN,
        )
      : 0;

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

    if (!query) {
      return;
    }

    // Forced timeout added to make the fetch look longer
    const timeout = setTimeout(() => {
      searchPokemon({ query, setSearchResult, setError });
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm]);

  return (
    <div
      className={`landing-display ${theme == "light" ? "" : "landing-display--dark"}`}
      data-testid="landing-display"
    >
      {error && <div className="error-message">{error}</div>}
      <TopNavbar />
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
