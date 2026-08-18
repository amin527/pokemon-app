const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

type PokemonApiResponse = {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
};

type PokemonListItem = {
  name: string;
  url: string;
}

type pokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export async function getPokemon(nameOrId: string | number): Promise<PokemonApiResponse> {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${nameOrId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon");
  }

  const data = await response.json();

  return data;
}

export async function getPokemonList(limit: number, offset: number) : Promise<pokemonListResponse>{
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit${limit}&offset=${offset}`)

  if (!response.ok){
    throw new Error("Failed to fetch Pokémon list");
  }

  const data = await response.json();

  return data;
}