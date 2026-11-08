import "../PokemonGrid/PokemonGrid.css";
import "./PokemonGridSkeleton.css";
import { useThemeStore } from "../../stores/useThemeStore";
import { getPokemonGridClassName } from "../../functions/getPokemonGridClassName";

type PokemonGridSkeletonProps = {
  pokemonFetchSize: number;
  pokemonGridWidth: number;
};

function PokemonGridSkeleton({
  pokemonFetchSize,
  pokemonGridWidth,
}: PokemonGridSkeletonProps) {
  const theme = useThemeStore((store) => store.theme);
  const isDark = theme != "light";

  return (
    <div
      className={getPokemonGridClassName(pokemonFetchSize, pokemonGridWidth)}
      aria-busy="true"
      aria-label="Loading Pokémon"
    >
      {Array.from({ length: pokemonFetchSize }).map((_, index) => (
        <div
          key={index}
          className={`pokemon-card-skeleton ${isDark ? "pokemon-card-skeleton--dark" : ""}`}
        >
          <div
            data-testid="pokemon-card-skeleton-artwork"
            className={`pokemon-card-skeleton__artwork ${isDark ? "pokemon-card-skeleton__artwork--dark" : ""}`}
          />
          <div className="pokemon-card-skeleton__footer">
            <div className="pokemon-card-skeleton__line pokemon-card-skeleton__line--name" />
            <div className="pokemon-card-skeleton__types">
              <div className="pokemon-card-skeleton__line pokemon-card-skeleton__line--type" />
              <div className="pokemon-card-skeleton__line pokemon-card-skeleton__line--type" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PokemonGridSkeleton;
