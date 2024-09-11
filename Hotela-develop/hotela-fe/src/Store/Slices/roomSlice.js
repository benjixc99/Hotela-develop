import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const serverURL = import.meta.env.VITE_serverURL;

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverURL}/rooms`,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState().auth.token;
    //   // If we have a token set in state, let's assume that we should be passing it.
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }

    //   return headers;
    // },
  }),
  tagTypes: ["room"],
  endpoints: (build) => ({
    //Fetch hotel rooms
    hotelRooms: build.query({
      query: (id) => `/allRoom/${id}`,
      providesTags: ["room"],
    }),
    //Fetch room details
    roomDetails: build.query({
      query: (id) => `/roomDetails/${id}`,
      providesTags: ["room"],
    }),
  }),
});

export const { useHotelRoomsQuery, useRoomDetailsQuery } = roomApi;
