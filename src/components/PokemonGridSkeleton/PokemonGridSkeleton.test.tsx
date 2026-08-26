import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import PokemonGridSkeleton from "./PokemonGridSkeleton";
import { ThemeContext } from "../../contexts/ThemeContext";

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
    const theme: string = "dark";
    render(
      <ThemeContext.Provider value={{ theme, setTheme: () => {} }}>
        <PokemonGridSkeleton pokemonFetchSize={1} />
      </ThemeContext.Provider>,
    );
    expect(screen.getByTestId("pokemon-card-skeleton-artwork")).toHaveClass(
      "pokemon-card-skeleton__artwork--dark",
    );
  });

  it("applies the light color formatting when the application theme is light", () => {
    const theme: string = "light";
    render(
      <ThemeContext.Provider value={{ theme, setTheme: () => {} }}>
        <PokemonGridSkeleton pokemonFetchSize={1} />
      </ThemeContext.Provider>,
    );
    expect(screen.getByTestId("pokemon-card-skeleton-artwork")).not.toHaveClass(
      "pokemon-card-skeleton__artwork--dark",
    );
  });
});
