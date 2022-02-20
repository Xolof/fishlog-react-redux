const ThemeToggler = ({ darkTheme, setDarkTheme }) => {
    function themeToggle () {
        setDarkTheme(!darkTheme);
    }

    return (
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
    )
}

export default ThemeToggler;
