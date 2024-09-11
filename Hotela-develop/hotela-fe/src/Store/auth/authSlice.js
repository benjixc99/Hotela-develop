import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("hotela");
const initialState = {
  userDetails: user ? JSON.parse(user) : null,
};

export const authenticateSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.userDetails = action.payload;
      localStorage.setItem("hotela", JSON.stringify(state.userDetails));
    },
    logOut: (state) => {
      state.userDetails = null;
      localStorage.removeItem("hotela");
    },
  },
});

export const { authenticate, logOut } = authenticateSlice.actions;
export const currentUser = (state) => state.auth.userDetails;

export default authenticateSlice.reducer;
