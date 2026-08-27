import type { getPokemonResponse } from "../types/getPokemonResponse";
import type { Pokemon } from "../types/Pokemon";

export function formatPokemon(pokemon: getPokemonResponse): Pokemon {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other["official-artwork"].front_default,
    types: pokemon.types.map((type) => type.type.name),
  };
}
