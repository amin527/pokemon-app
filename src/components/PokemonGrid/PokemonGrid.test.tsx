import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PokemonGrid from "./PokemonGrid";
import { MemoryRouter } from "react-router";

describe("PokemonGrid", () => {
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

    expect(screen.getByText("Name: bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("Name: charmander")).toBeInTheDocument();
  });
});
