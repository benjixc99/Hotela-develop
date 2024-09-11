import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserDetails {
  userInfo: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  };
  token: string;
}

interface IloginDetails {
  userDetails: UserDetails | null;
}

const user = localStorage.getItem("userDetail");
const initialState: IloginDetails = {
  userDetails: user ? (JSON.parse(user) as UserDetails) : null,
};

export const authenticateSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload;
      localStorage.setItem("userDetail", JSON.stringify(state.userDetails));
    },
    logOut: (state) => {
      state.userDetails = null;
      localStorage.removeItem("userDetail");
    },
  },
});

export const { authenticate, logOut } = authenticateSlice.actions;
export const currentUser = (state: RootState) => state.auth.userDetails;

export default authenticateSlice.reducer;
