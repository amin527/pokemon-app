import type { DetailedPokemon } from "../types/DetailedPokemon";
import { getPokemonByType } from "./API/getPokemonByType";
import { formatPokemon } from "./formatPokemon";

type loadSimilarPokemonProps = {
  type: string;
  pokemon: DetailedPokemon;
};

export async function loadSimilarPokemon({
  pokemon,
  type,
}: loadSimilarPokemonProps) {
  const fetchedPokemonList = await getPokemonByType(type);

  if (!fetchedPokemonList || !pokemon) return [];

  const firstThreePokemon = fetchedPokemonList
    .filter((fetchedPokemon) => fetchedPokemon.name !== pokemon.name)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const formattedPokemonList = firstThreePokemon.map((pokemon) =>
    formatPokemon(pokemon),
  );

  return formattedPokemonList;
}
