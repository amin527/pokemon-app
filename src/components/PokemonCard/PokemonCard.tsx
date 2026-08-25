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
  let pokemonCardClassName = ""
  let pokemonCardInfoClassName = ""

  if (theme == "light"){
    pokemonCardClassName = "pokemon-card";
    pokemonCardInfoClassName = "pokemon-card__info"
  } 
  if (theme == "dark"){
    pokemonCardClassName = "pokemon-card dark"
    pokemonCardInfoClassName = "pokemon-card__info dark"
  } 
  
  return (
    <div className={pokemonCardClassName}>
      <img className="pokemon-card__artwork" src={artwork} alt={name} />
      <div className={pokemonCardInfoClassName}>
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
