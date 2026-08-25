import { useContext } from "react";
import Button from "../Button/Button";
import "./DropDown.css";
import { ThemeContext } from "../../App";

function DropDown() {

  const { theme, setTheme } = useContext(ThemeContext) 

  return (
    <div className="drop-down" data-testid="drop-down-component">
      <div className="theme-options-container">
        <div className="">THEME OPTIONS</div>
        <div className="theme-options">
            <Button text="Dark" handleClick={() => {setTheme("dark")}} />  
            <Button text="Light" handleClick={() => {setTheme("light")}} />
        </div>
      </div>
    </div>
  )
}
export default DropDown;
