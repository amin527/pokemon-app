import { useContext } from "react";
import "./BottomNavbar.css";
import { ThemeContext } from "../../contexts/ThemeContext";

type BottomNavbarProps = {
  children: React.ReactNode;
};

function BottomNavbar({ children }: BottomNavbarProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`bottom-navbar ${theme == "light" ? "" : "bottom-navbar--dark"}`}
      data-testid="bottom-navbar"
    >
      {children}
    </div>
  );
}
export default BottomNavbar;
