import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";

import PokemonDetails from "./PokemonDetails";
import { loadDetailedPokemon } from "../../functions/loadDetailedPokemon";
import { loadSimilarPokemon } from "../../functions/loadSimilarPokemon";
import { preloadImage } from "../../functions/preloadImage";
import type { Pokemon } from "../../types/Pokemon";
import type { DetailedPokemon } from "../../types/DetailedPokemon";
import { NavigationContext } from "../../contexts/NavigationContext";
import { ThemeContext } from "../../contexts/ThemeContext";

vi.mock("../../functions/loadDetailedPokemon");
vi.mock("../../functions/loadSimilarPokemon");
vi.mock("../../functions/preloadImage");

describe("PokemonDetails", () => {
  afterEach(() => {
    cleanup();
  });

  const renderPokemonDetails = (
    theme: string = "light",
    loaded: boolean = true,
  ) => {
    if (loaded) {
      vi.mocked(loadDetailedPokemon).mockImplementation(
        async ({ setPokemon }) => {
          setPokemon(pokemon);
        },
      );

      vi.mocked(loadSimilarPokemon).mockImplementation(
        async ({ setSimilarPokemon }) => {
          setSimilarPokemon(similarPokemon);
        },
      );

      vi.mocked(preloadImage).mockResolvedValue(undefined);
    }

    render(
      <ThemeContext.Provider value={{ theme, setTheme: () => {} }}>
        <NavigationContext.Provider
          value={{
            stackNavigation: [],
            setStackNavigation: vi.fn(),
            navigationIndex: 0,
            setNavigationIndex: vi.fn(),
          }}
        >
          <MemoryRouter initialEntries={["/pokemon/5"]}>
            <PokemonDetails />
          </MemoryRouter>
        </NavigationContext.Provider>
      </ThemeContext.Provider>,
    );
  };
  const pokemon: DetailedPokemon = {
    id: 5,
    name: "charmeleon",
    height: 11,
    weight: 190,
    image: "image.png",
    types: ["fire"],
    stats: [
      { name: "HP", baseValue: 58 },
      { name: "Attack", baseValue: 64 },
      { name: "Defense", baseValue: 58 },
      { name: "Special Attack", baseValue: 80 },
      { name: "Special Defence", baseValue: 65 },
      { name: "Speed", baseValue: 80 },
    ],
    abilities: ["blaze", "solar-power"],
  };

  const similarPokemon: Pokemon[] = [
    {
      id: 4,
      name: "charmander",
      image: "image.png",
      types: ["fire"],
    },
    {
      id: 6,
      name: "charizard",
      image: "image.png",
      types: ["fire"],
    },
    {
      id: 37,
      name: "vulpix",
      image: "image.png",
      types: ["fire"],
    },
  ];

  it("displays the Pokemon ID", async () => {
    renderPokemonDetails();

    expect(await screen.findByText("ID: 5")).toBeInTheDocument();
  });

  it("displays the Pokemon name", async () => {
    renderPokemonDetails();

    expect(await screen.findByText("Name: charmeleon")).toBeInTheDocument();
  });

  it("displays the Pokemon height", async () => {
    renderPokemonDetails();

    expect(await screen.findByText("Height: 11")).toBeInTheDocument();
  });

  it("displays the Pokemon weight", async () => {
    renderPokemonDetails();

    expect(await screen.findByText("Weight: 190")).toBeInTheDocument();
  });

  it("displays the Pokemon types", async () => {
    renderPokemonDetails();

    expect(
      await screen.findByText((_, element) =>
        Boolean(
          element?.classList.contains("pokemon-details__types") &&
          element.textContent?.trim() === "Types: fire",
        ),
      ),
    ).toBeInTheDocument();
  });

  it("displays the Pokemon stats", async () => {
    renderPokemonDetails();

    expect(await screen.findByText("HP: 58")).toBeInTheDocument();
    expect(screen.getByText("Attack: 64")).toBeInTheDocument();
    expect(screen.getByText("Defense: 58")).toBeInTheDocument();
    expect(screen.getByText("Special Attack: 80")).toBeInTheDocument();
    expect(screen.getByText("Special Defence: 65")).toBeInTheDocument();
    expect(screen.getByText("Speed: 80")).toBeInTheDocument();
  });

  it("displays the Pokemon abilities", async () => {
    renderPokemonDetails();

    expect(await screen.findByText("blaze")).toBeInTheDocument();
    expect(screen.getByText("solar-power")).toBeInTheDocument();
  });

  it("displays the IDs of the similar Pokemon", async () => {
    renderPokemonDetails();

    const cards = await screen.findAllByTestId("pokemon-card");

    similarPokemon.forEach((pokemon, index) => {
      expect(cards[index]).toHaveTextContent(pokemon.id.toString());
    });
  });

  it("displays the names of the similar Pokemon", async () => {
    renderPokemonDetails();

    const cards = await screen.findAllByTestId("pokemon-card");

    similarPokemon.forEach((pokemon, index) => {
      expect(cards[index]).toHaveTextContent(pokemon.name);
    });
  });

  it("displays the types of the similar Pokemon", async () => {
    renderPokemonDetails();

    const cards = await screen.findAllByTestId("pokemon-card");

    similarPokemon.forEach((pokemon, index) => {
      pokemon.types.forEach((type) => {
        expect(cards[index]).toHaveTextContent(type);
      });
    });
  });

  it("applies the dark colour formatting to the Pokemon details component when the application theme is dark", () => {
    renderPokemonDetails("dark");

    expect(screen.getByTestId("pokemon-details-component")).toHaveClass(
      "pokemon-details-component--dark",
    );
  });

  it("applies the light colour formatting to the Pokemon details component when the application theme is light", () => {
    renderPokemonDetails("light");

    expect(screen.getByTestId("pokemon-details-component")).not.toHaveClass(
      "pokemon-details-component--dark",
    );
  });

  it("applies the dark colour formatting to the Pokemon image when the application theme is dark", async () => {
    renderPokemonDetails("dark");

    expect(await screen.findByTestId("pokemon-details-image")).toHaveClass(
      "pokemon-details__image--dark",
    );
  });

  it("applies the light colour formatting to the Pokemon image when the application theme is light", async () => {
    renderPokemonDetails("light");

    expect(await screen.findByTestId("pokemon-details-image")).not.toHaveClass(
      "pokemon-details__image--dark",
    );
  });

  it("applies the dark colour formatting to the loading state when the application theme is dark", () => {
    renderPokemonDetails("dark", false);

    expect(screen.getByTestId("pokemon-details-component-content")).toHaveClass(
      "pokemon-details-component__content--dark",
    );
  });

  it("applies the light colour formatting to the loading state when the application theme is light", () => {
    renderPokemonDetails("light", false);

    expect(
      screen.getByTestId("pokemon-details-component-content"),
    ).not.toHaveClass("pokemon-details-component__content--dark");
  });
});
