import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { describe, expect, it, vi, afterEach } from "vitest";
import PokemonSearch from "./PokemonSearch";
import { useThemeStore } from "../../stores/useThemeStore";

describe("PokemonSearch", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the search input", () => {
    render(
      <PokemonSearch error={""} searchTerm="" onSearchTermChange={vi.fn()} />,
    );
    expect(
      screen.getByTestId("pokemon-search-input-field"),
    ).toBeInTheDocument();
  });

  it("displays the current search term", () => {
    render(
      <PokemonSearch
        error={""}
        searchTerm="pikachu"
        onSearchTermChange={vi.fn()}
      />,
    );
    expect(screen.getByTestId("pokemon-search-input-field")).toHaveValue(
      "pikachu",
    );
  });

  it("calls onSearchTermChange when the user types", () => {
    const onSearchTermChange = vi.fn();
    render(
      <PokemonSearch
        error={""}
        searchTerm=""
        onSearchTermChange={onSearchTermChange}
      />,
    );
    const input = screen.getByTestId("pokemon-search-input-field");
    fireEvent.change(input, { target: { value: "pikachu" } });
    expect(onSearchTermChange).toHaveBeenCalledWith("pikachu");
  });

  it("labels the search input for screen readers", () => {
    render(
      <PokemonSearch error={""} searchTerm="" onSearchTermChange={vi.fn()} />,
    );
    expect(
      screen.getByRole("searchbox", { name: "Search Pokémon" }),
    ).toBeInTheDocument();
  });

  it("clears the search term when the clear button is pressed", () => {
    const onSearchTermChange = vi.fn();
    render(
      <PokemonSearch
        error={""}
        searchTerm="pikachu"
        onSearchTermChange={onSearchTermChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(onSearchTermChange).toHaveBeenCalledWith("");
  });

  it("hides the clear button when the search term is empty", () => {
    render(
      <PokemonSearch error={""} searchTerm="" onSearchTermChange={vi.fn()} />,
    );
    expect(
      screen.queryByRole("button", { name: "Clear search" }),
    ).not.toBeInTheDocument();
  });

  it("links the error message to the search input", () => {
    render(
      <PokemonSearch
        error="No Pokémon found"
        searchTerm="zzz"
        onSearchTermChange={vi.fn()}
      />,
    );
    const input = screen.getByTestId("pokemon-search-input-field");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("No Pokémon found");
  });

  it("applies the light color formatting when the application theme is light", () => {
    useThemeStore.setState({ theme: "light" });
    render(
      <PokemonSearch error={""} searchTerm="" onSearchTermChange={vi.fn()} />,
    );
    expect(screen.getByTestId("pokemon-search-input-field")).not.toHaveClass(
      "pokemon-search__input-field--dark",
    );
  });

  it("applies the light color formatting when the application theme is light", () => {
    useThemeStore.setState({ theme: "dark" });
    render(
      <PokemonSearch error={""} searchTerm="" onSearchTermChange={vi.fn()} />,
    );
    expect(screen.getByTestId("pokemon-search-input-field")).toHaveClass(
      "pokemon-search__input-field--dark",
    );
  });
});
