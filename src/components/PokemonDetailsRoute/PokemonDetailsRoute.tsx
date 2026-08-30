import { useParams } from "react-router";
import PokemonDetails from "../PokemonDetails/PokemonDetails";

export function PokemonDetailsRoute() {
  const { id } = useParams();

  return <PokemonDetails key={id} />;
}
