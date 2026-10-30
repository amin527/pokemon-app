import { loadDetailedPokemon } from "./loadDetailedPokemon";
import { loadSimilarPokemon } from "./loadSimilarPokemon";
import { preloadImage } from "./preloadImage";

export async function loadDetailPage(id: number, signal?: AbortSignal) {
  const detailedPokemon = await loadDetailedPokemon(id, signal);
  const primaryType = detailedPokemon?.types[0];
  if (!primaryType) return { pokemon: detailedPokemon, similarPokemon: null };

  try {
    const similarPokemon = await loadSimilarPokemon({
      pokemon: detailedPokemon,
      type: primaryType,
    });
    await Promise.all(
      similarPokemon.map((pokemon) =>
        pokemon.image ? preloadImage(pokemon.image) : Promise.resolve(),
      ),
    );
    return { pokemon: detailedPokemon, similarPokemon };
  } catch {
    return { pokemon: detailedPokemon, similarPokemon: null };
  }
}
