import { useContext } from "react";
import "./ButtonWithIcon.css";
import { ThemeContext } from "../../contexts/ThemeContext";

type ButtonProps = {
  icon: React.ReactNode;
  handleClick: () => void;
};

function ButtonWithIcon({ icon, handleClick }: ButtonProps) {
  const { theme } = useContext(ThemeContext);
  return (
    <button
      className={`button-with-icon ${theme == "light" ? "" : "button-with-icon--dark"}`}
      onClick={handleClick}
    >
      {icon}
    </button>
  );
}
export default ButtonWithIcon;
