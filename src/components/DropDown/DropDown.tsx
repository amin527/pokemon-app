import { useContext } from "react";
import Button from "../Button/Button";
import "./DropDown.css";
import { ThemeContext } from "../../App";

type DropDownProps = { 
  setSettingsDropDownIsVisible: (value: boolean) => void;
}

function DropDown({ setSettingsDropDownIsVisible }: DropDownProps) {

  
  const { theme, setTheme } = useContext(ThemeContext) 
  const DropDownClassName = theme == "light" ? "drop-down" : "drop-down dark" 
  function applyDarkTheme() {
    setTheme("dark"); 
    setSettingsDropDownIsVisible(false);
    localStorage.setItem("theme", "dark")
  }
  function applyLightTheme() {
    setTheme("light"); 
    setSettingsDropDownIsVisible(false);
    localStorage.setItem("theme", "light")
  }
  return (
    <div className={DropDownClassName} data-testid="drop-down-component">
      <div className="theme-options-container">
        <div className="">THEME OPTIONS</div>
        <div className="theme-options">
            <Button text="Dark" handleClick={applyDarkTheme} />  
            <Button text="Light" handleClick={applyLightTheme} />
        </div>
      </div>
    </div>
  )
}
export default DropDown;
