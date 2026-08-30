import { useContext } from "react";
import ButtonWithText from "../ButtonWithText/ButtonWithText";
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
          <ButtonWithText text="Dark" handleClick={applyDarkTheme} />
          <ButtonWithText text="Light" handleClick={applyLightTheme} />
        </div>
      </div>
    </div>
  );
}
export default DropDown;
