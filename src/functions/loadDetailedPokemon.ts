import { STAT_DISPLAY_NAMES } from "../constants/StatDisplayNames";
import type { DetailedPokemon } from "../types/DetailedPokemon";
import { getPokemon } from "./API/getPokemon";

export async function loadDetailedPokemon(
  id: number,
  signal?: AbortSignal,
): Promise<DetailedPokemon> {
  const fetchedPokemonData = await getPokemon(id, signal);
  return {
    id: Number(id),
    name: fetchedPokemonData.name,
    weight: fetchedPokemonData.weight,
    height: fetchedPokemonData.height,
    image: fetchedPokemonData.sprites.other["official-artwork"].front_default,
    types: fetchedPokemonData.types.map((type) => type.type.name),
    stats: fetchedPokemonData.stats.map((stat) => ({
      name: STAT_DISPLAY_NAMES[
        stat.stat.name as keyof typeof STAT_DISPLAY_NAMES
      ],
      baseValue: stat.base_stat,
    })),
    abilities: fetchedPokemonData.abilities.map(
      (ability) => ability.ability.name,
    ),
  };
}
