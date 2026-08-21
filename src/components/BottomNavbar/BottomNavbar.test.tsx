import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BottomNavbar from "./BottomNavbar";

describe("BottomNavbar", () => {
    it("renders childComponent", () => {
        render(
            <BottomNavbar>
                <div>Child Component</div>
            </BottomNavbar>
        );

        expect(screen.getByText("Child Component")).toBeInTheDocument();
    });
});