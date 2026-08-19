import "../PokemonGrid/PokemonGrid.css";
import "./PokemonGridSkeleton.css";

function PokemonGridSkeleton() {
  return (
    <div className="pokemon-grid pokemon-grid--multiple">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="pokemon-card-skeleton">
          <div className="pokemon-card-skeleton__artwork" />
        </div>
      ))}
    </div>
  );
}

export default PokemonGridSkeleton;
