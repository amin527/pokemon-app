import {
  POKEMON_GRID_CARD_GAP,
  POKEMON_GRID_HORIZONTAL_MARGIN,
  POKEMON_GRID_STANDARD_CARD_WIDTH,
} from "../constants/PokemonGridConstants";

export function getPokemonGridClassName(
  cardCount: number,
  pokemonGridWidth: number,
) {
  const practicalPokemonGridWidth =
    pokemonGridWidth - 2 * POKEMON_GRID_HORIZONTAL_MARGIN;
  const pokemonCardResizingThreshold =
    3 * POKEMON_GRID_STANDARD_CARD_WIDTH + 2 * POKEMON_GRID_CARD_GAP;
  const gridCanFitThreeStandardCards =
    practicalPokemonGridWidth >= pokemonCardResizingThreshold;

  return cardCount < 3
    ? "pokemon-grid pokemon-grid--search-result"
    : gridCanFitThreeStandardCards
      ? "pokemon-grid pokemon-grid--large-scale"
      : "pokemon-grid pokemon-grid--small-scale";
}
