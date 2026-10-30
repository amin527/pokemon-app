import PokemonCard from "../PokemonCard/PokemonCard";

import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { useElementHeight } from "../../hooks/useElementHeight";
import { ThemeContext } from "../../contexts/ThemeContext";

import type { Pokemon } from "../../types/Pokemon";
import type { DetailedPokemon } from "../../types/DetailedPokemon";

import "./PokemonDetails.css";
import "./PokemonDetailsLoading.css";
import { loadDetailPage } from "../../functions/loadDetailPage";
import { HttpError } from "../../functions/API/HttpError";
import NotFound from "../NotFound/NotFound";

type PageResult =
  | {
      id: number;
      status: "success";
      pokemon: DetailedPokemon;
      similarPokemon: Pokemon[] | null;
    }
  | { id: number; status: "not-found" | "error" };

function PokemonDetails() {
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const { ref: detailsRef, height: detailsHeight } =
    useElementHeight<HTMLDivElement>();

  const numericId = Number(id);
  const isValidId = !!id && Number.isInteger(numericId) && numericId > 0;

  const [pageResult, setPageResult] = useState<PageResult | null>(null);

  useEffect(() => {
    if (!isValidId) return;

    const controller = new AbortController();

    async function run() {
      try {
        const { pokemon, similarPokemon } = await loadDetailPage(
          numericId,
          controller.signal,
        );
        setPageResult({
          id: numericId,
          status: "success",
          pokemon,
          similarPokemon,
        });
      } catch (error) {
        if (controller.signal.aborted) return;
        setPageResult({
          id: numericId,
          status:
            error instanceof HttpError && error.status === 404
              ? "not-found"
              : "error",
        });
      }
    }

    run();
    return () => controller.abort();
  }, [numericId, isValidId]);

  const current = isValidId && pageResult?.id === numericId ? pageResult : null;

  if (!isValidId || current?.status === "not-found") return <NotFound />;

  return (
    <div
      data-testid="pokemon-details-component"
      className={`pokemon-details-component ${theme == "light" ? "" : "pokemon-details-component--dark"}`}
    >
      {!current ? (
        <div
          data-testid="pokemon-details-component-content"
          className={`pokemon-details-component__content--loading ${theme == "light" ? "" : "pokemon-details-component__content--dark"}`}
        >
          <div className="pokemon-details--loading">
            <div className="pokemon-details__image--loading"></div>
            <div className="pokemon-details__info--loading">
              <div className="pokemon-details__basic-info--loading"></div>
              <div className="pokemon-details__stats--loading"></div>
              <div className="pokemon-details__abilities--loading"></div>
            </div>
          </div>
          <div className="similar-pokemon--loading">
            <div className="pokemon-card--loading"></div>
            <div className="pokemon-card--loading"></div>
            <div className="pokemon-card--loading"></div>
          </div>
        </div>
      ) : current.status !== "success" ? (
        <div className="pokemon-details-error" role="alert">
          <div className="pokemon-details-error__title">
            Something went wrong
          </div>
          <p className="pokemon-details-error__message">
            We couldn't load this Pokémon. Please check your connection and try
            again.
          </p>
        </div>
      ) : (
        <div className="pokemon-details-component__content">
          <div className="pokemon-details" ref={detailsRef}>
            <div
              data-testid="pokemon-details-image"
              className={`pokemon-details__image ${theme == "light" ? "" : "pokemon-details__image--dark"}`}
            >
              <img src={current.pokemon.image} />
            </div>
            <div className="pokemon-details__info">
              <div className="pokemon-details__basic-info">
                <div className="pokemon-details__title">Base Info</div>
                <div className="pokemon-details__id">
                  ID: {current.pokemon.id}
                </div>
                <div className="pokemon-details__name">
                  Name: {current.pokemon.name}
                </div>
                <div className="pokemon-details__height">
                  Height: {current.pokemon.height}
                </div>
                <div className="pokemon-details__weight">
                  Weight: {current.pokemon.weight}
                </div>
                <div className="pokemon-details__types">
                  Types:{" "}
                  {current.pokemon.types.map((type, index) => (
                    <span key={index}>
                      {type}
                      {index < current.pokemon.types.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pokemon-details__stats">
                <div className="pokemon-details__title">Stats</div>
                {current.pokemon.stats.map((stat) => (
                  <div key={stat.name}>
                    {" "}
                    {stat.name}: {stat.baseValue}
                  </div>
                ))}
              </div>
              <div className="pokemon-details__abilities">
                <div className="pokemon-details__title">Abilities</div>
                {current.pokemon.abilities.map((ability, index) => (
                  <div key={index}>{ability}</div>
                ))}
              </div>
            </div>
          </div>
          {/* <div className="similar-pokemon"> */}
          <div
            className="similar-pokemon"
            style={detailsHeight ? { height: detailsHeight } : undefined}
          >
            {current.similarPokemon === null ? (
              <p className="similar-pokemon__error">
                Couldn't load similar Pokémon
              </p>
            ) : (
              current.similarPokemon.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.image}
                  types={pokemon.types}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default PokemonDetails;
