import { render, screen } from "@testing-library/react"
import Button from "./Button"
import { describe, expect, it, vi } from "vitest"
import userEvent from "@testing-library/user-event";

describe("Button", ()=> {
    it("displays button text", () => {
        render(<Button handleClick={()=> {}} text={"Button Text"}/>)
        expect(screen.getByText("Button Text")).toBeInTheDocument()
    })

    it("executes the handleClick function", async()=> {
        const handleClick = vi.fn();
        const user = userEvent.setup();
        render(
            <Button
                text="ON"
                handleClick={handleClick}            
            />
        )
        await user.click(screen.getByRole("button", { name: "ON"}))
        expect(handleClick).toHaveBeenCalledTimes(1);
    })
})

