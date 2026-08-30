import { useContext } from "react";
import "./ButtonWithText.css";
import { ThemeContext } from "../../contexts/ThemeContext";

type ButtonProps = {
  text: string;
  handleClick: () => void;
};

function ButtonWithText({ text, handleClick }: ButtonProps) {
  const { theme } = useContext(ThemeContext);
  return (
    <button
      className={`button-with-text ${theme == "light" ? "" : "button-with-text--dark"}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
export default ButtonWithText;
