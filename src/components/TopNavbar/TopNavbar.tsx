import "./TopNavbar.css";
import { useContext, useEffect, useRef, useState } from "react";
import DropDown from "../DropDown/DropDown";
import { ThemeContext } from "../../contexts/ThemeContext";
import ButtonWithText from "../ButtonWithText/ButtonWithText";
import ButtonWithIcon from "../ButtonWithIcon/ButtonWithIcon";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { NavigationContext } from "../../contexts/NavigationContext";

function TopNavbar() {
  const [settingsDropDownIsVisible, setSettingsDropDownIsVisible] =
    useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ThemeContext);
  const { navigationHistory, navigationIndex, setNavigationIndex } =
    useContext(NavigationContext);
  const navigate = useNavigate();

  function handleDropDownVisibility() {
    if (settingsDropDownIsVisible) {
      setSettingsDropDownIsVisible(false);
    } else {
      setSettingsDropDownIsVisible(true);
    }
  }

  useEffect(() => {
    navigate(navigationHistory[navigationIndex]);
  }, [navigationIndex, navigationHistory, navigate]);

  function handleBackClick() {
    if (navigationIndex > 0) {
      setNavigationIndex(navigationIndex - 1);
    }
  }

  function handleForwardClick() {
    if (navigationIndex != navigationHistory.length - 1) {
      setNavigationIndex(navigationIndex + 1);
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
    <div
      className={`top-navbar ${theme == "light" ? "" : "top-navbar--dark"}`}
      data-testid="top-navbar"
    >
      <div className="navigation-buttons">
        <ButtonWithIcon
          data-testid="navigation-button-previous"
          className={`button-with-icon-nav ${navigationIndex == 0 ? "button-with-icon-gray" : ""}`}
          icon={<ChevronLeft />}
          handleClick={handleBackClick}
        />
        <ButtonWithIcon
          data-testid="navigation-button-next"
          className={`button-with-icon-nav ${navigationIndex == navigationHistory.length - 1 ? "button-with-icon-gray" : ""}`}
          icon={<ChevronRight />}
          handleClick={handleForwardClick}
        />
      </div>
      <div className="settings-container" ref={settingsRef}>
        <ButtonWithText
          text="Settings"
          handleClick={() => {
            handleDropDownVisibility();
          }}
        />
        {settingsDropDownIsVisible && (
          <DropDown setDropDownIsVisible={setSettingsDropDownIsVisible} />
        )}
      </div>
    </div>
  );
}
export default TopNavbar;
