import type { Pokemon } from "../types/Pokemon";
import { fetchPokemon } from "./fetchPokemon";
import { preloadImage } from "./preloadImage";

const MIN_LOADING_TIME = 600;

type loadPokemonProps = {
  pokemonFetchSize: number;
  currentPage: number;
  signal?: AbortSignal;
};

export async function loadPokemon({
  pokemonFetchSize,
  currentPage,
  signal,
}: loadPokemonProps): Promise<Pokemon[]> {
  const offset = (currentPage - 1) * pokemonFetchSize;

  const minimumDelay = new Promise((resolve) =>
    setTimeout(resolve, MIN_LOADING_TIME),
  );

  const loadedPokemonSet = async () => {
    const pokemonSet = await fetchPokemon({ pokemonFetchSize, offset, signal });

    await Promise.all(
      pokemonSet.map((pokemon) =>
        pokemon.image ? preloadImage(pokemon.image) : Promise.resolve(),
      ),
    );

    return pokemonSet;
  };

  const [pokemonSet] = await Promise.all([loadedPokemonSet(), minimumDelay]);
  return pokemonSet;
}
