import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LandingDisplay from "./LandingDisplay";
import { fetchPokemon } from "../../functions/fetchPokemon";
import { calculatePokemonFetchSize } from "../../functions/calculatePokemonFetchSize";
import { useComponentWidth } from "../../hooks/useComponentWidth";
import { ThemeContext } from "../../contexts/ThemeContext";
import { MemoryRouter, useSearchParams } from "react-router";
import { getPokemonCount } from "../../functions/API/getPokemonCount";
import userEvent from "@testing-library/user-event";
import { NavigationContext } from "../../contexts/NavigationContext";

vi.mock("../../functions/API/getPokemonCount");
vi.mock("../../hooks/useComponentWidth");
vi.mock("../../functions/fetchPokemon", () => ({ fetchPokemon: vi.fn() }));
vi.mock("../../functions/calculatePokemonFetchSize", () => ({
  calculatePokemonFetchSize: vi.fn(),
}));
vi.mock("../../hooks/useComponentWidth", () => ({
  useComponentWidth: vi.fn(),
}));
vi.mock("../Pagination/Pagination", () => ({
  default: vi.fn(({ totalPages, onNext }) => (
    <div>
      <div data-testid="total-pages">{totalPages}</div>
      <button onClick={onNext}>Next</button>
    </div>
  )),
}));

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
    vi.mocked(useComponentWidth).mockReturnValue(1000);
    vi.mocked(calculatePokemonFetchSize).mockReturnValue(20);
    vi.mocked(fetchPokemon).mockResolvedValue([
      { id: 1, name: "bulbasaur", image: "bulbasaur.png", types: ["grass"] },
      { id: 4, name: "charmander", image: "charmander.png", types: ["fire"] },
    ]);

    render(
      <MemoryRouter>
        <LandingDisplay />
      </MemoryRouter>,
    );

    const pokemonDisplays = await screen.findAllByTestId(
      "pokemon-card-display",
    );

    expect(pokemonDisplays[0]).toHaveTextContent("Bulbasaur");
    expect(pokemonDisplays[1]).toHaveTextContent("Charmander");
  });

  it("displays an error message when Pokémon fail to load", async () => {
    vi.mocked(fetchPokemon).mockRejectedValueOnce(
      new Error("Failed to fetch Pokémon list"),
    );

    vi.mocked(useComponentWidth).mockReturnValue(1000);

    vi.mocked(calculatePokemonFetchSize).mockReturnValue(20);

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

  it("sets the page search param to the given page number", async () => {
    function PageParam() {
      const [searchParams] = useSearchParams();
      return <div data-testid="page-param">{searchParams.get("page")}</div>;
    }

    const user = userEvent.setup();

    vi.mocked(getPokemonCount).mockResolvedValue(10);

    vi.mocked(useComponentWidth).mockReturnValue(1000);

    vi.mocked(calculatePokemonFetchSize).mockReturnValue(5);

    render(
      <MemoryRouter>
        <LandingDisplay />
        <PageParam />
      </MemoryRouter>,
    );

    await user.click(await screen.findByRole("button", { name: "Next" }));

    expect(screen.getByTestId("page-param")).toHaveTextContent("2");
  });

  it("updates navigation history entry when the URL differs from the stored one", () => {
    const setNavigationHistory = vi.fn();

    render(
      <MemoryRouter initialEntries={["/?page=3"]}>
        <NavigationContext.Provider
          value={{
            navigationHistory: ["/"],
            navigationIndex: 0,
            setNavigationHistory,
            setNavigationIndex: vi.fn(),
          }}
        >
          <LandingDisplay />
        </NavigationContext.Provider>
      </MemoryRouter>,
    );

    expect(setNavigationHistory).toHaveBeenCalledWith(["/?page=3"]);
  });

  it("sets query search param after the user stops typing", async () => {
    function PageParam(){
      const [searchParams] = useSearchParams()
      return <div data-testid="query-param">{searchParams.get("query")}</div>
    }

    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <LandingDisplay />
        <PageParam />
      </MemoryRouter>,
    );

    await user.type(screen.getByTestId("pokemon-search-input-field"), "Test");

    await waitFor(() => {
      expect(screen.getByTestId("query-param")).toHaveTextContent("Test")
    })
  })

  it("removes the query search parameter after the user clears the search field", async () => {
    function QueryParam(){
      const [searchParams] = useSearchParams()
      return <div data-testid="query-param">{searchParams.get("query")}</div>
    }

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LandingDisplay />
        <QueryParam />
      </MemoryRouter>
    )

    const input = screen.getByTestId("pokemon-search-input-field")

    await user.type(input, "Test")

    await waitFor(() => {
      expect(screen.getByTestId("query-param")).toHaveTextContent("Test")
    })

    await user.clear(input)

    await waitFor(() => {
      expect(screen.getByTestId("query-param")).toBeEmptyDOMElement();
    })
  })

  it("pre-fills the search field from the query search param in the URL", () => {
    render(
      <MemoryRouter initialEntries={["/?query=pikachu"]}>
        <LandingDisplay />
      </MemoryRouter>
    )

    expect(screen.getByTestId("pokemon-search-input-field")).toHaveValue("pikachu");
  })

});
