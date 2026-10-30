import type { getPokemonResponse } from "../../types/getPokemonResponse";
import { HttpError } from "./HttpError";

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemon(
  nameOrId: string | number,
  signal?: AbortSignal,
): Promise<getPokemonResponse> {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${nameOrId}`, {
    signal,
  });

  if (!response.ok) {
    throw new HttpError(response.status, "Failed to fetch Pokémon");
  }

  const data = await response.json();

  return data;
}
