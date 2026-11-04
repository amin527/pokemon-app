import { useThemeStore } from "../../stores/useThemeStore";
import ButtonWithText from "../ButtonWithText/ButtonWithText";
import "./DropDown.css";

type DropDownProps = {
  setDropDownIsVisible: (value: boolean) => void;
};

function DropDown({ setDropDownIsVisible }: DropDownProps) {
  const theme = useThemeStore((store) => store.theme);
  const setTheme = useThemeStore((store) => store.setTheme);

  function applyDarkTheme() {
    setTheme("dark");
    setDropDownIsVisible(false);
  }
  function applyLightTheme() {
    setTheme("light");
    setDropDownIsVisible(false);
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
