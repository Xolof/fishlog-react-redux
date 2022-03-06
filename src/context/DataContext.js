import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [fishCatches, setFishCatches] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [ markerLocation, setMarkerLocation ] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    setFishCatches(data);
  }, [data]);

  useEffect(() => {
    const filteredResults = fishCatches.filter(fishCatch => {
      return ((fishCatch.species).toLowerCase()).includes(search.toLowerCase());
    });
    setSearchResults(filteredResults);
  }, [fishCatches, search]);

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
    <DataContext.Provider 
      value={
        {
          search, setSearch,
          searchResults,
          fetchError, setFetchError,
          isLoading, setIsLoading,
          fishCatches, setFishCatches,
          data, setData,
          API_URL,
          darkTheme, setDarkTheme,
          tileUrl,
          userPosition, setUserPosition,
          markerLocation, setMarkerLocation
        }
      }
    >
      {children}
    </DataContext.Provider>
  )
}

export const useApplicationContext = () => {
  return useContext(DataContext);
};