import { useId } from "react";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../../stores/useThemeStore";
import "./DropDown.css";

type DropDownProps = {
  setDropDownIsVisible: (value: boolean) => void;
};

function DropDown({ setDropDownIsVisible }: DropDownProps) {
  const theme = useThemeStore((store) => store.theme);
  const setTheme = useThemeStore((store) => store.setTheme);
  const labelId = useId();

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
      <div id={labelId} className="drop-down__label">
        Theme
      </div>
      <div className="theme-options" role="group" aria-labelledby={labelId}>
        <button
          type="button"
          className="theme-option"
          aria-pressed={theme === "light"}
          onClick={applyLightTheme}
        >
          <Sun size={16} aria-hidden="true" />
          Light
        </button>
        <button
          type="button"
          className="theme-option"
          aria-pressed={theme === "dark"}
          onClick={applyDarkTheme}
        >
          <Moon size={16} aria-hidden="true" />
          Dark
        </button>
      </div>
    </div>
  );
}
export default DropDown;
