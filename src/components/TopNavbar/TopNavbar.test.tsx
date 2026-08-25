import { afterEach, describe, expect, it } from "vitest";
import TopNavbar from "./TopNavbar";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("TopNavbar", () => {
  afterEach(() => {
    cleanup();
  });
  it("Displays navbar component", () => {
    render(<TopNavbar />);
    expect(screen.getByTestId("top-navbar-component")).toBeInTheDocument();
  });

  it("displays drop down menu following a click on the settings button", async () => {
    const user = userEvent.setup();
    render(<TopNavbar />);
    await user.click(screen.getByRole("button", { name: "Settings" }));
    expect(screen.getByTestId("drop-down-component")).toBeInTheDocument();
  });

  it("hides the drop down menu following a click on the settings button", async () => {
    const user = userEvent.setup();
    render(<TopNavbar />);
    await user.click(screen.getByRole("button", { name: "Settings" }));
    await user.click(screen.getByRole("button", { name: "Settings" }));
    expect(screen.queryByTestId("drop-down-component")).not.toBeInTheDocument();
  });

  it("hides the drop down menu following a click outside of the settings button and dropdown menu", async () => {
    const user = userEvent.setup();
    render(<TopNavbar />);
    await user.click(screen.getByRole("button", { name: "Settings" }));
    await user.click(document.body);
    expect(screen.queryByTestId("drop-down-component")).not.toBeInTheDocument();
  });
});
