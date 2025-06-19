import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../types/AppState";

interface ThemeState {
  darkTheme: boolean;
  tileUrl: string;
}

const initialState: ThemeState = {
  darkTheme: localStorage.getItem("fishlog-theme") === "dark",
  tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

export const setDarkTheme = createAsyncThunk<boolean, boolean>(
  "theme/setThemeThunk",
  async (isActive: boolean) => {
    const root = document.documentElement;

    root?.style.setProperty("--first-color", isActive ? "#feffdf" : "#262833");
    root?.style.setProperty("--third-color", isActive ? "#97cba9" : "#404040");
    root?.style.setProperty("--fourth-color", isActive ? "#262833" : "#fff");
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

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTileUrl: (state, action: PayloadAction<string>) => {
      state.tileUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setDarkTheme.fulfilled, (state, action) => {
      state.darkTheme = action.payload;
    });
  },
});

export const selectDarkTheme = (state: AppState) => state.theme.darkTheme;
export const selectTileUrl = (state: AppState) => state.theme.tileUrl;

export const { setTileUrl } = themeSlice.actions;
export default themeSlice.reducer;
