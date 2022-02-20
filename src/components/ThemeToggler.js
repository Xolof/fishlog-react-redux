import { useContext } from "react";
import DataContext from "../context/DataContext";

const ThemeToggler = () => {
    const { darkTheme, setDarkTheme } = useContext(DataContext);

    function themeToggle () {
        setDarkTheme(!darkTheme);
    }

    return (
        <div className="themeToggler">
          <div
            className="themeToggleContainer"
            onClick={themeToggle}
          >
            <div
              className={darkTheme ? "themeToggleButton right" : "themeToggleButton left"}
              style={{
                backgroundColor: darkTheme ? "ghostwhite" : "gold"
              }}
            ></div>
          </div>
        </div>
    )
}

export default ThemeToggler;
