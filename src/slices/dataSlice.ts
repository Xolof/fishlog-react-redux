import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { AppState } from "../types/AppState";
import { FishCatch } from "../types/FishCatch";

const MAX_WEIGHT_FILTER = 10000;
const MAX_LENGTH_FILTER = 500;
const initialState = {
  filterOnSpecies: "",
  searchResults: [],
  fishCatches: [],
  filterOnUser: "",
  filterOnWeightMin: 0,
  filterOnWeightMax: MAX_WEIGHT_FILTER,
  filterOnLengthMin: 0,
  filterOnLengthMax: MAX_LENGTH_FILTER,
  filterOnDateFrom: "",
  filterOnDateTo: "",
  sortBy: "date",
  sortOrder: "DESC",
  API_URL: import.meta.env.VITE_API_URL,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setFilterOnSpecies: (state, action) => {
      state.filterOnSpecies = action.payload;
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

export const selectSearchResults = (state: AppState) => {
  const fishCatches = state.data.fishCatches;
  return fishCatches;
};

type SortableFieldsUserOrSpecies = "username" | "species";
type SortOrder = "ASC" | "DESC";

function sortFishCatchesByUserOrSpecies(
  filteredResults: FishCatch[],
  sortBy: SortableFieldsUserOrSpecies,
  sortOrder: SortOrder
) {
  filteredResults.sort((a, b) => {
    const stringA = a[sortBy].toUpperCase();
    const stringB = b[sortBy].toUpperCase();

    if (sortOrder === "ASC") {
      return stringA.localeCompare(stringB);
    } else if (sortOrder === "DESC") {
      return stringB.localeCompare(stringA);
    }
    return 0;
  });
}

type SortableFieldsLengthOrWeight = "length" | "weight";

function sortFishCatchesByLengthOrWeight(
  filteredResults: FishCatch[],
  sortBy: SortableFieldsLengthOrWeight,
  sortOrder: SortOrder
) {
  filteredResults.sort((a: FishCatch, b: FishCatch) => {
    if (sortOrder === "DESC") {
      return b[sortBy] - a[sortBy];
    }
    if (sortOrder === "ASC") {
      return a[sortBy] - b[sortBy];
    }
    return 0;
  });
}

function sortFishCatchesByDate(
  filteredResults: FishCatch[],
  sortOrder: SortOrder
) {
  filteredResults.sort((a: FishCatch, b: FishCatch) => {
    const aTime = new Date(a["date"]).getTime();
    const bTime = new Date(b["date"]).getTime();
    if (sortOrder === "DESC") {
      return bTime - aTime;
    }
    if (sortOrder === "ASC") {
      return aTime - bTime;
    }
    return 0;
  });
}

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
    (state) => state.data.sortOrder,
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
        fishCatch.username.toLowerCase().includes(filterOnUser.toLowerCase()) &&
        fishCatch.weight > filterOnWeightMin &&
        fishCatch.length > filterOnLengthMin
      );
    });

    if (sortBy === "username" || sortBy === "species") {
      sortFishCatchesByUserOrSpecies(filteredResults, sortBy, sortOrder);
    }

    if (sortBy === "length" || sortBy === "weight") {
      sortFishCatchesByLengthOrWeight(filteredResults, sortBy, sortOrder);
    }

    if (sortBy === "date") {
      sortFishCatchesByDate(filteredResults, sortOrder);
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

    if (filterOnWeightMax < MAX_WEIGHT_FILTER) {
      filteredResults = filteredResults.filter((fishCatch) => {
        return fishCatch.weight < filterOnWeightMax;
      });
    }

    if (filterOnLengthMax < MAX_LENGTH_FILTER) {
      filteredResults = filteredResults.filter((fishCatch) => {
        return fishCatch.length < filterOnLengthMax;
      });
    }
    return filteredResults;
  }
);

export const selectFishCatches = (state: AppState) => {
  return state.data.fishCatches;
};

export const selectFilterOnUser = (state: AppState) => {
  return state.data.filterOnUser;
};

export const selectFilterOnSpecies = (state: AppState) => {
  return state.data.filterOnSpecies;
};

export const selectFilterOnWeightMin = (state: AppState) => {
  return state.data.filterOnWeightMin;
};

export const selectFilterOnWeightMax = (state: AppState) => {
  return state.data.filterOnWeightMax;
};

export const selectFilterOnLengthMin = (state: AppState) => {
  return state.data.filterOnLengthMin;
};

export const selectFilterOnLengthMax = (state: AppState) => {
  return state.data.filterOnLengthMax;
};

export const selectFilterOnDateFrom = (state: AppState) => {
  return state.data.filterOnDateFrom;
};

export const selectFilterOnDateTo = (state: AppState) => {
  return state.data.filterOnDateTo;
};

export const selectSortBy = (state: AppState) => {
  return state.data.sortBy;
};

export const selectSortOrder = (state: AppState) => {
  return state.data.sortOrder;
};

export const selectAPI_URL = (state: AppState) => {
  return state.data.API_URL;
};

export default dataSlice.reducer;
