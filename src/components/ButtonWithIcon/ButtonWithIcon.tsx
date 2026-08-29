import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./ButtonWithIcon.css";

type ButtonProps = {
  icon: React.ReactNode;
  handleClick: () => void;
  className?: string;
};

function ButtonWithIcon({ icon, handleClick, className, ...props }: ButtonProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      {...props}
      className={`button-with-icon ${theme == "light" ? "" : "button-with-icon--dark"} ${className} `}
      onClick={handleClick}
    >
      {icon}
    </button>
  );
}
export default ButtonWithIcon;
