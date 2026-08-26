import { describe, expect, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import PokemonCard from "./PokemonCard";
import { ThemeContext } from "../../App";

describe("PokemonCard", () => {
  const pokemon = {
    id: 25,
    name: "Pikachu",
    artwork: "https://example.com/pikachu.png",
    types: ["electric"],
  };

  afterEach(() => {
    cleanup();
  });

  it("displays the Pokémon name", () => {
    render(<PokemonCard {...pokemon} />);

    expect(screen.getByText("Name: Pikachu")).toBeTruthy();
  });

  it("displays the Pokémon ID", () => {
    render(<PokemonCard {...pokemon} />);

    expect(screen.getByText("ID: 25")).toBeTruthy();
  });

  it("displays the Pokémon artwork", () => {
    render(<PokemonCard {...pokemon} />);

    const image = screen.getByRole("img", { name: "Pikachu" });

    expect(image.getAttribute("src")).toBe("https://example.com/pikachu.png");
  });

  it("displays the Pokémon types", () => {
    render(<PokemonCard {...pokemon} />);
    expect(screen.getByText("electric")).toBeTruthy();
  });

  it("applies the dark colour formatting to the card background when the application theme is dark", () => {
    const theme: string = "dark";
    render(
      <ThemeContext.Provider value={{ theme, setTheme:()=>{} }}>
        <PokemonCard {...pokemon} />
      </ThemeContext.Provider>
    );
    expect(screen.getByTestId("pokemon-card")).toHaveClass("pokemon-card--dark");
  })

  it("applies the light colour formatting to the card background when the application theme is light", () => {
    const theme: string = "light";
    render(
      <ThemeContext.Provider value={{ theme, setTheme:()=>{} }}>
        <PokemonCard {...pokemon} />
      </ThemeContext.Provider>
    );
    expect(screen.getByTestId("pokemon-card")).not.toHaveClass("pokemon-card_--dark");
  })

  it("applies the dark colour formatting to the card info background when the application theme is dark", () => {
    const theme: string = "dark";
    render(
      <ThemeContext.Provider value={{ theme, setTheme:()=>{} }}>
        <PokemonCard {...pokemon} />
      </ThemeContext.Provider>
    );
    expect(screen.getByTestId("pokemon-card-info")).toHaveClass("pokemon-card__info--dark");
  })

  it("applies the light colour formatting to the card info background when the application theme is light", () => {
    const theme: string = "light";
    render(
      <ThemeContext.Provider value={{ theme, setTheme:()=>{} }}>
        <PokemonCard {...pokemon} />
      </ThemeContext.Provider>
    );
    expect(screen.getByTestId("pokemon-card-info")).not.toHaveClass("pokemon-card__info--dark");
  })
});
