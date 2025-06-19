import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: localStorage.getItem("fishlog-userName"),
  userLat: null,
  userLng: null,
  markerLat: null,
  markerLng: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setUserLat: (state, action) => {
      state.userLat = action.payload;
    },
    setUserLng: (state, action) => {
      state.userLng = action.payload;
    },
    setMarkerLat: (state, action) => {
      state.markerLat = action.payload;
    },
    setMarkerLng: (state, action) => {
      state.markerLng = action.payload;
    },
  },
});

export const {
  setUserName,
  setUserLat,
  setUserLng,
  setMarkerLat,
  setMarkerLng,
} = userSlice.actions;

export const selectUsername = (state) => {
  return state.user.name;
};

export const selectUserLat = (state) => {
  return state.user.userLat;
};

export const selectUserLng = (state) => {
  return state.user.userLng;
};

export const selectMarkerLat = (state) => {
  return state.user.markerLat;
};

export const selectMarkerLng = (state) => {
  return state.user.markerLng;
};

export default userSlice.reducer;
