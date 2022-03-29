import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkTheme: localStorage.getItem("fishlog-theme") === "dark" ? true : false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkTheme: (state, action) => {
      state.darkTheme = action.payload;
    },
  },
});

export const { setDarkTheme } = themeSlice.actions;

export const selectDarkTheme = (state) => {
  return state.theme.darkTheme;
};

export default themeSlice.reducer;
