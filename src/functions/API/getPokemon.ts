import type { getPokemonResponse } from "../../types/getPokemonResponse";

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemon(
  nameOrId: string | number,
): Promise<getPokemonResponse> {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${nameOrId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon");
  }

  const data = await response.json();

  return data;
}
