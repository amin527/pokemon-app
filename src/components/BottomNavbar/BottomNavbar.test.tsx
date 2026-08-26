import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import BottomNavbar from "./BottomNavbar";
import { ThemeContext } from "../../App";

describe("BottomNavbar", () => {

  afterEach(() => {cleanup()})

  it("renders childComponent", () => {
    render(
      <BottomNavbar>
        <div>Child Component</div>
      </BottomNavbar>,
    );
    expect(screen.getByText("Child Component")).toBeInTheDocument();
  });

  it("applies the light color formatting when the application theme is light", () => {
    const theme: string = "light";
    render(
      <ThemeContext.Provider value={{ theme, setTheme:()=>{} }}>
        <BottomNavbar>
          <div>Child Component</div>
        </BottomNavbar>
      </ThemeContext.Provider>
    );
    expect(screen.getByTestId("bottom-navbar")).not.toHaveClass("bottom-navbar--dark");
  })

  it("applies the light color formatting when the application theme is light", () => {
    const theme: string = "light";
    render(
      <ThemeContext.Provider value={{ theme, setTheme:()=>{} }}>
        <BottomNavbar>
          <div>Child Component</div>
        </BottomNavbar>
      </ThemeContext.Provider>
    );
    expect(screen.getByTestId("bottom-navbar")).not.toHaveClass("bottom-navbar--dark");
  })
});
