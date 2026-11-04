import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import PokemonGridSkeleton from "./PokemonGridSkeleton";
import { useThemeStore } from "../../stores/useThemeStore";

afterEach(() => {
  cleanup();
});

describe("PokemonGridSkeleton", () => {
  it("renders 20 skeleton cards", () => {
    const { container } = render(<PokemonGridSkeleton pokemonFetchSize={20} />);
    const skeletonCards = container.querySelectorAll(".pokemon-card-skeleton");
    expect(skeletonCards).toHaveLength(20);
  });

  it("applies the light color formatting when the application theme is light", () => {
    useThemeStore.setState({ theme: "dark" });
    render(<PokemonGridSkeleton pokemonFetchSize={1} />);
    expect(screen.getByTestId("pokemon-card-skeleton-artwork")).toHaveClass(
      "pokemon-card-skeleton__artwork--dark",
    );
  });

  it("applies the light color formatting when the application theme is light", () => {
    useThemeStore.setState({ theme: "light" });
    render(<PokemonGridSkeleton pokemonFetchSize={1} />);
    expect(screen.getByTestId("pokemon-card-skeleton-artwork")).not.toHaveClass(
      "pokemon-card-skeleton__artwork--dark",
    );
  });
});
