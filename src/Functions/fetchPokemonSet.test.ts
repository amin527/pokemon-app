import { describe, expect, it, vi } from "vitest";
import { getPokemon } from "./API/getPokemon";
import { getPokemonList } from "./API/getPokemonList";
import { fetchPokemonSet } from "./fetchPokemonSet";

vi.mock("./API/getPokemon", () => ({ getPokemon: vi.fn() }));
vi.mock("./API/getPokemonList", () => ({ getPokemonList: vi.fn() }));

describe("fetchPokemonSet", () => {
  const getPokemonListResponse = {
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
  };

  const getPokemonResponseOne = {
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
  };

  const getPokemonResponseTwo = {
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
  };

  const formattedPokemonResponse = [
    {
      id: 1,
      name: "bulbasaur",
      image: "bulbasaur.png",
      types: ["grass"],
    },
    {
      id: 4,
      name: "charmander",
      image: "charmander.png",
      types: ["fire"],
    },
  ];

  it("fetches Pokemon set", async () => {
    vi.mocked(getPokemonList).mockResolvedValue(getPokemonListResponse);
    vi.mocked(getPokemon)
      .mockResolvedValueOnce(getPokemonResponseOne)
      .mockResolvedValueOnce(getPokemonResponseTwo);
    const fetchedPokemonSet = await fetchPokemonSet(0);
    expect(fetchedPokemonSet).toEqual(formattedPokemonResponse);
  });
});
