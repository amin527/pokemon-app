import { describe, expect, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import PokemonCard from "./PokemonCard";

describe("PokemonCard", () => {
  const pokemon = {
    id: 25,
    name: "Pikachu",
    artwork: "https://example.com/pikachu.png",
    types: ["electric"],
  };

  afterEach(() => {  cleanup(); });

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

    expect(image.getAttribute("src")).toBe(
      "https://example.com/pikachu.png",
    );
  });

  it("displays the Pokémon types", () => {
    render(<PokemonCard {...pokemon} />);

    expect(screen.getByText("electric")).toBeTruthy();
  });
});