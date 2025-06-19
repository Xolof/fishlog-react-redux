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
    const darkThemeInitiallyActive =
      localStorage.getItem("fishlog-theme") === "dark" ? true : false;
    dispatch(setDarkTheme(darkThemeInitiallyActive));
  }, []);

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
