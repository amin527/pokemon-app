import PokemonCard from "../PokemonCard/PokemonCard";

import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useElementHeight } from "../../hooks/useElementHeight";
import { useThemeStore } from "../../stores/useThemeStore";

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

const MAX_BASE_STAT = 255;

function formatName(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function PokemonDetails() {
  const { id } = useParams();
  const theme = useThemeStore((store) => store.theme);
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
          className={`pokemon-details-component__content pokemon-details-component__content--loading ${theme == "light" ? "" : "pokemon-details-component__content--dark"}`}
          aria-busy="true"
          aria-label="Loading Pokémon"
        >
          <div className="pokemon-details">
            <div className="pokemon-details__header">
              <div className="skeleton skeleton--title"></div>
            </div>
            <div className="pokemon-details__image">
              <div className="skeleton skeleton--image"></div>
            </div>
            <div className="pokemon-details__info">
              <div className="pokemon-details__basic-info skeleton skeleton--about"></div>
              <div className="pokemon-details__stats skeleton skeleton--stats"></div>
              <div className="pokemon-details__abilities skeleton skeleton--abilities"></div>
            </div>
          </div>
          <div className="similar-pokemon">
            <div className="similar-pokemon__title">
              <div className="skeleton skeleton--subtitle"></div>
            </div>
            <div className="skeleton skeleton--card"></div>
            <div className="skeleton skeleton--card"></div>
            <div className="skeleton skeleton--card"></div>
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
            <div className="pokemon-details__header">
              <h1 className="pokemon-details__name">
                {formatName(current.pokemon.name)}
              </h1>
              <span className="pokemon-details__id">
                #{String(current.pokemon.id).padStart(3, "0")}
              </span>
            </div>
            <div
              data-testid="pokemon-details-image"
              className={`pokemon-details__image ${theme == "light" ? "" : "pokemon-details__image--dark"}`}
            >
              <img
                src={current.pokemon.image}
                alt={formatName(current.pokemon.name)}
              />
            </div>
            <div className="pokemon-details__info">
              <section className="pokemon-details__basic-info">
                <h2 className="pokemon-details__title">About</h2>
                <dl className="pokemon-details__facts">
                  <div>
                    <dt>Height</dt>
                    <dd>{current.pokemon.height / 10} m</dd>
                  </div>
                  <div>
                    <dt>Weight</dt>
                    <dd>{current.pokemon.weight / 10} kg</dd>
                  </div>
                </dl>
                <div className="pokemon-details__types">
                  {current.pokemon.types.map((type) => (
                    <span key={type} className="pokemon-details__type">
                      {formatName(type)}
                    </span>
                  ))}
                </div>
              </section>
              <section className="pokemon-details__stats">
                <h2 className="pokemon-details__title">Base stats</h2>
                {current.pokemon.stats.map((stat) => (
                  <div
                    key={stat.name}
                    className="pokemon-details__stat"
                    data-testid="pokemon-details-stat"
                  >
                    <div className="pokemon-details__stat-label">
                      <span>{stat.name}</span>
                      <span className="pokemon-details__stat-value">
                        {stat.baseValue}
                      </span>
                    </div>
                    <div
                      className="pokemon-details__stat-bar"
                      aria-hidden="true"
                    >
                      <div
                        className="pokemon-details__stat-fill"
                        style={{
                          width: `${Math.min(stat.baseValue / MAX_BASE_STAT, 1) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </section>
              <section className="pokemon-details__abilities">
                <h2 className="pokemon-details__title">Abilities</h2>
                <ul className="pokemon-details__ability-list">
                  {current.pokemon.abilities.map((ability) => (
                    <li key={ability}>{formatName(ability)}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
          <section
            className="similar-pokemon"
            aria-labelledby="similar-pokemon-title"
            style={detailsHeight ? { height: detailsHeight } : undefined}
          >
            <h2 id="similar-pokemon-title" className="similar-pokemon__title">
              Similar Pokémon
            </h2>
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
          </section>
        </div>
      )}
    </div>
  );
}
export default PokemonDetails;
