import { afterEach, describe, expect, it } from "vitest";
import TopNavbar from "./TopNavbar";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useThemeStore } from "../../stores/useThemeStore";
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

  it("gives the history buttons accessible names", () => {
    render(
      <MemoryRouter>
        <TopNavbar />
      </MemoryRouter>,
    );
    expect(screen.getByRole("button", { name: "Go back" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Go forward" }),
    ).toBeInTheDocument();
  });

  it("reports whether the settings menu is open", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <TopNavbar />
      </MemoryRouter>,
    );
    const settingsButton = screen.getByRole("button", { name: "Settings" });
    expect(settingsButton).toHaveAttribute("aria-expanded", "false");
    await user.click(settingsButton);
    expect(settingsButton).toHaveAttribute("aria-expanded", "true");
  });

  it("hides the drop down menu when Escape is pressed", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <TopNavbar />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole("button", { name: "Settings" }));
    await user.keyboard("{Escape}");
    expect(screen.queryByTestId("drop-down")).not.toBeInTheDocument();
  });

  it("applies the dark color formatting when the application theme is dark", () => {
    useThemeStore.setState({ theme: "dark" });
    render(
      <MemoryRouter>
        <TopNavbar />,
      </MemoryRouter>,
    );
    expect(screen.getByTestId("top-navbar")).toHaveClass("top-navbar--dark");
  });

  it("applies the light color formatting when the application theme is light", () => {
    useThemeStore.setState({ theme: "light" });
    render(
      <MemoryRouter>
        <TopNavbar />,
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
    await user.click(screen.getByTestId("navigation-button-previous"));
    expect(await screen.findByText("Landing Page")).toBeInTheDocument();

    await user.click(screen.getByTestId("navigation-button-next"));
    expect(await screen.findByText("Pokemon Details")).toBeInTheDocument();
  });

  it("goes to the landing page when the Pokédex title is clicked", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/pokemon/5"]}>
        <TopNavbar />
        <Routes>
          <Route path="/" element={<div>Landing Page</div>} />
          <Route path="/pokemon/:id" element={<div>Pokemon Details</div>} />
        </Routes>
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("link", { name: "Pokédex home" }));
    expect(await screen.findByText("Landing Page")).toBeInTheDocument();
  });

  it("marks the Pokédex title as the current page on the landing page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TopNavbar />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Pokédex home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
