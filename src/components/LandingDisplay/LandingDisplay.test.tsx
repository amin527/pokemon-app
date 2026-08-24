import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LandingDisplay from "./LandingDisplay";
import { fetchPokemon } from "../../functions/fetchPokemon";
import { calculatePokemonFetchSize } from "../../functions/calculatePokemonFetchSize";
import { useComponentWidth } from "../../hooks/useComponentWidth";

vi.mock("../../functions/fetchPokemon", () => ({ fetchPokemon: vi.fn() }));
vi.mock("../../functions/calculatePokemonFetchSize", () => ({  calculatePokemonFetchSize: vi.fn() }))
vi.mock("../../hooks/useComponentWidth", () => ({  useComponentWidth: vi.fn() }));

class MockImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;

  set src(_value: string) {
    this.onload?.();
  }
}

describe("LandingDisplay", () => {
  beforeEach(() => {
    vi.stubGlobal("Image", MockImage);
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("shows skeleton cards while Pokémon are loading", async () => {
    vi.mocked(useComponentWidth).mockReturnValue(1000);
    vi.mocked(calculatePokemonFetchSize).mockReturnValue(20);
    const { container } = render(<LandingDisplay />);
    expect(container.querySelectorAll(".pokemon-card-skeleton")).toHaveLength(20);
  });

  it("loads and displays Pokémon", async () => {
    vi.mocked(fetchPokemon).mockResolvedValue([
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
    ]);

    render(<LandingDisplay />);

    expect(await screen.findByText("Name: bulbasaur")).toBeInTheDocument();
    expect(await screen.findByText("Name: charmander")).toBeInTheDocument();
  });

  it("displays an error message when Pokémon fail to load", async () => {
    vi.mocked(fetchPokemon).mockRejectedValueOnce(
      new Error("Failed to fetch Pokémon list"),
    );

    render(<LandingDisplay />);

    expect(
      await screen.findByText("Failed to load Pokémon"),
    ).toBeInTheDocument();
  });
});
