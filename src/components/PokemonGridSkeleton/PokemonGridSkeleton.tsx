import { useContext } from "react";
import "../PokemonGrid/PokemonGrid.css";
import "./PokemonGridSkeleton.css";
import { ThemeContext } from "../../App";

type PokemonGridSkeletonProps = {
  pokemonFetchSize: number;
};

function PokemonGridSkeleton({ pokemonFetchSize }: PokemonGridSkeletonProps) {
  const { theme } = useContext(ThemeContext);
  const pokemonCardSkeletonClassName = theme == "light" ? "pokemon-card-skeleton__artwork" : "pokemon-card-skeleton__artwork dark"

  return (
    <div className="pokemon-grid pokemon-grid--large-scale">
      {Array.from({ length: pokemonFetchSize }).map((_, index) => (
        <div key={index} className="pokemon-card-skeleton">
          <div className={pokemonCardSkeletonClassName} />
        </div>
      ))}
    </div>
  );
}

export default PokemonGridSkeleton;
