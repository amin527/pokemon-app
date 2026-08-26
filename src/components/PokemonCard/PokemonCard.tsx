import { useContext } from "react";
import { ThemeContext } from "../../App";
import "./PokemonCard.css";

type PokemonCardProps = {
  id: number;
  name: string;
  artwork: string;
  types: string[];
};

function PokemonCard({ id, name, artwork, types }: PokemonCardProps) {

  const { theme } = useContext(ThemeContext)
  
  return (
    <div className={`pokemon-card ${theme == "light" ? "" : "pokemon-card--dark"}`} data-testid="pokemon-card">
      <img className="pokemon-card__artwork" src={artwork} alt={name} />
      <div className={`pokemon-card__info ${theme == "light" ? "" : "pokemon-card__info--dark"}`} data-testid="pokemon-card-info">
        <div className="pokemon-card__id">ID: {id}</div>
        <div className="pokemon-card__name">Name: {name}</div>
        <div className="pokemon-card__types">
          Types:{" "}
          {types.map((type) => (
            <span key={type}>{type}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
export default PokemonCard;
