import { cleanup, render, screen } from "@testing-library/react";
import Button from "./ButtonWithText";
import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { useThemeStore } from "../../stores/useThemeStore";

describe("ButtonWithText", () => {
  afterEach(() => {
    cleanup();
  });

  it("displays button text", () => {
    render(<Button handleClick={() => {}} text={"Button Text"} />);
    expect(screen.getByText("Button Text")).toBeInTheDocument();
  });

  it("executes the handleClick function", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button text="ON" handleClick={handleClick} />);
    await user.click(screen.getByRole("button", { name: "ON" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies the light color formatting when the application theme is light", () => {
    useThemeStore.setState({ theme: "light" });
    render(<Button text="" handleClick={() => {}}></Button>);
    expect(screen.getByRole("button")).not.toHaveClass(
      "button-with-text--dark",
    );
  });

  it("applies the dark color formatting when the application theme is dark", () => {
    useThemeStore.setState({ theme: "dark" });
    render(<Button text="" handleClick={() => {}}></Button>);
    expect(screen.getByRole("button")).toHaveClass("button-with-text--dark");
  });
});
