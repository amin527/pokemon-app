import { cleanup, render, screen } from "@testing-library/react";
import Button from "./ButtonWithIcon";
import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { useThemeStore } from "../../stores/useThemeStore";
import { ChevronDown } from "lucide-react";

describe("ButtonWithIcon", () => {
  afterEach(() => {
    cleanup();
  });

  it("displays button icon", () => {
    render(
      <Button
        handleClick={() => {}}
        icon={<ChevronDown data-testid="chevron-down-test" />}
      />,
    );
    expect(screen.getByTestId("chevron-down-test")).toBeInTheDocument();
  });

  it("executes the handleClick function", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button icon={<ChevronDown />} handleClick={handleClick} />);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies the light color formatting when the application theme is light", () => {
    useThemeStore.setState({ theme: "light" });
    render(<Button icon={<ChevronDown />} handleClick={() => {}}></Button>);
    expect(screen.getByRole("button")).not.toHaveClass(
      "button-with-icon--dark",
    );
  });

  it("applies the dark color formatting when the application theme is dark", () => {
    useThemeStore.setState({ theme: "dark" });
    render(<Button icon={<ChevronDown />} handleClick={() => {}}></Button>);
    expect(screen.getByRole("button")).toHaveClass("button-with-icon--dark");
  });
});
