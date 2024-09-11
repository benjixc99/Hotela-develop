import { configureStore } from "@reduxjs/toolkit";
import authenticateSlice from "./Store/auth/authSlice";
import { authApi } from "./Store/Slices/authenticationSlice";
import { hotelApi } from "./Store/Slices/hotelSlice";
import { bookingAPI } from "./Store/Slices/bookingSlice";
import { roomApi } from "./Store/Slices/roomSlice";
export const store = configureStore({
  reducer: {
    auth: authenticateSlice,
    [authApi.reducerPath]: authApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
    [bookingAPI.reducerPath]: bookingAPI.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      hotelApi.middleware,
      bookingAPI.middleware,
      roomApi.middleware,
    ]),
});
