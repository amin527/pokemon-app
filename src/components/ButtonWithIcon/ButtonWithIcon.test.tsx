import { cleanup, render, screen } from "@testing-library/react";
import Button from "./ButtonWithIcon";
import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { ThemeContext } from "../../contexts/ThemeContext";
import { ChevronDown } from "lucide-react";

describe("ButtonWithIcon", () => {
  afterEach(() => {
    cleanup();
  });

  it("displays button icon", () => {
    render(<Button handleClick={() => {}} icon={ <ChevronDown data-testid="chevron-down-test"/>} />);
    expect(screen.getByTestId("chevron-down-test")).toBeInTheDocument();
  });

  it("executes the handleClick function", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button icon={<ChevronDown/>} handleClick={handleClick} />);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies the light color formatting when the application theme is light", () => {
    const theme: string = "light";
    render(
      <ThemeContext.Provider value={{ theme, setTheme: () => {} }}>
        <Button icon={<ChevronDown/>} handleClick={() => {}}></Button>
      </ThemeContext.Provider>,
    );
    expect(screen.getByRole("button")).not.toHaveClass("button-with-icon--dark");
  });

  it("applies the dark color formatting when the application theme is dark", () => {
    const theme: string = "dark";
    render(
      <ThemeContext.Provider value={{ theme, setTheme: () => {} }}>
        <Button icon={<ChevronDown/>} handleClick={() => {}}></Button>
      </ThemeContext.Provider>,
    );
    expect(screen.getByRole("button")).toHaveClass("button-with-icon--dark");
  });
});
