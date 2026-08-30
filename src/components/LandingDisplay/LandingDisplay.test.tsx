import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LandingDisplay from "./LandingDisplay";
import { fetchPokemon } from "../../functions/fetchPokemon";
import { calculatePokemonFetchSize } from "../../functions/calculatePokemonFetchSize";
import { useComponentWidth } from "../../hooks/useComponentWidth";
import { ThemeContext } from "../../contexts/ThemeContext";
import { MemoryRouter } from "react-router";
import { getPokemonCount } from "../../functions/API/getPokemonCount";

vi.mock("../../functions/API/getPokemonCount");
vi.mock("../../hooks/useComponentWidth");
vi.mock("../../functions/fetchPokemon", () => ({ fetchPokemon: vi.fn() }));
vi.mock("../../functions/calculatePokemonFetchSize", () => ({
  calculatePokemonFetchSize: vi.fn(),
}));
vi.mock("../../hooks/useComponentWidth", () => ({
  useComponentWidth: vi.fn(),
}));

class MockImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;

  set src(_value: string) {
    this.onload?.();
  }
}

vi.mock("../Pagination/Pagination", () => ({
  default: vi.fn(({ totalPages }) => (
    <div data-testid="total-pages">{totalPages}</div>
  )),
}));

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
    const { container } = render(
      <MemoryRouter>
        <LandingDisplay />
      </MemoryRouter>,
    );
    expect(container.querySelectorAll(".pokemon-card-skeleton")).toHaveLength(
      20,
    );
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

    render(
      <MemoryRouter>
        <LandingDisplay />
      </MemoryRouter>,
    );

    expect(await screen.findByText("Name: bulbasaur")).toBeInTheDocument();
    expect(await screen.findByText("Name: charmander")).toBeInTheDocument();
  });

  it("displays an error message when Pokémon fail to load", async () => {
    vi.mocked(fetchPokemon).mockRejectedValueOnce(
      new Error("Failed to fetch Pokémon list"),
    );
    render(
      <MemoryRouter>
        <LandingDisplay />
      </MemoryRouter>,
    );
    expect(
      await screen.findByText("Failed to load Pokémon"),
    ).toBeInTheDocument();
  });

  it("applies the dark color formatting when the application theme is dark", () => {
    const theme: string = "dark";
    render(
      <MemoryRouter>
        <ThemeContext.Provider value={{ theme, setTheme: () => {} }}>
          <LandingDisplay />
        </ThemeContext.Provider>
      </MemoryRouter>,
    );
    expect(screen.getByTestId("landing-display")).toHaveClass(
      "landing-display--dark",
    );
  });

  it("applies the light color formatting when the application theme is light", () => {
    const theme: string = "light";
    render(
      <MemoryRouter>
        <ThemeContext.Provider value={{ theme, setTheme: () => {} }}>
          <LandingDisplay />
        </ThemeContext.Provider>
      </MemoryRouter>,
    );
    expect(screen.getByTestId("landing-display")).not.toHaveClass(
      "landing-display--dark",
    );
  });

  it("calculates the total number of pages from the Pokémon count and fetch size", async () => {
    vi.mocked(getPokemonCount).mockResolvedValue(1351);

    vi.mocked(useComponentWidth).mockReturnValue(1000);

    vi.mocked(calculatePokemonFetchSize).mockReturnValue(27);

    render(
      <MemoryRouter>
        <LandingDisplay />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("total-pages")).toHaveTextContent("51");
    });
  });
});
