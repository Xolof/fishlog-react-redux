import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: localStorage.getItem("fishlog-userName"),
  position: null,
  markerLocation: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setMarkerLocation: (state, action) => {
      state.markerLocation = action.payload;
    },
  },
});

export const { setUserName, setPosition, setMarkerLocation } =
  userSlice.actions;

export const selectUsername = (state) => {
  return state.user.name;
};

export const selectMarkerLocation = (state) => {
  return state.user.markerLocation;
};

export default userSlice.reducer;
