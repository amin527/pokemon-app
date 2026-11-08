import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import PokemonGridSkeleton from "./PokemonGridSkeleton";
import { useThemeStore } from "../../stores/useThemeStore";

afterEach(() => {
  cleanup();
});

describe("PokemonGridSkeleton", () => {
  it("renders 20 skeleton cards", () => {
    const { container } = render(
      <PokemonGridSkeleton pokemonFetchSize={20} pokemonGridWidth={1000} />,
    );
    const skeletonCards = container.querySelectorAll(".pokemon-card-skeleton");
    expect(skeletonCards).toHaveLength(20);
  });

  it("uses the same small-scale grid as the loaded cards on narrow screens", () => {
    render(<PokemonGridSkeleton pokemonFetchSize={6} pokemonGridWidth={390} />);
    expect(screen.getByLabelText("Loading Pokémon")).toHaveClass(
      "pokemon-grid--small-scale",
    );
  });

  it("uses the same large-scale grid as the loaded cards on wide screens", () => {
    render(
      <PokemonGridSkeleton pokemonFetchSize={20} pokemonGridWidth={1906} />,
    );
    expect(screen.getByLabelText("Loading Pokémon")).toHaveClass(
      "pokemon-grid--large-scale",
    );
  });

  it("applies the dark color formatting when the application theme is dark", () => {
    useThemeStore.setState({ theme: "dark" });
    render(
      <PokemonGridSkeleton pokemonFetchSize={1} pokemonGridWidth={1000} />,
    );
    expect(screen.getByTestId("pokemon-card-skeleton-artwork")).toHaveClass(
      "pokemon-card-skeleton__artwork--dark",
    );
  });

  it("applies the light color formatting when the application theme is light", () => {
    useThemeStore.setState({ theme: "light" });
    render(
      <PokemonGridSkeleton pokemonFetchSize={1} pokemonGridWidth={1000} />,
    );
    expect(screen.getByTestId("pokemon-card-skeleton-artwork")).not.toHaveClass(
      "pokemon-card-skeleton__artwork--dark",
    );
  });
});
