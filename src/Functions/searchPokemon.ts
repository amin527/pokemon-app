import type { Pokemon } from "../types/pokemon";
import { getPokemon } from "./API/getPokemon";

type searchPokemonProps = {
  query: string;
  setSearchResult: (pokemon: Pokemon | null) => void;
  setError: (value: null | string) => void;
};

export async function searchPokemon({
  query,
  setSearchResult,
  setError,
}: searchPokemonProps) {
  try {
    const pokemon = await getPokemon(query);
    const pokemonFormatted = {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.other["official-artwork"].front_default,
      types: pokemon.types.map((type) => type.type.name),
    };
    setSearchResult(pokemonFormatted);
    setError(null);
  } catch {
    setSearchResult(null);
    setError("No Pokémon found");
  }
}
