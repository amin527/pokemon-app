import PokemonGrid from "../PokemonGrid/PokemonGrid";
import Pagination from "../Pagination/Pagination";
import PokemonSearch from "../PokemonSearch/PokemonSearch";
import PokemonGridSkeleton from "../PokemonGridSkeleton/PokemonGridSkeleton";
import BottomNavbar from "../BottomNavbar/BottomNavbar";
import TopNavbar from "../TopNavbar/TopNavbar";

import { useContext, useEffect, useRef, useState } from "react";
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
  const [searchResult, setSearchResult] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [totalPokemon, setTotalPokemon] = useState<number | null>(null);

  const {
    navigationHistory,
    setNavigationHistory,
    navigationIndex,
    setNavigationIndex,
  } = useContext(NavigationContext);

  const { theme } = useContext(ThemeContext);
  const pokemonGridComponent = useRef(null);
  const pokemonGridWidth = useComponentWidth({
    component: pokemonGridComponent,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parsePage(searchParams.get("page"));
  const query = searchParams.get("query")
  const normalisedQuery = (query ?? "").trim().toLowerCase();
  const displayedResult = normalisedQuery ? searchResult : null;
  const displayedError = normalisedQuery ? searchError : error;
  const [searchTerm, setSearchTerm] = useState(query ?? "")
  const [prevQuery, setPrevQuery] = useState(query);

  if (query !== prevQuery) {
    setPrevQuery(query);
    setSearchTerm(query ?? "");
  }


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

  useEffect(() => {

    if (!searchTerm.trim()) {
      setSearchParams((prev) => {
        const newParam = new URLSearchParams(prev)
        newParam.delete("query")
        return newParam
      }, { replace: true })
      return;
    }

    const timeout = setTimeout(() => {
      setSearchParams((prev) => {
        const newParam = new URLSearchParams(prev)
        newParam.set("query", searchTerm)
        return newParam
      }, { replace: true })
    }, 500);

    return () => { clearTimeout(timeout); };

  }, [searchTerm, setSearchParams])


  useEffect(() => {
    if (!normalisedQuery) return;
    searchPokemon({ query: normalisedQuery, setSearchResult, setSearchError });
  }, [query, normalisedQuery]);


  function goToPage(page: number) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(page));

    setSearchParams(newParams);
    setNavigationIndex(navigationIndex + 1);
    setNavigationHistory([
      ...navigationHistory.slice(0, navigationIndex + 1),
      `/?${newParams.toString()}`,
    ]);
  }

  useEffect(() => {
    const searchString = searchParams.toString();
    const relativeUrl = searchString ? `/?${searchString}` : "/";

    if (navigationHistory[navigationIndex] == relativeUrl) return;

    const updatedNavigationHistory = [...navigationHistory];
    updatedNavigationHistory[navigationIndex] = relativeUrl;
    setNavigationHistory(updatedNavigationHistory);
  }, [searchParams, navigationHistory, navigationIndex, setNavigationHistory]);

  console.log(navigationHistory);

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

  return (
    <div
      className={`landing-display ${theme == "light" ? "" : "landing-display--dark"}`}
      data-testid="landing-display"
    >
      <TopNavbar />
      <PokemonSearch
        error={displayedError}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />
      <div ref={pokemonGridComponent}>
        {isLoading ? (
          <PokemonGridSkeleton pokemonFetchSize={pokemonFetchSize} />
        ) : (
          <PokemonGrid
            pokemonGridWidth={pokemonGridWidth}
            pokemon={displayedResult ? [displayedResult] : pokemon}
          />
        )}
      </div>
      {!displayedResult && totalPages !== null && (
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
