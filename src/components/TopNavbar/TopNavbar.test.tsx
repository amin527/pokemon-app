import { afterEach, describe, expect, it } from "vitest";
import TopNavbar from "./TopNavbar";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeContext } from "../../App";

describe("TopNavbar", () => {
  afterEach(() => {
    cleanup();
  });
  it("Displays navbar component", () => {
    render(<TopNavbar />);
    expect(screen.getByTestId("top-navbar")).toBeInTheDocument();
  });

  it("displays drop down menu following a click on the settings button", async () => {
    const user = userEvent.setup();
    render(<TopNavbar />);
    await user.click(screen.getByRole("button", { name: "Settings" }));
    expect(screen.getByTestId("drop-down")).toBeInTheDocument();
  });

  it("hides the drop down menu following a click on the settings button", async () => {
    const user = userEvent.setup();
    render(<TopNavbar />);
    await user.click(screen.getByRole("button", { name: "Settings" }));
    await user.click(screen.getByRole("button", { name: "Settings" }));
    expect(screen.queryByTestId("drop-down")).not.toBeInTheDocument();
  });

  it("hides the drop down menu following a click outside of the settings button and dropdown menu", async () => {
    const user = userEvent.setup();
    render(<TopNavbar />);
    await user.click(screen.getByRole("button", { name: "Settings" }));
    await user.click(document.body);
    expect(screen.queryByTestId("drop-down")).not.toBeInTheDocument();
  });

  it("applies the dark color formatting when the application theme is dark", () => {
    const theme: string = "dark";
    render(
      <ThemeContext.Provider value={{ theme, setTheme:()=>{} }}>
        <TopNavbar />
      </ThemeContext.Provider>
    );
    expect(screen.getByTestId("top-navbar")).toHaveClass("top-navbar--dark");
  })

  it("applies the light color formatting when the application theme is light", () => {
    const theme: string = "light";
    render(
      <ThemeContext.Provider value={{ theme, setTheme:()=>{} }}>
        <TopNavbar />
      </ThemeContext.Provider>
    );
    expect(screen.getByTestId("top-navbar")).not.toHaveClass("top-navbar--dark");
  })
});
