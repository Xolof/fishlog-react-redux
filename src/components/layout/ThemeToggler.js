import { useThemeContext } from "../../context/ThemeContext";

const ThemeToggler = () => {
  const { darkTheme, setDarkTheme } = useThemeContext();

  function themeToggle() {
    setDarkTheme(!darkTheme);
  }

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
