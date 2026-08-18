import "./PokemonCard.css";

type PokemonCardProps = {
  id: number;
  name: string;
  artwork: string;
  types: string[];
};

function PokemonCard({ id, name, artwork, types }: PokemonCardProps) {
  return (
    <div className="pokemon-card">
      <img className="pokemon-card__artwork" src={artwork} alt={name} />
      <div className="pokemon-card__info">
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
