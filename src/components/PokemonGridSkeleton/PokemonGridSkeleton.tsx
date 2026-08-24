import "../PokemonGrid/PokemonGrid.css";
import "./PokemonGridSkeleton.css";

type PokemonGridSkeletonProps = {
  pokemonFetchSize: number;
};

function PokemonGridSkeleton({ pokemonFetchSize }: PokemonGridSkeletonProps) {
  return (
    <div className="pokemon-grid pokemon-grid--large-scale">
      {Array.from({ length: pokemonFetchSize }).map((_, index) => (
        <div key={index} className="pokemon-card-skeleton">
          <div className="pokemon-card-skeleton__artwork" />
        </div>
      ))}
    </div>
  );
}

export default PokemonGridSkeleton;
