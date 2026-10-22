import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./NotFound.css";
import { Link } from "react-router";

function NotFound() {
  const { theme } = useContext(ThemeContext);
  const notFoundClassName =
    theme === "dark"
      ? "not-found not-found--dark"
      : "not-found not-found--light";
  const homeButtonClassName =
    theme === "dark"
      ? "back-to-home-button back-to-home-button--dark"
      : "back-to-home-button back-to-home-button--light";
  const notFoundMessageClassName =
    theme === "dark"
      ? "not-found-message not-found-message--dark"
      : "not-found-message not-found-message--light";
  return (
    <div className={notFoundClassName}>
      <div className={notFoundMessageClassName}>404: Page Not Found</div>
      <Link className={homeButtonClassName} to="/">
        Take me Home
      </Link>
    </div>
  );
}
export default NotFound;
