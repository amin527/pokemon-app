import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import Pagination from "./Pagination";

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

    fireEvent.click(screen.getByRole("button", { name: /next/i }));

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

    fireEvent.click(screen.getByRole("button", { name: /previous/i }));

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

    expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();
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

    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
  });
});
