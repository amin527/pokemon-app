import { useContext } from "react";
import "./Button.css";
import { ThemeContext } from "../../App";

type ButtonProps = {
  text: string;
  handleClick: () => void;
};

function Button({ text, handleClick }: ButtonProps) {
  const { theme } = useContext(ThemeContext)
  const ButtonClassName = theme == "light" ? "button" : "button dark"
  return (
    <button className={ButtonClassName} onClick={handleClick}>
      {text}
    </button>
  );
}
export default Button;
