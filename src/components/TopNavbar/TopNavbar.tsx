import type { ReactNode } from "react";
import "./TopNavbar.css"

type TopNavbarProps = {
    children: ReactNode
}

function TopNavbar({ children }: TopNavbarProps){

    return(
        <div className="top-navbar">
            { children }
        </div>
    )
}
export default TopNavbar;