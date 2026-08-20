const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

type pokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
};

type PokemonListItem = {
  name: string;
  url: string;
};

export async function getPokemonList(
  limit: number,
  offset: number,
): Promise<pokemonListResponse> {
  const response = await fetch(
    `${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon list");
  }

  const data = await response.json();
  return data;
}
