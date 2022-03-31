import { createSlice } from "@reduxjs/toolkit";

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

export const selectFilterOnSpecies = (state) => {
  return state.data.filterOnSpecies;
};
export const selectSearchResults = (state) => {
  const fishCatches = state.data.fishCatches;

  let filteredResults = fishCatches.filter((fishCatch) => {
    return (
      fishCatch.species
        .toLowerCase()
        .includes(state.data.filterOnSpecies.toLowerCase()) &&
      fishCatch.username
        .toLowerCase()
        .includes(state.data.filterOnUser.toLowerCase()) &&
      fishCatch.weight > state.data.filterOnWeightMin &&
      fishCatch.length > state.data.filterOnLengthMin
    );
  });

  switch (state.data.sortBy) {
  case "species":
  case "username":
    filteredResults.sort((a, b) => {
      if (state.data.sortOrder === "DESC") {
        const stringA = a[state.data.sortBy].toUpperCase();
        const stringB = b[state.data.sortBy].toUpperCase();
        if (stringA < stringB) {
          return -1;
        }
        if (stringA > stringB) {
          return 1;
        }
        return 0;
      }
      if (state.data.sortOrder === "ASC") {
        const stringA = a[state.data.sortBy].toUpperCase();
        const stringB = b[state.data.sortBy].toUpperCase();
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
      if (state.data.sortOrder === "DESC") {
        return (
          parseInt(b[state.data.sortBy]) - parseInt(a[state.data.sortBy])
        );
      }
      if (state.data.sortOrder === "ASC") {
        return (
          parseInt(a[state.data.sortBy]) - parseInt(b[state.data.sortBy])
        );
      }
    });
    break;
  case "date":
    filteredResults.sort((a, b) => {
      const aTime = new Date(a[state.data.sortBy]).getTime();
      const bTime = new Date(b[state.data.sortBy]).getTime();
      if (state.data.sortOrder === "DESC") {
        return parseInt(bTime) - parseInt(aTime);
      }
      if (state.data.sortOrder === "ASC") {
        return parseInt(aTime) - parseInt(bTime);
      }
    });
    break;
  }

  if (state.data.filterOnDateFrom !== "") {
    filteredResults = filteredResults.filter((fishCatch) => {
      return fishCatch.date >= state.data.filterOnDateFrom;
    });
  }

  if (state.data.filterOnDateTo !== "") {
    filteredResults = filteredResults.filter((fishCatch) => {
      return fishCatch.date <= state.data.filterOnDateTo;
    });
  }

  if (state.data.filterOnWeightMax < maxWeightFilter) {
    filteredResults = filteredResults.filter((fishCatch) => {
      return fishCatch.weight < state.data.filterOnWeightMax;
    });
  }

  if (state.data.filterOnLengthMax < maxLengthFilter) {
    filteredResults = filteredResults.filter((fishCatch) => {
      return fishCatch.length < state.data.filterOnLengthMax;
    });
  }

  return filteredResults;
};
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
