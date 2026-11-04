import "./TopNavbar.css";
import { useEffect, useRef, useState } from "react";
import DropDown from "../DropDown/DropDown";
import { useThemeStore } from "../../stores/useThemeStore";
import ButtonWithText from "../ButtonWithText/ButtonWithText";
import ButtonWithIcon from "../ButtonWithIcon/ButtonWithIcon";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation, useNavigate, useNavigationType } from "react-router";

function TopNavbar() {
  const [settingsDropDownIsVisible, setSettingsDropDownIsVisible] =
    useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const theme = useThemeStore((store) => store.theme);
  const navigate = useNavigate();
  const idx: number = window.history.state?.idx ?? 0;
  const [furthestIdx, setFurthestIdx] = useState(idx);
  const location = useLocation();
  const [prevLocationKey, setPrevLocationKey] = useState(location.key);
  const isBackDisabled = idx === 0;
  const isForwardDisabled = idx === furthestIdx;
  const navigationType = useNavigationType();

  function handleDropDownVisibility() {
    if (settingsDropDownIsVisible) {
      setSettingsDropDownIsVisible(false);
    } else {
      setSettingsDropDownIsVisible(true);
    }
  }

  function handleBackClick() {
    if (!isBackDisabled) {
      navigate(-1);
    }
  }

  function handleForwardClick() {
    if (!isForwardDisabled) {
      navigate(+1);
    }
  }

  if (location.key !== prevLocationKey) {
    setPrevLocationKey(location.key);
    setFurthestIdx(
      navigationType === "PUSH" ? idx : Math.max(idx, furthestIdx),
    );
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
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSettingsDropDownIsVisible(false);
      }
    }
    window.addEventListener("click", handleClickOnScreen);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("click", handleClickOnScreen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header
      className={`top-navbar ${theme == "light" ? "" : "top-navbar--dark"}`}
      data-testid="top-navbar"
    >
      <nav className="navigation-buttons" aria-label="Page history">
        <ButtonWithIcon
          data-testid="navigation-button-previous"
          aria-label="Go back"
          aria-disabled={isBackDisabled}
          className={`button-with-icon-nav ${isBackDisabled ? "button-with-icon-gray" : ""}`}
          icon={<ChevronLeft aria-hidden="true" />}
          handleClick={handleBackClick}
        />
        <ButtonWithIcon
          data-testid="navigation-button-next"
          aria-label="Go forward"
          aria-disabled={isForwardDisabled}
          className={`button-with-icon-nav ${isForwardDisabled ? "button-with-icon-gray" : ""}`}
          icon={<ChevronRight aria-hidden="true" />}
          handleClick={handleForwardClick}
        />
      </nav>
      <div className="settings-container" ref={settingsRef}>
        <ButtonWithText
          text="Settings"
          aria-expanded={settingsDropDownIsVisible}
          handleClick={() => {
            handleDropDownVisibility();
          }}
        />
        {settingsDropDownIsVisible && (
          <DropDown setDropDownIsVisible={setSettingsDropDownIsVisible} />
        )}
      </div>
    </header>
  );
}
export default TopNavbar;
