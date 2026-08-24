import type { Pokemon } from "../types/pokemon";
import { getPokemon } from "./API/getPokemon";
import { getPokemonList } from "./API/getPokemonList";
import { formatPokemon } from "./formatPokemon";

type fetchPokemonProps = {
  pokemonFetchSize: number;
  offset: number;
};

export async function fetchPokemon({
  pokemonFetchSize,
  offset,
}: fetchPokemonProps): Promise<Pokemon[]> {
  const pokemonListBasic = await getPokemonList(pokemonFetchSize, offset);

  const pokemonListDetailed = await Promise.all(
    pokemonListBasic.results.map((pokemonBasic) =>
      getPokemon(pokemonBasic.name),
    ),
  );

  const pokemonListFormatted = pokemonListDetailed.map((pokemonDetailed) =>
    formatPokemon(pokemonDetailed),
  );

  return pokemonListFormatted;
}
