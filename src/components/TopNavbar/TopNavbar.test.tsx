import { describe, expect, it } from "vitest"
import TopNavbar from "./TopNavbar"
import { render, screen } from "@testing-library/react"

describe("TopNavbar", ()=> {
    it("Displays children component", ()=> {
        render(<TopNavbar><div>Child Component</div></TopNavbar>)
        expect(screen.getByText("Child Component")).toBeInTheDocument()
    })
})