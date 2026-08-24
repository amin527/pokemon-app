import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import PokemonGridSkeleton from "./PokemonGridSkeleton";

afterEach(() => {
  cleanup();
});

describe("PokemonGridSkeleton", () => {
  it("renders 20 skeleton cards", () => {
    const { container } = render(
      <PokemonGridSkeleton pokemonFetchSize={20} />,
    );

    const skeletonCards = container.querySelectorAll(".pokemon-card-skeleton");

    expect(skeletonCards).toHaveLength(20);
  });
});
