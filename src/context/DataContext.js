import { createContext, useContext, useState, useEffect } from "react";
import getTodaysDate from "../services/getTodaysDate";

const DataContext = createContext({});

const maxWeightFilter = 10000;
const maxLengthFilter = 500;

const todaysDate = getTodaysDate();

export const DataProvider = ({ children }) => {
  const [fishCatches, setFishCatches] = useState([]);
  const [filterOnSpecies, setFilterOnSpecies] = useState("");
  const [filterOnUser, setFilterOnUser] = useState("");
  const [filterOnWeight, setFilterOnWeight] = useState({
    min: 0,
    max: maxWeightFilter,
  });
  const [filterOnLength, setFilterOnLength] = useState({
    min: 0,
    max: maxLengthFilter,
  });
  const [filterOnDateFrom, setFilterOnDateFrom] = useState("1970-01-01");
  const [filterOnDateTo, setFilterOnDateTo] = useState(todaysDate);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [markerLocation, setMarkerLocation] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    setFishCatches(data);
  }, [data]);

  useEffect(() => {
    let filteredResults = fishCatches.filter((fishCatch) => {
      return (
        fishCatch.species
          .toLowerCase()
          .includes(filterOnSpecies.toLowerCase()) &&
        fishCatch.username.toLowerCase().includes(filterOnUser.toLowerCase()) &&
        fishCatch.weight > filterOnWeight.min &&
        fishCatch.length > filterOnLength.min
      );
    });

    switch (sortBy) {
    case "species":
    case "username":
      filteredResults.sort((a, b) => {
        if (sortOrder === "DESC") {
          const stringA = a[sortBy].toUpperCase();
          const stringB = b[sortBy].toUpperCase();
          if (stringA < stringB) {
            return -1;
          }
          if (stringA > stringB) {
            return 1;
          }
          return 0;
        }
        if (sortOrder === "ASC") {
          const stringA = a[sortBy].toUpperCase();
          const stringB = b[sortBy].toUpperCase();
          if (stringA > stringB) {
            return -1;
          }
          if (stringA < stringB) {
            return 1;
          }
          return 0;
        }
      });
      break;
    case "weight":
    case "length":
      filteredResults.sort((a, b) => {
        if (sortOrder === "DESC") {
          return parseInt(b[sortBy]) - parseInt(a[sortBy]);
        }
        if (sortOrder === "ASC") {
          return parseInt(a[sortBy]) - parseInt(b[sortBy]);
        }
      });
      break;
    case "date":
      filteredResults.sort((a, b) => {
        const aTime = new Date(a[sortBy]).getTime();
        const bTime = new Date(b[sortBy]).getTime();
        if (sortOrder === "DESC") {
          return parseInt(bTime) - parseInt(aTime);
        }
        if (sortOrder === "ASC") {
          return parseInt(aTime) - parseInt(bTime);
        }
      });
      break;
    }

    if (filterOnDateFrom !== "") {
      filteredResults = filteredResults.filter((fishCatch) => {
        return fishCatch.date >= filterOnDateFrom;
      });
    }

    if (filterOnDateTo !== "") {
      filteredResults = filteredResults.filter((fishCatch) => {
        return fishCatch.date <= filterOnDateTo;
      });
    }

    if (filterOnWeight.max < maxWeightFilter) {
      filteredResults = filteredResults.filter((fishCatch) => {
        return fishCatch.weight < filterOnWeight.max;
      });
    }

    if (filterOnLength.max < maxLengthFilter) {
      filteredResults = filteredResults.filter((fishCatch) => {
        return fishCatch.length < filterOnLength.max;
      });
    }
    setSearchResults(filteredResults);
  }, [
    fishCatches,
    filterOnSpecies,
    filterOnUser,
    filterOnWeight,
    filterOnLength,
    filterOnDateFrom,
    filterOnDateTo,
    sortBy,
    sortOrder,
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
        filterOnDateFrom,
        setFilterOnDateFrom,
        filterOnDateTo,
        setFilterOnDateTo,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useApplicationContext = () => {
  return useContext(DataContext);
};
