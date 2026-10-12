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
import { useSearchParams } from "react-router";

import "./LandingDisplay.css";
import "../../animations/shake.css";
import "../../animations/pop.css";
import { getPokemonCount } from "../../functions/API/getPokemonCount";
import { parsePage } from "../../functions/parsePage";
import { NavigationContext } from "../../contexts/NavigationContext";

function LandingDisplay() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPokemon, setTotalPokemon] = useState<number | null>(null);

  const { navigationHistory, setNavigationHistory, navigationIndex } =
    useContext(NavigationContext);

  const { theme } = useContext(ThemeContext);
  const pokemonGridComponent = useRef(null);
  const pokemonGridWidth = useComponentWidth({
    component: pokemonGridComponent,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parsePage(searchParams.get("page"));

  const pokemonFetchSize =
    pokemonGridWidth > 0
      ? calculatePokemonFetchSize(
          pokemonGridWidth - 2 * POKEMON_GRID_HORIZONTAL_MARGIN,
        )
      : 0;

  const totalPages =
    totalPokemon !== null && pokemonFetchSize > 0
      ? Math.ceil(totalPokemon / pokemonFetchSize)
      : null;

  function handleNext() {
    if (totalPages !== null && currentPage < totalPages) {
      setIsLoading(true);
      goToPage(currentPage + 1);
    }
  }

  function handlePrevious() {
    if (currentPage > 1) {
      setIsLoading(true);
      goToPage(currentPage - 1);
    }
  }

  const handleSearchTermChange = useCallback((value: string) => {
    setSearchTerm(value);

    if (!value.trim()) {
      setSearchResult(null);
      setError(null);
    }
  }, []);

  function goToPage(page: number) {
    setSearchParams((params) => {
      params.set("page", String(page));
      return params;
    });
  }

  useEffect(() => {
    const query = searchParams.toString();
    const url = query ? `/?${query}` : "/";

    if (navigationHistory[navigationIndex] == url) return;
    const updatedNavigationHistory = [...navigationHistory];
    updatedNavigationHistory[navigationIndex] = url;
    setNavigationHistory(updatedNavigationHistory);
  }, [searchParams, navigationHistory, navigationIndex, setNavigationHistory]);

  useEffect(() => {
    if (totalPages != null && currentPage > totalPages) {
      setSearchParams(
        (params) => {
          params.set("page", String(totalPages));
          return params;
        },
        {
          replace: true,
        },
      );
    }
  }, [currentPage, totalPages, setSearchParams]);

  useEffect(() => {
    const fetchPokemonCount = async () => {
      const pokemonCount = await getPokemonCount();
      setTotalPokemon(pokemonCount);
    };

    fetchPokemonCount();
  }, []);

  useEffect(() => {
    if (pokemonFetchSize === 0) return;
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
      <TopNavbar />
      <PokemonSearch
        error={error}
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
      {!searchResult && totalPages !== null && (
        <BottomNavbar>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </BottomNavbar>
      )}
    </div>
  );
}
export default LandingDisplay;
