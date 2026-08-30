export async function getPokemonCount() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=0&offset=0",
  );

  const data = await response.json();

  return data.count;
}
