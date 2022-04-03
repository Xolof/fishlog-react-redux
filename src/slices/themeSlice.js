import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const lightTileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const darkTileUrl = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";

const initialState = {
  darkTheme: localStorage.getItem("fishlog-theme") === "dark" ? true : false,
  tileUrl: lightTileUrl,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTileUrl: (state, action) => {
      state.tileUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setDarkTheme.fulfilled, (state, action) => {
      state.darkTheme = action.payload;
    });
  },
});

export const setDarkTheme = createAsyncThunk(
  "theme/setThemeThunk",
  (isActive, thunkAPI) => {
    const root = document.documentElement;

    root?.style.setProperty("--first-color", isActive ? "#feffdf" : "#262833");

    root?.style.setProperty("--third-color", isActive ? "#97cba9" : "#404040");

    root?.style.setProperty("--fourth-color", isActive ? "#262833" : "#fff");

    thunkAPI.dispatch(
      themeSlice.setTileUrl(isActive ? darkTileUrl : lightTileUrl)
    );

    root?.style.setProperty(
      "--map-tiles-filter",
      isActive
        ? "brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7)"
        : "none"
    );

    localStorage.setItem("fishlog-theme", isActive ? "dark" : "light");

    return isActive;
  }
);

export const selectDarkTheme = (state) => {
  return state.theme.darkTheme;
};

export const selectTileUrl = (state) => {
  return state.theme.tileUrl;
};

export default themeSlice.reducer;
