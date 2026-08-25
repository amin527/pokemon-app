import "./TopNavbar.css";
import Button from "../Button/Button";
import { useContext, useEffect, useRef, useState } from "react";
import DropDown from "../DropDown/DropDown";
import { ThemeContext } from "../../App";

function TopNavbar() {
  const [settingsDropDownIsVisible, setSettingsDropDownIsVisible] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ThemeContext)
  const TopNavbarClassName = theme == "light" ? "top-navbar" : "top-navbar dark"

  function handleDropDownVisibility() {
    if (settingsDropDownIsVisible) {
      setSettingsDropDownIsVisible(false);
    } else {
      setSettingsDropDownIsVisible(true);
    }
  }

  useEffect(() => {
    function handleClickOnScreen(event: MouseEvent) {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setSettingsDropDownIsVisible(false);
      }
    }
    window.addEventListener("click", handleClickOnScreen);
    return () => {
      window.removeEventListener("click", handleClickOnScreen);
    };
  }, []);

  return (
    <div className={TopNavbarClassName} data-testid="top-navbar-component">
      <div className="settings-container" ref={settingsRef}>
        <Button
          text="Settings"
          handleClick={() => {
            handleDropDownVisibility();
          }}
        />
        {settingsDropDownIsVisible && <DropDown setSettingsDropDownIsVisible={setSettingsDropDownIsVisible}/>}
      </div>
    </div>
  );
}
export default TopNavbar;
