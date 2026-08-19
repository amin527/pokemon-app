import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import PokemonSearch from "./PokemonSearch";

describe("PokemonSearch", () => {
  afterEach(() => {
    cleanup();
  });
  it("renders the search input", () => {
    render(<PokemonSearch searchTerm="" onSearchTermChange={vi.fn()} />);

    expect(
      screen.getByRole("textbox", { name: /search pokémon/i }),
    ).toBeInTheDocument();
  });

  it("displays the current search term", () => {
    render(<PokemonSearch searchTerm="pikachu" onSearchTermChange={vi.fn()} />);

    expect(
      screen.getByRole("textbox", { name: /search pokémon/i }),
    ).toHaveValue("pikachu");
  });

  it("calls onSearchTermChange when the user types", () => {
    const onSearchTermChange = vi.fn();

    render(
      <PokemonSearch searchTerm="" onSearchTermChange={onSearchTermChange} />,
    );

    const input = screen.getByRole("textbox", {
      name: /search pokémon/i,
    });

    fireEvent.change(input, {
      target: { value: "pikachu" },
    });

    expect(onSearchTermChange).toHaveBeenCalledWith("pikachu");
  });
});
