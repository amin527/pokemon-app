import { afterEach, describe, expect, it, vi } from "vitest";
import { getPokemon } from "./getPokemon";

describe("getPokemon", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns Pokémon data when the request succeeds", async () => {
    const fakePokemon = {
      id: 25,
      name: "pikachu",
      height: 4,
      weight: 60,
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => fakePokemon }),
    );

    const result = await getPokemon("pikachu");

    expect(result).toEqual(fakePokemon);
  });

  it("throws an error when the request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    await expect(getPokemon("invalid-pokemon")).rejects.toThrow(
      "Failed to fetch Pokémon",
    );
  });
});
