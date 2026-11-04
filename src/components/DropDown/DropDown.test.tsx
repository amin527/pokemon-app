import { afterEach, beforeEach, describe, expect, it } from "vitest";
import DropDown from "./DropDown";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useThemeStore } from "../../stores/useThemeStore";

describe("DropDown", () => {
  beforeEach(() => {
    localStorage.clear();
    useThemeStore.setState({ theme: "light" });
  });

  afterEach(() => {
    cleanup();
  });

  it("displays dropdown component", () => {
    render(<DropDown setDropDownIsVisible={() => {}} />);
    expect(screen.getByTestId("drop-down")).toBeInTheDocument();
  });

  it("updates the application theme state to dark when the Dark button is pressed", async () => {
    const user = userEvent.setup();
    render(<DropDown setDropDownIsVisible={() => {}} />);
    await user.click(screen.getByRole("button", { name: "Dark" }));
    expect(useThemeStore.getState().theme).toBe("dark");
  });

  it("updates the application theme state to light when the Light button is pressed", async () => {
    const user = userEvent.setup();
    useThemeStore.setState({ theme: "dark" });
    render(<DropDown setDropDownIsVisible={() => {}} />);
    await user.click(screen.getByRole("button", { name: "Light" }));
    expect(useThemeStore.getState().theme).toBe("light");
  });

  it("applies the light color formatting when the application theme is light", () => {
    render(<DropDown setDropDownIsVisible={() => {}} />);
    expect(screen.getByTestId("drop-down")).not.toHaveClass("drop-down--dark");
  });

  it("applies the dark color formatting when the application theme is dark", () => {
    useThemeStore.setState({ theme: "dark" });
    render(<DropDown setDropDownIsVisible={() => {}} />);
    expect(screen.getByTestId("drop-down")).toHaveClass("drop-down--dark");
  });

  it("persists the theme to local storage when the Dark button is pressed", async () => {
    const user = userEvent.setup();
    render(<DropDown setDropDownIsVisible={() => {}} />);
    await user.click(screen.getByRole("button", { name: "Dark" }));
    const saved = JSON.parse(localStorage.getItem("theme-storage") ?? "{}");
    expect(saved.state.theme).toBe("dark");
  });
});
