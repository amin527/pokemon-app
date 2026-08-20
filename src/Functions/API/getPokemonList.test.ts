import { afterEach, describe, expect, it, vi } from "vitest";
import { getPokemonList } from "./getPokemonList";

describe("getPokemonList", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns a list of Pokemon when the request succeeds", async () => {
    const fakePokemonList = {
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

    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue({ ok: true, json: async () => fakePokemonList }),
    );

    const result = await getPokemonList(0, 0);

    expect(result).toEqual(fakePokemonList);
  });

  it("returns an error when the request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    await expect(getPokemonList(0, 0)).rejects.toThrow(
      "Failed to fetch Pokémon",
    );
  });
});
