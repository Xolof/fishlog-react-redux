import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [fishCatches, setFishCatches] = useState([]);
  const [search, setSearch] = useState("");
  const [filterOnUser, setFilterOnUser] = useState("");
  const [filterOnWeight, setFilterOnWeight] = useState([0, 5000]);
  const [filterOnLength, setFilterOnLength] = useState([0, 500]);
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [markerLocation, setMarkerLocation] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    setFishCatches(data);
  }, [data]);

  useEffect(() => {
    // Chaina med &&
    const filteredResults = fishCatches
      .filter((fishCatch) => {
        return fishCatch.species.toLowerCase().includes(search.toLowerCase());
      })
      .filter((fishCatch) => {
        return fishCatch.username
          .toLowerCase()
          .includes(filterOnUser.toLowerCase());
      })
      .filter((fishCatch) => {
        return (
          fishCatch.weight > filterOnWeight[0] &&
          fishCatch.weight < filterOnWeight[1]
        );
      })
      .filter((fishCatch) => {
        return (
          fishCatch.length > filterOnLength[0] &&
          fishCatch.length < filterOnLength[1]
        );
      });
    setSearchResults(filteredResults);
  }, [fishCatches, search, filterOnUser, filterOnWeight, filterOnLength]);

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        fetchError,
        setFetchError,
        isLoading,
        setIsLoading,
        fishCatches,
        setFishCatches,
        data,
        setData,
        API_URL,
        userPosition,
        setUserPosition,
        markerLocation,
        setMarkerLocation,
        filterOnUser,
        setFilterOnUser,
        filterOnWeight,
        setFilterOnWeight,
        filterOnLength,
        setFilterOnLength,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useApplicationContext = () => {
  return useContext(DataContext);
};
