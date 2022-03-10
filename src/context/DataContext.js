import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [fishCatches, setFishCatches] = useState([]);
  const [filterOnSpecies, setFilterOnSpecies] = useState("");
  const [filterOnUser, setFilterOnUser] = useState("");
  const [filterOnWeight, setFilterOnWeight] = useState({ min: 0, max: 10000 });
  const [filterOnLength, setFilterOnLength] = useState({ min: 0, max: 500 });
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
    const filteredResults = fishCatches.filter((fishCatch) => {
      return (
        fishCatch.species
          .toLowerCase()
          .includes(filterOnSpecies.toLowerCase()) &&
        fishCatch.username.toLowerCase().includes(filterOnUser.toLowerCase()) &&
        fishCatch.weight > filterOnWeight.min &&
        fishCatch.weight < filterOnWeight.max &&
        fishCatch.length > filterOnLength.min &&
        fishCatch.length < filterOnLength.max
      );
    });
    setSearchResults(filteredResults);
  }, [
    fishCatches,
    filterOnSpecies,
    filterOnUser,
    filterOnWeight,
    filterOnLength,
  ]);

  return (
    <DataContext.Provider
      value={{
        filterOnSpecies,
        setFilterOnSpecies,
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
