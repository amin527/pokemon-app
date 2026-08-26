import { useContext } from "react";
import Button from "../Button/Button";
import "./DropDown.css";
import { ThemeContext } from "../../contexts/ThemeContext";

type DropDownProps = {
  setDropDownIsVisible: (value: boolean) => void;
};

function DropDown({ setDropDownIsVisible }: DropDownProps) {
  const { theme, setTheme } = useContext(ThemeContext);
  function applyDarkTheme() {
    setTheme("dark");
    setDropDownIsVisible(false);
    localStorage.setItem("theme", "dark");
  }
  function applyLightTheme() {
    setTheme("light");
    setDropDownIsVisible(false);
    localStorage.setItem("theme", "light");
  }
  return (
    <div
      className={`drop-down ${theme == "light" ? "" : "drop-down--dark"}`}
      data-testid="drop-down"
    >
      <div className="theme-options-container">
        <div className="">THEME OPTIONS</div>
        <div className="theme-options">
          <Button text="Dark" handleClick={applyDarkTheme} />
          <Button text="Light" handleClick={applyLightTheme} />
        </div>
      </div>
    </div>
  );
}
export default DropDown;
