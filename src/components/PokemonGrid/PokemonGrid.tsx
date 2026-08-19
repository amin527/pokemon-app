import PokemonCard from "../PokemonCard/PokemonCard";
import "./PokemonGrid.css";
import type { Pokemon } from "../../types/pokemon";

type PokemonGridProps = {
  pokemon: Pokemon[];
};

function PokemonGrid({ pokemon }: PokemonGridProps) {
  const gridClassName =
    pokemon.length >= 3
      ? "pokemon-grid pokemon-grid--multiple"
      : "pokemon-grid pokemon-grid--limited";

  return (
    <div className={gridClassName}>
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
