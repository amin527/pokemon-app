import { describe, expect, it } from "vitest"
import TopNavbar from "./TopNavbar"
import { render, screen } from "@testing-library/react"

describe("TopNavbar", ()=> {
    it("Displays navbar component", ()=> {
        render(<TopNavbar/>)
        expect(screen.getByTestId("top-navbar-component")).toBeInTheDocument()
    })
})