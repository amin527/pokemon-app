import {
  POKEMON_GRID_CARD_GAP,
  POKEMON_GRID_STANDARD_CARD_WIDTH,
  POKEMON_GRID_SMALL_CARD_WIDTH,
} from "../constants/PokemonGridConstants";

export function calculatePokemonFetchSize(practicalPokemonGridWidth: number) {
  // console.log("calculatePokemonFetchSize runs")
  const gridCanFitThreeStandardCards =
    practicalPokemonGridWidth >=
    3 * POKEMON_GRID_STANDARD_CARD_WIDTH + 2 * POKEMON_GRID_CARD_GAP;
  const pokemonCardWidth = gridCanFitThreeStandardCards
    ? POKEMON_GRID_STANDARD_CARD_WIDTH
    : POKEMON_GRID_SMALL_CARD_WIDTH;
  const cardsPerRow = Math.floor(
    (practicalPokemonGridWidth + POKEMON_GRID_CARD_GAP) /
      (pokemonCardWidth + POKEMON_GRID_CARD_GAP),
  );
  return cardsPerRow * 3;
}
