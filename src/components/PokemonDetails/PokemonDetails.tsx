import TopNavbar from "../TopNavbar/TopNavbar";
import PokemonCard from "../PokemonCard/PokemonCard";
import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { loadDetailedPokemon } from "../../functions/loadDetailedPokemon";
import { loadSimilarPokemon } from "../../functions/loadSimilarPokemon";
import { preloadImage } from "../../functions/preloadImage";
import type { DetailedPokemon } from "../../types/DetailedPokemon";
import type { Pokemon } from "../../types/Pokemon";
import "./PokemonDetails.css";
import { ThemeContext } from "../../contexts/ThemeContext";

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<DetailedPokemon | null>(null);
  const [similarPokemon, setSimilarPokemon] = useState<Pokemon[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const primaryType = pokemon?.types[0];
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setPokemon(null);
    setSimilarPokemon(null);
    setIsLoading(true);
  }, [id]);

  useEffect(() => {
    loadDetailedPokemon({ setPokemon, id });
  }, [id]);

  useEffect(() => {
    if (!primaryType) return;
    loadSimilarPokemon({ setSimilarPokemon, pokemon, type: primaryType });
  }, [primaryType]);

  useEffect(() => {
    async function resolveLoading() {
      if (similarPokemon && pokemon) {
        await Promise.all(
          similarPokemon.map((pokemon) =>
            pokemon.image ? preloadImage(pokemon.image) : Promise.resolve(),
          ),
        );
        setIsLoading(false);
      }
    }
    resolveLoading();
  }, [similarPokemon, pokemon]);

  return (
    <div
      data-testid="pokemon-details-component"
      className={`pokemon-details-component ${theme == "light" ? "" : "pokemon-details-component--dark"}`}
    >
      <TopNavbar />
      {!isLoading ? (
        <>
          {pokemon && (
            <div className="pokemon-details-component__content">
              <div className="pokemon-details">
                <div
                  data-testid="pokemon-details-image"
                  className={`pokemon-details__image ${theme == "light" ? "" : "pokemon-details__image--dark"}`}
                >
                  <img src={pokemon.image} />
                </div>
                <div className="pokemon-details__info">
                  <div className="pokemon-details__basic-info">
                    <div className="pokemon-details__title">Base Info</div>
                    <div className="pokemon-details__id">ID: {pokemon.id}</div>
                    <div className="pokemon-details__name">
                      Name: {pokemon.name}
                    </div>
                    <div className="pokemon-details__height">
                      Height: {pokemon.height}
                    </div>
                    <div className="pokemon-details__weight">
                      Weight: {pokemon.weight}
                    </div>
                    <div className="pokemon-details__types">
                      Types:{" "}
                      {pokemon.types.map((type, index) => (
                        <span key={index}>
                          {type}
                          {index < pokemon.types.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pokemon-details__stats">
                    <div className="pokemon-details__title">Stats</div>
                    {pokemon.stats.map((stat) => (
                      <div key={stat.name}>
                        {" "}
                        {stat.name}: {stat.baseValue}
                      </div>
                    ))}
                  </div>
                  <div className="pokemon-details__abilities">
                    <div className="pokemon-details__title">Abilities</div>
                    {pokemon.abilities.map((ability, index) => (
                      <div key={index}>{ability}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="similar-pokemon">
                {similarPokemon?.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.id}
                    id={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.image}
                    types={pokemon.types}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div
          data-testid="pokemon-details-component-content"
          className={`pokemon-details-component__content ${theme == "light" ? "" : "pokemon-details-component__content--dark"}`}
        >
          <div className="pokemon-details--loading">
            <div className="pokemon-details__image--loading"></div>
            <div className="pokemon-details__info">
              <div className="pokemon-details__basic-info--loading"></div>
              <div className="pokemon-details__stats--loading"></div>
              <div className="pokemon-details__abilities--loading"></div>
            </div>
          </div>
          <div className="similar-pokemon">
            <div className="pokemon-card--loading"></div>
            <div className="pokemon-card--loading"></div>
            <div className="pokemon-card--loading"></div>
          </div>
        </div>
      )}
    </div>
  );
}
export default PokemonDetails;
