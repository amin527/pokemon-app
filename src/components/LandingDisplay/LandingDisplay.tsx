import PokemonGrid from "../PokemonGrid/PokemonGrid";
import Pagination from "../Pagination/Pagination";
import PokemonSearch from "../PokemonSearch/PokemonSearch";
import PokemonGridSkeleton from "../PokemonGridSkeleton/PokemonGridSkeleton";
import { useEffect, useState } from "react";
import { searchPokemon } from "../../Functions/searchPokemon";
import { loadPokemon } from "../../Functions/loadPokemon";
import type { Pokemon } from "../../types/pokemon";
import BottomNavbar from "../BottomNavbar/BottomNavbar";

function LandingDisplay() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleNext = () => {
    setIsLoading(true);
    setCurrentPage((page) => page + 1);
  };

  const handlePrevious = () => {
    setIsLoading(true);
    setCurrentPage((page) => page - 1);
  };

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);

    if (!value.trim()) {
      setSearchResult(null);
      setError(null);
    }
  };

  useEffect(() => {
    loadPokemon({ currentPage, setError, setPokemon, setIsLoading });
  }, [currentPage]);

  useEffect(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) { return }

    // Forced timeout added to make the fetch look longer
    const timeout = setTimeout(() => {
      searchPokemon({ query, setSearchResult, setError });
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm]);

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      <PokemonSearch
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
      />
      {isLoading ? (
        <PokemonGridSkeleton />
      ) : (
        <PokemonGrid pokemon={searchResult ? [searchResult] : pokemon} />
      )}
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
