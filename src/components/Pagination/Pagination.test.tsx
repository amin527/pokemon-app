import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import Pagination from "./Pagination";
import { ThemeContext } from "../../contexts/ThemeContext";

describe("Pagination", () => {
  afterEach(() => {
    cleanup();
  });

  it("displays the current page and total pages", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        onPrevious={vi.fn()}
        onNext={vi.fn()}
      />,
    );
    expect(screen.getByText("2 of 10")).toBeInTheDocument();
  });

  it("calls onNext when the next button is clicked", () => {
    const onNext = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        onPrevious={vi.fn()}
        onNext={onNext}
      />,
    );
    fireEvent.click(screen.getByTestId("pagination-button-next"));
    expect(onNext).toHaveBeenCalledOnce();
  });

  it("calls onPrevious when the previous button is clicked", () => {
    const onPrevious = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        onPrevious={onPrevious}
        onNext={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByTestId("pagination-button-previous"));
    expect(onPrevious).toHaveBeenCalledOnce();
  });

  it("disables the previous button on the first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPrevious={vi.fn()}
        onNext={vi.fn()}
      />,
    );
    expect(screen.getByTestId("pagination-button-previous")).toBeDisabled();
  });

  it("disables the next button on the last page", () => {
    render(
      <Pagination
        currentPage={10}
        totalPages={10}
        onPrevious={vi.fn()}
        onNext={vi.fn()}
      />,
    );
    expect(screen.getByTestId("pagination-button-next")).toBeDisabled();
  });

  it("applies the light colour formatting when the application theme is light", () => {
    const theme: string = "light";
    render(
      <ThemeContext.Provider value={{ theme, setTheme: () => {} }}>
        <Pagination
          currentPage={10}
          totalPages={10}
          onPrevious={vi.fn()}
          onNext={vi.fn()}
        />
      </ThemeContext.Provider>,
    );
    expect(screen.getByTestId("pagination")).not.toHaveClass(
      "pagination--dark",
    );
  });

  it("applies the dark colour formatting when the application theme is dark", () => {
    const theme: string = "dark";
    render(
      <ThemeContext.Provider value={{ theme, setTheme: () => {} }}>
        <Pagination
          currentPage={10}
          totalPages={10}
          onPrevious={vi.fn()}
          onNext={vi.fn()}
        />
      </ThemeContext.Provider>,
    );
    expect(screen.getByTestId("pagination")).toHaveClass("pagination--dark");
  });

  it("applies the dark colour formatting when the application theme is dark", () => {
    const theme: string = "dark";
    render(
      <ThemeContext.Provider value={{ theme, setTheme: () => {} }}>
        <Pagination
          currentPage={10}
          totalPages={10}
          onPrevious={vi.fn()}
          onNext={vi.fn()}
        />
      </ThemeContext.Provider>,
    );
    expect(screen.getByTestId("pagination-button-next")).toHaveClass(
      "pagination__button--dark",
    );
    expect(screen.getByTestId("pagination-button-previous")).toHaveClass(
      "pagination__button--dark",
    );
  });

  it("applies the dark colour formatting when the application theme is light", () => {
    const theme: string = "light";
    render(
      <ThemeContext.Provider value={{ theme, setTheme: () => {} }}>
        <Pagination
          currentPage={10}
          totalPages={10}
          onPrevious={vi.fn()}
          onNext={vi.fn()}
        />
      </ThemeContext.Provider>,
    );
    expect(screen.getByTestId("pagination-button-next")).not.toHaveClass(
      "pagination__button--dark",
    );
    expect(screen.getByTestId("pagination-button-previous")).not.toHaveClass(
      "pagination__button--dark",
    );
  });
});
