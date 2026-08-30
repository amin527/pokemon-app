import { useContext } from "react";
import "./PokemonCard.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Link } from "react-router";
import type { Pokemon } from "../../types/Pokemon";
import { NavigationContext } from "../../contexts/NavigationContext";

function PokemonCard({ id, name, image, types }: Pokemon) {
  const { theme } = useContext(ThemeContext);
  const { stackNavigation, setStackNavigation, navigationIndex, setNavigationIndex } = useContext(NavigationContext)

  function handleClick(){
    setStackNavigation([...[...stackNavigation].slice(0, navigationIndex + 1), `/pokemon/${id}`])
    setNavigationIndex(navigationIndex  + 1)
  }

  return (
    <Link to={`/pokemon/${id}`} onClick={handleClick}>
      <div
        className={`pokemon-card ${theme == "light" ? "" : "pokemon-card--dark"}`}
        data-testid="pokemon-card"
      >
        <img className="pokemon-card__artwork" src={image} alt={name} />
        <div
          className={`pokemon-card__info ${theme == "light" ? "" : "pokemon-card__info--dark"}`}
          data-testid="pokemon-card-info"
        >
          <div className="pokemon-card__id">ID: {id}</div>
          <div className="pokemon-card__name">Name: {name}</div>
          <div className="pokemon-card__types">
            Types:{" "}
            {types.map((type, index) => (
              <span key={type}>{type}{index < types.length - 1 ? ", " : ""}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
export default PokemonCard;
