import { useContext } from "react";
import "./PokemonCard.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Link } from "react-router";
import type { Pokemon } from "../../types/Pokemon";
import { NavigationContext } from "../../contexts/NavigationContext";

function PokemonCard({ id, name, image, types }: Pokemon) {
  const { theme } = useContext(ThemeContext);
  const {
    navigationHistory,
    setNavigationHistory,
    navigationIndex,
    setNavigationIndex,
  } = useContext(NavigationContext);

  function handleClick() {
    setNavigationHistory([
      ...[...navigationHistory].slice(0, navigationIndex + 1),
      `/pokemon/${id}`,
    ]);
    setNavigationIndex(navigationIndex + 1);
  }

  return (
    <Link
      to={`/pokemon/${id}`}
      onClick={handleClick}
      className="pokemon-card-link"
    >
      <div
        className={`pokemon-card ${theme == "light" ? "" : "pokemon-card--dark"}`}
        data-testid="pokemon-card"
      >
        <img className="pokemon-card__artwork" src={image} alt={name} />
        <div
          data-testid="pokemon-card-display"
          className="pokemon-card-display"
        >
          <div className="pokemon-card-display__name">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </div>
          <div className="pokemon-card-display__id">#{id}</div>
        </div>
        <div className="pokemon-card__info" data-testid="pokemon-card-info">
          <div className="pokemon-card__name-and-id">
            <div className="pokemon-card-info__name">
              <strong>Name: </strong>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </div>
            <div className="pokemon-card-info__id">ID: {id}</div>
          </div>
          <div className="pokemon-card-info__types">
            <strong>Types:</strong>{" "}
            {types.map((type, index) => (
              <span key={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
                {index < types.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
export default PokemonCard;
