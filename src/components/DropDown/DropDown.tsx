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

  return (
    <div className={DropDownClassName} data-testid="drop-down-component">
      <div className="theme-options-container">
        <div className="">THEME OPTIONS</div>
        <div className="theme-options">
            <Button text="Dark" handleClick={() => {setTheme("dark"); setSettingsDropDownIsVisible(false);}} />  
            <Button text="Light" handleClick={() => {setTheme("light"); setSettingsDropDownIsVisible(false); }} />
        </div>
      </div>
    </div>
  )
}
export default DropDown;
