import { useId, useRef } from "react";
import { X } from "lucide-react";
import "./PokemonSearch.css";
import { useThemeStore } from "../../stores/useThemeStore";

interface PokemonSearchProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  error: string | null;
}

function PokemonSearch({
  searchTerm,
  onSearchTermChange,
  error,
}: PokemonSearchProps) {
  const theme = useThemeStore((store) => store.theme);
  const errorId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  function clearSearch() {
    onSearchTermChange("");
    inputRef.current?.focus();
  }

  return (
    <div className="pokemon-search">
      <div className="pokemon-search__field">
        <input
          ref={inputRef}
          className={`pokemon-search__input-field ${theme == "light" ? "" : "pokemon-search__input-field--dark"}`}
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
          placeholder="Search Pokémon"
          aria-label="Search Pokémon"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          data-testid="pokemon-search-input-field"
        />
        {searchTerm && (
          <button
            type="button"
            className="pokemon-search__clear"
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </div>
      <div id={errorId} className="error-message" aria-live="polite">
        {error}
      </div>
    </div>
  );
}
export default PokemonSearch;
