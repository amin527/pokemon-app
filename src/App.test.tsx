import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("Loads the content of the App component", () => {
    render(<App />);
    expect(screen.getByTestId("app-component-content")).toBeInTheDocument();
  });
});
