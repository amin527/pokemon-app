import { describe, expect, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import PokemonCard from "./PokemonCard";
import { useThemeStore } from "../../stores/useThemeStore";
import { MemoryRouter, useLocation } from "react-router";
import userEvent from "@testing-library/user-event";

describe("PokemonCard", () => {
  const pokemon = {
    id: 25,
    name: "Pikachu",
    image: "https://example.com/pikachu.png",
    types: ["electric"],
  };

  const LocationDisplay = () => {
    const location = useLocation();
    return <div data-testid="location">{location.pathname}</div>;
  };

  afterEach(() => {
    cleanup();
  });

  it("displays the Pokémon name", () => {
    render(
      <MemoryRouter>
        <PokemonCard {...pokemon} />
      </MemoryRouter>,
    );

    // expect(screen.getByText("Name: Pikachu")).toBeTruthy();
    expect(screen.getByTestId("pokemon-card-info")).toHaveTextContent(
      "Pikachu",
    );
  });

  it("displays the Pokémon ID", () => {
    render(
      <MemoryRouter>
        <PokemonCard {...pokemon} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("pokemon-card-info")).toHaveTextContent("25");
    // expect(screen.getByText("ID: 25")).toBeTruthy();
  });

  it("displays the Pokémon artwork", () => {
    render(
      <MemoryRouter>
        <PokemonCard {...pokemon} />
      </MemoryRouter>,
    );

    const image = screen.getByRole("img", { name: "Pikachu" });

    expect(image.getAttribute("src")).toBe("https://example.com/pikachu.png");
  });

  it("displays the Pokémon types", () => {
    render(
      <MemoryRouter>
        <PokemonCard {...pokemon} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Electric")).toBeTruthy();
  });

  it("navigates to the Pokémon details page when clicked", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <PokemonCard {...pokemon} />
        <LocationDisplay />
      </MemoryRouter>,
    );
    await user.click(screen.getByTestId("pokemon-card"));
    expect(screen.getByTestId("location")).toHaveTextContent(
      `/pokemon/${pokemon.id}`,
    );
  });

  it("applies the dark colour formatting to the pokemon card when the application theme is dark", () => {
    useThemeStore.setState({ theme: "dark" });
    render(
      <MemoryRouter>
        <PokemonCard {...pokemon} />,
      </MemoryRouter>,
    );
    expect(screen.getByTestId("pokemon-card")).toHaveClass(
      "pokemon-card--dark",
    );
  });

  it("applies the light colour formatting to the pokemon card when the application theme is light", () => {
    useThemeStore.setState({ theme: "light" });
    render(
      <MemoryRouter>
        <PokemonCard {...pokemon} />,
      </MemoryRouter>,
    );
    expect(screen.getByTestId("pokemon-card")).not.toHaveClass(
      "pokemon-card--dark",
    );
  });
});
