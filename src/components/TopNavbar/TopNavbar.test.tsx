import { afterEach, describe, expect, it } from "vitest";
import TopNavbar from "./TopNavbar";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeContext } from "../../contexts/ThemeContext";
import { BrowserRouter, Link, MemoryRouter, Route, Routes } from "react-router";

describe("TopNavbar", () => {
  afterEach(() => {
    cleanup();
  });


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
        <ThemeContext.Provider value={{ theme, setTheme: () => { } }}>
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
        <ThemeContext.Provider value={{ theme, setTheme: () => { } }}>
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
      <BrowserRouter>
        <TopNavbar />
        <Link to="/pokemon/5">Go to details</Link>
        <Routes>
          <Route path="/" element={<div>Landing Page</div>} />
          <Route path="/pokemon/:id" element={<div>Pokemon Details</div>} />
        </Routes>
      </BrowserRouter>,
    );

    await user.click(screen.getByText("Go to details"));
    expect(await screen.findByText("Pokemon Details")).toBeInTheDocument();

    await user.click(screen.getByTestId("navigation-button-previous"));
    expect(await screen.findByText("Landing Page")).toBeInTheDocument();
  });

  it("redirects to the next page in the navigation stack", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter >
        <TopNavbar />
        <Link to="/pokemon/5">Go to details</Link>
        <Routes>
          <Route path="/" element={<div>Landing Page</div>} />
          <Route path="/pokemon/:id" element={<div>Pokemon Details</div>} />
        </Routes>
      </BrowserRouter>
    );
    await user.click(screen.getByText("Go to details"));
    await user.click(screen.getByTestId("navigation-button-previous"));
    expect(await screen.findByText("Landing Page")).toBeInTheDocument();

    await user.click(screen.getByTestId("navigation-button-next"));
    expect(await screen.findByText("Pokemon Details")).toBeInTheDocument();
  });

});
