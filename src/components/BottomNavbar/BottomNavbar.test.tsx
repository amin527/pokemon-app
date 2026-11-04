import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import BottomNavbar from "./BottomNavbar";
import { useThemeStore } from "../../stores/useThemeStore";

describe("BottomNavbar", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders childComponent", () => {
    render(
      <BottomNavbar>
        <div>Child Component</div>
      </BottomNavbar>,
    );
    expect(screen.getByText("Child Component")).toBeInTheDocument();
  });

  it("applies the light color formatting when the application theme is light", () => {
    useThemeStore.setState({ theme: "light" });
    render(
      <BottomNavbar>
        <div>Child Component</div>
      </BottomNavbar>,
    );
    expect(screen.getByTestId("bottom-navbar")).not.toHaveClass(
      "bottom-navbar--dark",
    );
  });

  it("applies the light color formatting when the application theme is light", () => {
    useThemeStore.setState({ theme: "light" });
    render(
      <BottomNavbar>
        <div>Child Component</div>
      </BottomNavbar>,
    );
    expect(screen.getByTestId("bottom-navbar")).not.toHaveClass(
      "bottom-navbar--dark",
    );
  });
});
