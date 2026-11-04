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

  return (
    <div className="pokemon-search">
      {error && <div className="error-message">{error}</div>}
      <input
        className={`pokemon-search__input-field ${theme == "light" ? "" : "pokemon-search__input-field--dark"}`}
        type="text"
        value={searchTerm}
        onChange={(event) => onSearchTermChange(event.target.value)}
        placeholder="Search Pokémon"
        data-testid="pokemon-search-input-field"
      />
    </div>
  );
}
export default PokemonSearch;
