import { useContext } from "react";
import "./BottomNavbar.css";
import { ThemeContext } from "../../App";

type BottomNavbarProps = {
  children: React.ReactNode;
};

function BottomNavbar({ children }: BottomNavbarProps) {

  const { theme } = useContext(ThemeContext)
  const bottomNavbarClassName = theme == "light" ? "bottom-navbar" : "bottom-navbar dark"
  
  return <div className={bottomNavbarClassName}>{children}</div>;
}
export default BottomNavbar;
