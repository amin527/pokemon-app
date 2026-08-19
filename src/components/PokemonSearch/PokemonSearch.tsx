import "./PokemonSearch.css";

interface PokemonSearchProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
}

function PokemonSearch({ searchTerm, onSearchTermChange }: PokemonSearchProps) {
  return (
    <div className="pokemon-search">
      <input
        className="pokemon-search__input-field"
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
