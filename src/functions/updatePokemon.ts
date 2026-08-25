import type { Pokemon } from "../types/pokemon";
import { fetchPokemon } from "./fetchPokemon";
import { preloadImage } from "./preloadImage";

const MIN_LOADING_TIME = 300;

type loadPokemonProps = {
  pokemon: Pokemon[];
  pokemonFetchSize: number;
  currentPage: number;
  setError: (value: string) => void;
  setPokemon: (value: Pokemon[]) => void;
  setIsLoading: (value: boolean) => void;
};

export async function updatePokemon({
  pokemon,
  pokemonFetchSize,
  currentPage,
  setError,
  setPokemon,
  setIsLoading,
}: loadPokemonProps) {
  const previousPokemonFetchSize = pokemon.length;
  
  if (pokemonFetchSize > previousPokemonFetchSize) {
    try {
      const minimumDelay = new Promise((resolve) => setTimeout(resolve, MIN_LOADING_TIME));

      const updatedOffset = currentPage * previousPokemonFetchSize;
      const updatedPokemonFetchSize = currentPage * (pokemonFetchSize - previousPokemonFetchSize)

      const loadMissingPokemon = async () => {
        const missingPokemonSet = await fetchPokemon({ pokemonFetchSize: updatedPokemonFetchSize, offset: updatedOffset });

        await Promise.all(
          missingPokemonSet.map((pokemon) =>
            pokemon.image ? preloadImage(pokemon.image) : Promise.resolve(),
          ),
        );

        return missingPokemonSet;
      };

      const [missingPokemonSet] = await Promise.all([loadMissingPokemon(), minimumDelay]);

      setPokemon([...pokemon.slice((currentPage - 1) * (pokemonFetchSize - previousPokemonFetchSize) + 1, -1), ...missingPokemonSet]);
    } catch {
      setError("Failed to load Pokémon");
    } finally {
      setIsLoading(false);
    }
  }
  if (pokemonFetchSize < pokemon.length) {
    setPokemon(pokemon.slice(0, pokemonFetchSize));
  }
}
