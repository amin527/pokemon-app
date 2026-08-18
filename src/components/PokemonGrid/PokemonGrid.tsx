import PokemonCard from "../PokemonCard/PokemonCard";
import "./PokemonGrid.css";
import type { Pokemon } from "../../types/pokemon";

type PokemonGridProps = {
  pokemon: Pokemon[];
};

function PokemonGrid({ pokemon }: PokemonGridProps) {
  return (
    <div className="pokemon-grid">
      {pokemon.map((pokemon) => (
        <PokemonCard
          id={pokemon.id}
          name={pokemon.name}
          artwork={pokemon.image}
          types={pokemon.types}
        />
      ))}
    </div>
  );
}
export default PokemonGrid;
