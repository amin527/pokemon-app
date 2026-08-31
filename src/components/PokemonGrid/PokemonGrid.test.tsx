import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import PokemonGrid from "./PokemonGrid";
import { MemoryRouter } from "react-router";

describe("PokemonGrid", () => {

  afterEach(() => { cleanup() })

  const pokemon = [
    {
      id: 1,
      name: "bulbasaur",
      image: "bulbasaur.png",
      types: ["grass", "poison"],
    },
    {
      id: 4,
      name: "charmander",
      image: "charmander.png",
      types: ["fire"],
    },
  ];

  it("renders all Pokémon provided to the grid", () => {
    render(
      <MemoryRouter>
        <PokemonGrid pokemonGridWidth={1000} pokemon={pokemon} />
      </MemoryRouter>,
    );

    const pokemonDisplays = screen.getAllByTestId("pokemon-card-display");

    expect(pokemonDisplays).toHaveLength(pokemon.length);
    expect(pokemonDisplays[0]).toHaveTextContent("Bulbasaur");
    expect(pokemonDisplays[1]).toHaveTextContent("Charmander");
  });
});
