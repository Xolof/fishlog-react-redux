import { selectDarkTheme, setDarkTheme } from "../../slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const ThemeToggler = () => {
  const dispatch = useDispatch();

  const darkTheme = useSelector(selectDarkTheme);

  function themeToggle() {
    dispatch(setDarkTheme(!darkTheme));
  }

  useEffect(() => {
    const root = document.documentElement;

    root?.style.setProperty("--first-color", darkTheme ? "#feffdf" : "#262833");

    root?.style.setProperty("--third-color", darkTheme ? "#97cba9" : "#404040");

    root?.style.setProperty("--fourth-color", darkTheme ? "#262833" : "#fff");

    localStorage.setItem("fishlog-theme", darkTheme ? "dark" : "light");
  }, [darkTheme]);

  return (
    <div className="themeToggler">
      <button className="themeToggleContainer" onClick={themeToggle}>
        <div
          className={
            darkTheme ? "themeToggleButton right" : "themeToggleButton left"
          }
          style={{
            backgroundColor: darkTheme ? "ghostwhite" : "gold",
          }}
        ></div>
      </button>
    </div>
  );
};

export default ThemeToggler;
