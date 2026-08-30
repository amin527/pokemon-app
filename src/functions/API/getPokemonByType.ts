import { getPokemon } from "./getPokemon";

type getPokemonByTypeResponse = {
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};

export async function getPokemonByType(type: string | undefined) {
  if (!type) return;
  const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  if (!response.ok) throw new Error("Failed to fetch Pokémon");
  const data: getPokemonByTypeResponse = await response.json();
  const fetchedPokemon = await Promise.all(
    data.pokemon.map((entry) => getPokemon(entry.pokemon.name)),
  );
  return fetchedPokemon;
}
