import "./ButtonWithIcon.css";
import { useThemeStore } from "../../stores/useThemeStore";

type ButtonProps = {
  icon: React.ReactNode;
  handleClick: () => void;
  className?: string;
};

function ButtonWithIcon({
  icon,
  handleClick,
  className,
  ...props
}: ButtonProps) {
  const theme = useThemeStore((store) => store.theme);

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
