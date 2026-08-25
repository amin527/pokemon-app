import { useContext } from "react";
import "./PokemonSearch.css";
import { ThemeContext } from "../../App";

interface PokemonSearchProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
}

function PokemonSearch({ searchTerm, onSearchTermChange }: PokemonSearchProps) {

  const { theme } = useContext(ThemeContext); 
  const pokemonSearchInputFieldClassName = theme == "light" ? "pokemon-search__input-field" : "pokemon-search__input-field dark"

  return (
    <div className="pokemon-search">
      <input
        className={pokemonSearchInputFieldClassName}
        type="text"
        value={searchTerm}
        onChange={(event) => onSearchTermChange(event.target.value)}
        placeholder="Search Pokémon"
        aria-label="Search Pokémon"
      />
    </div>
  );
}
export default PokemonSearch;
