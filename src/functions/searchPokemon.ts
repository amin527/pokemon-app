import type { Pokemon } from "../types/Pokemon";
import { getPokemon } from "./API/getPokemon";

type searchPokemonProps = {
  query: string;
  setSearchResult: (pokemon: Pokemon | null) => void;
  setSearchError: (value: null | string) => void;
};

export async function searchPokemon({
  query,
  setSearchResult,
  setSearchError,
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
    setSearchError(null);
  } catch {
    setSearchResult(null);
    setSearchError("No Pokémon found");
  }
}
