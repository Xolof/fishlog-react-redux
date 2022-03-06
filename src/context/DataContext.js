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