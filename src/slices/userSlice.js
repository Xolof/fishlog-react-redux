import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: localStorage.getItem("fishlog-userName"),
  userPosition: null,
  markerLocation: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.name = action.username;
    },
  },
});

export const { setUserName } = userSlice.actions;

export const selectUsername = (state) => state.user.name;

export default userSlice.reducer;
