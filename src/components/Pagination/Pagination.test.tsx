import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import Pagination from "./Pagination";
import { ThemeContext } from "../../contexts/ThemeContext";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

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

  it("does not update currentPage below the first page", async () => {
  const user = userEvent.setup();

  function TestPagination() {
    const [currentPage, setCurrentPage] = useState(1);
    const onPrevious = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
    
    return (
      <>
        <span data-testid="current-page">{currentPage}</span>

        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPrevious={onPrevious}
          onNext={vi.fn()}
        />
      </>
    );
  }
  render(<TestPagination />);
  await user.click(screen.getByTestId("pagination-button-previous"));
  expect(screen.getByTestId("current-page")).toHaveTextContent("1");
});

  it("does not update currentPage past the last page", async () => {
    const user = userEvent.setup();

    function TestPagination() {
      const [currentPage, setCurrentPage] = useState(10);
      const totalPages = 10;

      const onNext = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };

      return (
        <>
          <span data-testid="current-page">{currentPage}</span>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={vi.fn()}
            onNext={onNext}
          />
        </>
      );
    }

    render(<TestPagination />);

    await user.click(screen.getByTestId("pagination-button-next"));

    expect(screen.getByTestId("current-page")).toHaveTextContent("10");
  });

  it("applies the light colour formatting when the application theme is light", () => {
    const theme: string = "light";
    render(
      <ThemeContext.Provider value={{ theme, setTheme: () => { } }}>
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
      <ThemeContext.Provider value={{ theme, setTheme: () => { } }}>
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
      <ThemeContext.Provider value={{ theme, setTheme: () => { } }}>
        <Pagination
          currentPage={10}
          totalPages={10}
          onPrevious={vi.fn()}
          onNext={vi.fn()}
        />
      </ThemeContext.Provider>,
    );
    expect(screen.getByTestId("pagination-button-next")).toHaveClass(
      "button-with-icon--dark",
    );
    expect(screen.getByTestId("pagination-button-previous")).toHaveClass(
      "button-with-icon--dark",
    );
  });

  it("applies the dark colour formatting when the application theme is light", () => {
    const theme: string = "light";
    render(
      <ThemeContext.Provider value={{ theme, setTheme: () => { } }}>
        <Pagination
          currentPage={10}
          totalPages={10}
          onPrevious={vi.fn()}
          onNext={vi.fn()}
        />
      </ThemeContext.Provider>,
    );
    expect(screen.getByTestId("pagination-button-next")).not.toHaveClass(
      "button-with-icon--dark",
    );
    expect(screen.getByTestId("pagination-button-previous")).not.toHaveClass(
      "button-with-icon--dark",
    );
  });
});
