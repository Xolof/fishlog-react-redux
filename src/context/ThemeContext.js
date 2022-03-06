import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({});

export const ThemeDataProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(localStorage.getItem("fishlog-theme") === "dark" ? true : false);

  useEffect(() => {
    const root = document.documentElement;
  
    root?.style.setProperty(
      "--first-color",
      darkTheme ? "#feffdf" : "#262833"
    );
  
    root?.style.setProperty(
      "--third-color",
      darkTheme ? "#97cba9" : "#404040"
    );
  
    root?.style.setProperty(
      "--fourth-color",
      darkTheme ? "#262833" : "#fff"
    );

    localStorage.setItem("fishlog-theme", darkTheme ? "dark" : "light");
  }, [darkTheme]);

  const lightTileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const darkTileUrl = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
  const [tileUrl, setTileUrl] = useState(darkTheme ? darkTileUrl : lightTileUrl);

  useEffect(() => {
    setTileUrl(darkTheme ? darkTileUrl : lightTileUrl);
    const root = document.documentElement;
    root?.style.setProperty(
      "--map-tiles-filter",
      darkTheme ? "brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7)" : "none"
    );

  }, [darkTheme]);

  return (
    <ThemeContext.Provider 
      value={
        {
          darkTheme, setDarkTheme,
          tileUrl,
        }
      }
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  return useContext(ThemeContext);
};