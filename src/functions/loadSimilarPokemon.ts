import type { DetailedPokemon } from "../types/DetailedPokemon";
import type { Pokemon } from "../types/Pokemon";
import { getPokemonByType } from "./API/getPokemonByType";
import { formatPokemon } from "./formatPokemon";

type loadSimilarPokemonProps = {
  type: string;
  pokemon: DetailedPokemon;
  setSimilarPokemon: (value: Pokemon[]) => void;
};

export async function loadSimilarPokemon({
  pokemon,
  type,
  setSimilarPokemon,
}: loadSimilarPokemonProps) {
  const fetchedPokemonList = await getPokemonByType(type);

  if (!fetchedPokemonList || !pokemon) return;

  const firstThreePokemon = fetchedPokemonList
    .filter((fetchedPokemon) => fetchedPokemon.name !== pokemon.name)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const formattedPokemonList = firstThreePokemon.map((pokemon) =>
    formatPokemon(pokemon),
  );

  setSimilarPokemon(formattedPokemonList);
}
