import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../types/AppState";

const initialState = {
  fetchError: null,
  isLoading: true,
};

export const fetchStatusSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setFetchError: (state, action) => {
      state.fetchError = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setFetchError,
  setIsLoading,
} = fetchStatusSlice.actions;

export const selectFetchError = (state: AppState) => {
  return state.data.fetchError;
};

export const selectIsLoading = (state: AppState) => {
  return state.data.isLoading;
};

export default fetchStatusSlice.reducer;
