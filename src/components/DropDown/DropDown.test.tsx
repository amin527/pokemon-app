import { afterEach, describe, expect, it, vi } from "vitest";
import DropDown from "./DropDown";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeContext } from "../../App";

describe("DropDown", () => {

  afterEach(() => { cleanup(); })

  it("displays dropdown component", () => {
    render(<DropDown setDropDownIsVisible={() => { }} />);
    expect(screen.getByTestId("drop-down")).toBeInTheDocument();
  });

  it("updates the application theme state to dark when the Dark button is pressed", async () => {
    const user = userEvent.setup();
    const setTheme = vi.fn();
    render(
      <ThemeContext.Provider value={{ theme: "light", setTheme }}      >
        <DropDown setDropDownIsVisible={() => { }} />
      </ThemeContext.Provider>
    );
    await user.click(screen.getByRole("button", { name: "Dark" }));
    expect(setTheme).toHaveBeenCalledWith("dark");
  })

  it("updates the application theme state to light when the Light button is pressed", async () => {
    const user = userEvent.setup();
    const setTheme = vi.fn();
    render(
      <ThemeContext.Provider value={{ theme: "light", setTheme }}>
        <DropDown setDropDownIsVisible={() => { }} />
      </ThemeContext.Provider>
    );
    await user.click(screen.getByRole("button", { name: "Light" }));
    expect(setTheme).toHaveBeenCalledWith("light");
  })

  it("applies the light color formatting when the application theme is light", () => {
    const theme: string = "light";
    render(
      <ThemeContext.Provider value={{ theme, setTheme:()=>{} }}>
        <DropDown setDropDownIsVisible={() => { }} />
      </ThemeContext.Provider>
    );
    expect(screen.getByTestId("drop-down")).not.toHaveClass("drop-down--dark");
  })

  it("applies the dark color formatting when the application theme is dark", () => {
    const theme: string = "dark";
    render(
      <ThemeContext.Provider value={{ theme, setTheme:()=>{} }}>
        <DropDown setDropDownIsVisible={() => { }} />
      </ThemeContext.Provider>
    );
    expect(screen.getByTestId("drop-down")).toHaveClass("drop-down--dark");
  })

  it("updates the theme value in local storage to light when the Light button is pressed", async () => {
    const user = userEvent.setup();
    render(<DropDown setDropDownIsVisible={() => { }} />);
    await user.click(screen.getByRole("button", { name: "Light" }));
    expect(localStorage.getItem("theme")).toBe("light");
  })

  it("updates the theme value in local storage to dark when the Dark button is pressed", async () => {
    const user = userEvent.setup();
    render(<DropDown setDropDownIsVisible={() => { }} />);
    await user.click(screen.getByRole("button", { name: "Dark" }));
    expect(localStorage.getItem("theme")).toBe("dark");
  })
});
