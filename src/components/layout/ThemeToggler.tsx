import { selectDarkTheme, setDarkTheme } from "../../slices/themeSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const ThemeToggler = () => {
  const dispatch = useAppDispatch();
  const darkTheme = useSelector(selectDarkTheme);

  function themeToggle() {
    dispatch(setDarkTheme(!darkTheme));
  }

  useEffect(() => {
    const darkThemeInitiallyActive =
      localStorage.getItem("fishlog-theme") === "dark";
    dispatch(setDarkTheme(darkThemeInitiallyActive));
     
  });

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