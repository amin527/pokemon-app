import "./TopNavbar.css";
import { useContext, useEffect, useRef, useState } from "react";
import DropDown from "../DropDown/DropDown";
import { ThemeContext } from "../../contexts/ThemeContext";
import ButtonWithText from "../ButtonWithText/ButtonWithText";
import ButtonWithIcon from "../ButtonWithIcon/ButtonWithIcon";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation, useNavigate, useNavigationType } from "react-router";

function TopNavbar() {
  const [settingsDropDownIsVisible, setSettingsDropDownIsVisible] =
    useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ThemeContext);
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
          className={`button-with-icon-nav ${isBackDisabled ? "button-with-icon-gray" : ""}`}
          icon={<ChevronLeft />}
          handleClick={handleBackClick}
        />
        <ButtonWithIcon
          data-testid="navigation-button-next"
          className={`button-with-icon-nav ${isForwardDisabled ? "button-with-icon-gray" : ""}`}
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
