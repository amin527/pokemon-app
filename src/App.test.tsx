import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";
import { getPokemon, getPokemonList } from "./api/pokemonApi";


vi.mock("./api/pokemonApi", () => ({
  getPokemonList: vi.fn(),
  getPokemon: vi.fn(),
}));

describe("App", () => {
  it("loads and displays Pokémon", async () => {
    vi.mocked(getPokemonList).mockResolvedValue({
      count: 2,
      next: null,
      previous: null,
      results: [
        {
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        },
        {
          name: "charmander",
          url: "https://pokeapi.co/api/v2/pokemon/4/",
        },
      ],
    });

    vi.mocked(getPokemon)
      .mockResolvedValueOnce({
        id: 1,
        name: "bulbasaur",
        sprites: {
          other: {
            "official-artwork": {
              front_default: "bulbasaur.png",
            },
          },
        },
        types: [{ type: { name: "grass" } }],
      })
      .mockResolvedValueOnce({
        id: 4,
        name: "charmander",
        sprites: {
          other: {
            "official-artwork": {
              front_default: "charmander.png",
            },
          },
        },
        types: [{ type: { name: "fire" } }],
      });

    render(<App />);

    expect(await screen.findByText("Name: bulbasaur")).toBeInTheDocument();
    expect(await screen.findByText("Name: charmander")).toBeInTheDocument();
  });
});