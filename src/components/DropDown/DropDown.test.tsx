import { describe, expect, it } from "vitest"
import DropDown from "./DropDown"
import { render, screen } from "@testing-library/react"

describe("DropDown", ()=>{
    it("displays dropdown component", ()=> {
        render(<DropDown/>)
        expect(screen.getByTestId("drop-down-component")).toBeInTheDocument()
    })
})