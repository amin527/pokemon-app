import PokemonCard from "../PokemonCard/PokemonCard";
import "./PokemonGrid.css";
import type { Pokemon } from "../../types/Pokemon";
import {
  POKEMON_GRID_CARD_GAP,
  POKEMON_GRID_HORIZONTAL_MARGIN,
  POKEMON_GRID_STANDARD_CARD_WIDTH,
} from "../../constants/PokemonGridConstants";

type PokemonGridProps = {
  pokemon: Pokemon[];
  pokemonGridWidth: number;
};

function PokemonGrid({ pokemon, pokemonGridWidth }: PokemonGridProps) {
  const practicalPokemonGridWidth =
    pokemonGridWidth - 2 * POKEMON_GRID_HORIZONTAL_MARGIN;
  const pokemonCardResizingThreshold =
    3 * POKEMON_GRID_STANDARD_CARD_WIDTH + 2 * POKEMON_GRID_CARD_GAP;
  const gridCanFitThreeStandardCards =
    practicalPokemonGridWidth >= pokemonCardResizingThreshold;

  const gridClassName =
    pokemon.length < 3
      ? "pokemon-grid pokemon-grid--search-result"
      : gridCanFitThreeStandardCards
        ? "pokemon-grid pokemon-grid--large-scale"
        : "pokemon-grid pokemon-grid--small-scale";

  return (
    <div className={gridClassName}>
      {pokemon.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
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
