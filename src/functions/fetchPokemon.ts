import type { Pokemon } from "../types/Pokemon";
import { getPokemon } from "./API/getPokemon";
import { getPokemonList } from "./API/getPokemonList";
import { formatPokemon } from "./formatPokemon";

type fetchPokemonProps = {
  pokemonFetchSize: number;
  offset: number;
  signal?: AbortSignal;
};

export async function fetchPokemon({
  pokemonFetchSize,
  offset,
  signal,
}: fetchPokemonProps): Promise<Pokemon[]> {
  const pokemonListBasic = await getPokemonList(
    pokemonFetchSize,
    offset,
    signal,
  );

  const pokemonListDetailed = await Promise.all(
    pokemonListBasic.results.map((pokemonBasic) =>
      getPokemon(pokemonBasic.name, signal),
    ),
  );

  const pokemonListFormatted = pokemonListDetailed.map((pokemonDetailed) =>
    formatPokemon(pokemonDetailed),
  );

  return pokemonListFormatted;
}
