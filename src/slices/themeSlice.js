import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  darkTheme: localStorage.getItem("fishlog-theme") === "dark" ? true : false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(setDarkTheme.fulfilled, (state, action) => {
      state.darkTheme = action.payload;
    });
  },
});

export const setDarkTheme = createAsyncThunk(
  "theme/setThemeThunk",
  (isActive) => {
    const root = document.documentElement;

    root?.style.setProperty("--first-color", isActive ? "#feffdf" : "#262833");

    root?.style.setProperty("--third-color", isActive ? "#97cba9" : "#404040");

    root?.style.setProperty("--fourth-color", isActive ? "#262833" : "#fff");

    localStorage.setItem("fishlog-theme", isActive ? "dark" : "light");

    return isActive;
  }
);

export const selectDarkTheme = (state) => {
  return state.theme.darkTheme;
};

export default themeSlice.reducer;
