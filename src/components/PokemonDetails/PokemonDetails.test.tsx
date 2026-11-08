import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import PokemonDetails from "./PokemonDetails";
import type { Pokemon } from "../../types/Pokemon";
import type { DetailedPokemon } from "../../types/DetailedPokemon";
import { NavigationContext } from "../../contexts/NavigationContext";
import { useThemeStore } from "../../stores/useThemeStore";
import { loadDetailPage } from "../../functions/loadDetailPage";

vi.mock("../../functions/loadDetailPage");

describe("PokemonDetails", () => {
  beforeEach(() => {
    vi.mocked(loadDetailPage).mockResolvedValue({ pokemon, similarPokemon });
  });

  afterEach(() => {
    cleanup();
  });

  const renderPokemonDetails = (theme: "light" | "dark" = "light") => {
    useThemeStore.setState({ theme });
    render(
      <NavigationContext.Provider
        value={{
          navigationHistory: [],
          setNavigationHistory: vi.fn(),
          navigationIndex: 0,
          setNavigationIndex: vi.fn(),
        }}
      >
        <MemoryRouter initialEntries={["/pokemon/5"]}>
          <Routes>
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
          </Routes>
        </MemoryRouter>
      </NavigationContext.Provider>,
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

    expect(await screen.findByText("#005")).toBeInTheDocument();
  });

  it("displays the Pokemon name as the page heading", async () => {
    renderPokemonDetails();

    expect(
      await screen.findByRole("heading", { level: 1, name: "Charmeleon" }),
    ).toBeInTheDocument();
  });

  it("describes the Pokemon artwork for screen readers", async () => {
    renderPokemonDetails();

    expect(
      await screen.findByRole("img", { name: "Charmeleon" }),
    ).toBeInTheDocument();
  });

  it("displays the Pokemon height in metres", async () => {
    renderPokemonDetails();

    expect(await screen.findByText("1.1 m")).toBeInTheDocument();
  });

  it("displays the Pokemon weight in kilograms", async () => {
    renderPokemonDetails();

    expect(await screen.findByText("19 kg")).toBeInTheDocument();
  });

  it("displays the Pokemon types", async () => {
    renderPokemonDetails();

    expect(
      await screen.findByText((_, element) =>
        Boolean(
          element?.classList.contains("pokemon-details__types") &&
          element.textContent?.trim() === "Fire",
        ),
      ),
    ).toBeInTheDocument();
  });

  it("displays the Pokemon stats", async () => {
    renderPokemonDetails();

    const rows = await screen.findAllByTestId("pokemon-details-stat");

    expect(rows).toHaveLength(pokemon.stats.length);
    pokemon.stats.forEach((stat, index) => {
      expect(rows[index]).toHaveTextContent(stat.name);
      expect(rows[index]).toHaveTextContent(String(stat.baseValue));
    });
  });

  it("displays the Pokemon abilities", async () => {
    renderPokemonDetails();

    expect(await screen.findByText("Blaze")).toBeInTheDocument();
    expect(screen.getByText("Solar Power")).toBeInTheDocument();
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
      expect(cards[index]).toHaveTextContent(
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
      );
    });
  });

  it("displays the types of the similar Pokemon", async () => {
    renderPokemonDetails();

    const cards = await screen.findAllByTestId("pokemon-card");

    similarPokemon.forEach((pokemon, index) => {
      pokemon.types.forEach((type) => {
        expect(cards[index]).toHaveTextContent(
          type.charAt(0).toUpperCase() + type.slice(1),
        );
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
    renderPokemonDetails("dark");

    expect(screen.getByTestId("pokemon-details-component-content")).toHaveClass(
      "pokemon-details-component__content--dark",
    );
  });

  it("applies the light colour formatting to the loading state when the application theme is light", () => {
    renderPokemonDetails("light");

    expect(
      screen.getByTestId("pokemon-details-component-content"),
    ).not.toHaveClass("pokemon-details-component__content--dark");
  });
});
