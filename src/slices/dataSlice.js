import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const maxWeightFilter = 10000;
const maxLengthFilter = 500;
const initialState = {
  filterOnSpecies: "",
  searchResults: [],
  fetchError: null,
  isLoading: true,
  fishCatches: [],
  filterOnUser: "",
  filterOnWeightMin: 0,
  filterOnWeightMax: maxWeightFilter,
  filterOnLengthMin: 0,
  filterOnLengthMax: maxLengthFilter,
  filterOnDateFrom: "",
  filterOnDateTo: "",
  sortBy: "date",
  sortOrder: "DESC",
  API_URL: process.env.REACT_APP_API_URL,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setFilterOnSpecies: (state, action) => {
      state.filterOnSpecies = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setFetchError: (state, action) => {
      state.fetchError = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setFishCatches: (state, action) => {
      state.fishCatches = action.payload;
    },
    setFilterOnUser: (state, action) => {
      state.filterOnUser = action.payload;
    },
    setFilterOnWeightMin: (state, action) => {
      state.filterOnWeightMin = action.payload;
    },
    setFilterOnWeightMax: (state, action) => {
      state.filterOnWeightMax = action.payload;
    },
    setFilterOnLengthMin: (state, action) => {
      state.filterOnLengthMin = action.payload;
    },
    setFilterOnLengthMax: (state, action) => {
      state.filterOnLengthMax = action.payload;
    },
    setFilterOnDateFrom: (state, action) => {
      state.filterOnDateFrom = action.payload;
    },
    setFilterOnDateTo: (state, action) => {
      state.filterOnDateTo = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
});

export const {
  setFilterOnSpecies,
  setSearchResults,
  setFetchError,
  setIsLoading,
  setFishCatches,
  setFilterOnUser,
  setFilterOnWeightMin,
  setFilterOnWeightMax,
  setFilterOnLengthMin,
  setFilterOnLengthMax,
  setFilterOnDateFrom,
  setFilterOnDateTo,
  setSortBy,
  setSortOrder,
} = dataSlice.actions;

export const selectSearchResults = (state) => {
  const fishCatches = state.data.fishCatches;
  return fishCatches;
};

export const selectSearchResultsSelector = createSelector(
  [
    selectSearchResults,
    (state) => state.data.filterOnSpecies,
    (state) => state.data.filterOnUser,
    (state) => state.data.filterOnWeightMin,
    (state) => state.data.filterOnWeightMax,
    (state) => state.data.filterOnLengthMin,
    (state) => state.data.filterOnLengthMax,
    (state) => state.data.filterOnDateFrom,
    (state) => state.data.filterOnDateTo,
    (state) => state.data.sortBy,
    (state) => state.data.sortOrder
  ],
  (
    fishCatches,
    filterOnSpecies,
    filterOnUser,
    filterOnWeightMin,
    filterOnWeightMax,
    filterOnLengthMin,
    filterOnLengthMax,
    filterOnDateFrom,
    filterOnDateTo,
    sortBy,
    sortOrder
  ) => {
    let filteredResults = fishCatches.filter((fishCatch) => {
      return (
        fishCatch.species
          .toLowerCase()
          .includes(filterOnSpecies.toLowerCase()) &&
        fishCatch.username
          .toLowerCase()
          .includes(filterOnUser.toLowerCase()) &&
        fishCatch.weight > filterOnWeightMin &&
        fishCatch.length > filterOnLengthMin
      );
    });

    if (sortBy === "username" || sortBy === "species") {
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
    }

    if (sortBy === "length" || sortBy === "weight") {
      filteredResults.sort((a, b) => {
        if (sortOrder === "DESC") {
          return (
            parseInt(b[sortBy]) - parseInt(a[sortBy])
          );
        }
        if (sortOrder === "ASC") {
          return (
            parseInt(a[sortBy]) - parseInt(b[sortBy])
          );
        }
      });

    }

    if (sortBy === "date") {
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

    if (filterOnWeightMax < maxWeightFilter) {
      filteredResults = filteredResults.filter((fishCatch) => {
        return fishCatch.weight < filterOnWeightMax;
      });
    }

    if (filterOnLengthMax < maxLengthFilter) {
      filteredResults = filteredResults.filter((fishCatch) => {
        return fishCatch.length < filterOnLengthMax;
      });
    }
    return filteredResults;
  }
);

export const selectFetchError = (state) => {
  return state.data.fetchError;
};

export const selectIsLoading = (state) => {
  return state.data.isLoading;
};

export const selectFishCatches = (state) => {
  return state.data.fishCatches;
};

export const selectFilterOnUser = (state) => {
  return state.data.filterOnUser;
};

export const selectFilterOnSpecies = (state) => {
  return state.data.filterOnSpecies;
};

export const selectFilterOnWeightMin = (state) => {
  return state.data.filterOnWeightMin;
};

export const selectFilterOnWeightMax = (state) => {
  return state.data.filterOnWeightMax;
};

export const selectFilterOnLengthMin = (state) => {
  return state.data.filterOnLengthMin;
};

export const selectFilterOnLengthMax = (state) => {
  return state.data.filterOnLengthMax;
};

export const selectFilterOnDateFrom = (state) => {
  return state.data.filterOnDateFrom;
};

export const selectFilterOnDateTo = (state) => {
  return state.data.filterOnDateTo;
};

export const selectSortBy = (state) => {
  return state.data.sortBy;
};

export const selectSortOrder = (state) => {
  return state.data.sortOrder;
};

export const selectAPI_URL = (state) => {
  return state.data.API_URL;
};

export default dataSlice.reducer;
