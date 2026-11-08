import PokemonCard from "../PokemonCard/PokemonCard";
import "./PokemonGrid.css";
import type { Pokemon } from "../../types/Pokemon";
import { getPokemonGridClassName } from "../../functions/getPokemonGridClassName";

type PokemonGridProps = {
  pokemon: Pokemon[];
  pokemonGridWidth: number;
};

function PokemonGrid({ pokemon, pokemonGridWidth }: PokemonGridProps) {
  return (
    <div className={getPokemonGridClassName(pokemon.length, pokemonGridWidth)}>
      {pokemon.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.image}
          types={pokemon.types}
        />
      ))}
    </div>
  );
}
export default PokemonGrid;
