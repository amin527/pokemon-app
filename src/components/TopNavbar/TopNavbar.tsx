import "./TopNavbar.css";
import Button from "../Button/Button";
import { useEffect, useRef, useState } from "react";
import DropDown from "../DropDown/DropDown";

function TopNavbar() {
  const [settingsDropDownIsVisible, setSettingsDropDownIsVisible] =
    useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  function handleDropDownVisibility() {
    if (settingsDropDownIsVisible) {
      setSettingsDropDownIsVisible(false);
    } else {
      setSettingsDropDownIsVisible(true);
    }
  }

  useEffect(() => {
    function handleClickOnScreen(event: MouseEvent) {
      console.log(settingsRef.current);
      console.log(event.target as Node);
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
    <div className="top-navbar" data-testid="top-navbar-component">
      <div className="settings-container" ref={settingsRef}>
        <Button
          text="Settings"
          handleClick={() => {
            handleDropDownVisibility();
          }}
        />
        {settingsDropDownIsVisible && <DropDown />}
      </div>
    </div>
  );
}
export default TopNavbar;
