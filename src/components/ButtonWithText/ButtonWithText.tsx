import "./ButtonWithText.css";
import { useThemeStore } from "../../stores/useThemeStore";

type ButtonProps = {
  text: string;
  handleClick: () => void;
};

function ButtonWithText({ text, handleClick, ...props }: ButtonProps) {
  const theme = useThemeStore((store) => store.theme);
  return (
    <button
      {...props}
      className={`button-with-text ${theme == "light" ? "" : "button-with-text--dark"}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
export default ButtonWithText;
