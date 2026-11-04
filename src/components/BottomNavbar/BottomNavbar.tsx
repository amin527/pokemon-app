import "./BottomNavbar.css";
import { useThemeStore } from "../../stores/useThemeStore";

type BottomNavbarProps = {
  children: React.ReactNode;
};

function BottomNavbar({ children }: BottomNavbarProps) {
  const theme = useThemeStore((store) => store.theme);

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
