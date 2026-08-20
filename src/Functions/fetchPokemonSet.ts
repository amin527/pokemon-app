import type { Pokemon } from "../types/pokemon";
import { getPokemon } from "./API/getPokemon";
import { getPokemonList } from "./API/getPokemonList";
import { formatPokemon } from "./formatPokemon";

const PAGE_SIZE = 20;

export async function fetchPokemonSet(offset: number): Promise<Pokemon[]> {
  const pokemonListBasic = await getPokemonList(PAGE_SIZE, offset);

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
