import { cleanup, render, screen } from "@testing-library/react";
import Button from "./ButtonWithIcon";
import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { ThemeContext } from "../../contexts/ThemeContext";

describe("ButtonWithIcon", () => {
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
    const theme: string = "light";
    render(
      <ThemeContext.Provider value={{ theme, setTheme: () => {} }}>
        <Button text="" handleClick={() => {}}></Button>
      </ThemeContext.Provider>,
    );
    expect(screen.getByRole("button")).not.toHaveClass("button--dark");
  });

  it("applies the dark color formatting when the application theme is dark", () => {
    const theme: string = "dark";
    render(
      <ThemeContext.Provider value={{ theme, setTheme: () => {} }}>
        <Button text="" handleClick={() => {}}></Button>
      </ThemeContext.Provider>,
    );
    expect(screen.getByRole("button")).toHaveClass("button--dark");
  });
});
