import "../PokemonGrid/PokemonGrid.css";
import "./PokemonGridSkeleton.css";
import { useThemeStore } from "../../stores/useThemeStore";

type PokemonGridSkeletonProps = {
  pokemonFetchSize: number;
};

function PokemonGridSkeleton({ pokemonFetchSize }: PokemonGridSkeletonProps) {
  const theme = useThemeStore((store) => store.theme);

  return (
    <div className="pokemon-grid pokemon-grid--large-scale">
      {Array.from({ length: pokemonFetchSize }).map((_, index) => (
        <div key={index} className="pokemon-card-skeleton">
          <div
            data-testid="pokemon-card-skeleton-artwork"
            className={`pokemon-card-skeleton__artwork ${theme == "light" ? "" : "pokemon-card-skeleton__artwork--dark"}`}
          />
        </div>
      ))}
    </div>
  );
}

export default PokemonGridSkeleton;
