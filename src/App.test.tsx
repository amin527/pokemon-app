import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { getPokemon, getPokemonList } from "./api/pokemonApi";

vi.mock("./api/pokemonApi", () => ({
  getPokemonList: vi.fn(),
  getPokemon: vi.fn(),
}));

class MockImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;

  set src(_value: string) {
    this.onload?.();
  }
}

describe("App", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal("Image", MockImage);
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

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

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(screen.getByText("Name: bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("Name: charmander")).toBeInTheDocument();
  });

  it("shows skeleton cards while Pokémon are loading", async () => {
    vi.mocked(getPokemonList).mockResolvedValue({
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        },
      ],
    });

    vi.mocked(getPokemon).mockResolvedValue({
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
    });

    const { container } = render(<App />);

    expect(container.querySelectorAll(".pokemon-card-skeleton")).toHaveLength(
      20,
    );

    expect(screen.queryByText("Name: bulbasaur")).not.toBeInTheDocument();

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(container.querySelectorAll(".pokemon-card-skeleton")).toHaveLength(
      0,
    );

    expect(screen.getByText("Name: bulbasaur")).toBeInTheDocument();
  });
});
