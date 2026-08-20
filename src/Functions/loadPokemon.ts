import type { Pokemon } from "../types/pokemon";
import { fetchPokemonSet } from "./fetchPokemonSet";
import { preloadImage } from "./preloadImage";

const MIN_LOADING_TIME = 600;
const PAGE_SIZE = 20;

type loadPokemonProps = {
  currentPage: number;
  setError: (value: string) => void;
  setPokemon: (value: Pokemon[]) => void;
  setIsLoading: (value: boolean) => void;
};

export async function loadPokemon({
  currentPage,
  setError,
  setPokemon,
  setIsLoading,
}: loadPokemonProps) {
  const offset = (currentPage - 1) * PAGE_SIZE;

  try {
    const minimumDelay = new Promise((resolve) =>
      setTimeout(resolve, MIN_LOADING_TIME),
    );

    const loadedPokemonSet = async () => {
      const pokemonSet = await fetchPokemonSet(offset);

      await Promise.all(
        pokemonSet.map((pokemon) =>
          pokemon.image ? preloadImage(pokemon.image) : Promise.resolve(),
        ),
      );

      return pokemonSet;
    };

    const [pokemonSet] = await Promise.all([loadedPokemonSet(), minimumDelay]);

    setPokemon(pokemonSet);
  } catch {
    setError("Failed to load Pokémon");
  } finally {
    setIsLoading(false);
  }
}
