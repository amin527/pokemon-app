import { useContext } from "react";
import "./Button.css";
import { ThemeContext } from "../../contexts/ThemeContext";

type ButtonProps = {
  text: string;
  handleClick: () => void;
};

function Button({ text, handleClick }: ButtonProps) {
  const { theme } = useContext(ThemeContext);
  return (
    <button
      className={`button ${theme == "light" ? "" : "button--dark"}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
export default Button;
