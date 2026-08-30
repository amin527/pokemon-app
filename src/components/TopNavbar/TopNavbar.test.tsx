import { afterEach, describe, expect, it, vi } from "vitest";
import TopNavbar from "./TopNavbar";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeContext } from "../../contexts/ThemeContext";
import { MemoryRouter, Route, Routes } from "react-router";
import { NavigationContext } from "../../contexts/NavigationContext";
import { useState } from "react";

describe("TopNavbar", () => {
  afterEach(() => {
    cleanup();
  });

  function NavigationTestWrapper({ initialIndex }: { initialIndex: number }) {
    const [navigationIndex, setNavigationIndex] = useState(initialIndex);

    return (
      <NavigationContext.Provider
        value={{
          stackNavigation: ["/", "/pokemon/5"],
          navigationIndex,
          setNavigationIndex,
          setStackNavigation: vi.fn(),
        }}
      >
        <TopNavbar />

        <Routes>
          <Route path="/" element={<div>Landing Page</div>} />
          <Route path="/pokemon/:id" element={<div>Pokemon Details</div>} />
        </Routes>
      </NavigationContext.Provider>
    );
  }
  it("Displays navbar component", () => {
    render(
      <MemoryRouter>
        <TopNavbar />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("top-navbar")).toBeInTheDocument();
  });

  it("displays drop down menu following a click on the settings button", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <TopNavbar />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole("button", { name: "Settings" }));
    expect(screen.getByTestId("drop-down")).toBeInTheDocument();
  });

  it("hides the drop down menu following a click on the settings button", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <TopNavbar />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole("button", { name: "Settings" }));
    await user.click(screen.getByRole("button", { name: "Settings" }));
    expect(screen.queryByTestId("drop-down")).not.toBeInTheDocument();
  });

  it("hides the drop down menu following a click outside of the settings button and dropdown menu", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <TopNavbar />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole("button", { name: "Settings" }));
    await user.click(document.body);
    expect(screen.queryByTestId("drop-down")).not.toBeInTheDocument();
  });

  it("applies the dark color formatting when the application theme is dark", () => {
    const theme: string = "dark";
    render(
      <MemoryRouter>
        <ThemeContext.Provider value={{ theme, setTheme: () => {} }}>
          <TopNavbar />
        </ThemeContext.Provider>
        ,
      </MemoryRouter>,
    );
    expect(screen.getByTestId("top-navbar")).toHaveClass("top-navbar--dark");
  });

  it("applies the light color formatting when the application theme is light", () => {
    const theme: string = "light";
    render(
      <MemoryRouter>
        <ThemeContext.Provider value={{ theme, setTheme: () => {} }}>
          <TopNavbar />
        </ThemeContext.Provider>
        ,
      </MemoryRouter>,
    );
    expect(screen.getByTestId("top-navbar")).not.toHaveClass(
      "top-navbar--dark",
    );
  });

  it("redirects to the previous page in the navigation stack", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/pokemon/5"]}>
        <NavigationTestWrapper initialIndex={1} />
      </MemoryRouter>,
    );
    await user.click(screen.getByTestId("navigation-button-previous"));
    expect(screen.getByText("Landing Page")).toBeInTheDocument();
  });

  it("redirects to the next page in the navigation stack", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <NavigationTestWrapper initialIndex={0} />
      </MemoryRouter>,
    );
    await user.click(screen.getByTestId("navigation-button-next"));
    expect(screen.getByText("Pokemon Details")).toBeInTheDocument();
  });
});
