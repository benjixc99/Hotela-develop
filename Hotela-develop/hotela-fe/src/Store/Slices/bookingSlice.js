import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const serverURL = import.meta.env.VITE_serverURL;

export const bookingAPI = createApi({
  reducerPath: "bookingAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverURL}/bookings`,
    prepareHeaders: (headers, { getState }) => {
      // Get the token from the state (assuming it's stored in the auth slice)
      const token = getState().auth.userDetails?.token;

      // If we have a token, set the Authorization header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["booking"],
  endpoints: (build) => ({
    //Get all bookings by a logged-in user
    allBookings: build.query({
      query: () => `/userBooking`,
      providesTags: ["booking"],
    }),
    //View details of a booking
    bookingDetails: build.query({
      query: (id) => `/userBooking/${id}`,
      providesTags: ["booking"],
    }),

    // Payment with stripe
    stripePayment: build.mutation({
      query(body) {
        return {
          url: `/createBooking/stripe`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["booking"],
    }),
    cryptoPayment: build.mutation({
      query(body) {
        return {
          url: `/createBooking/crypto`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["booking"],
    }),
    sessionCheckSuccess: build.mutation({
      query(body) {
        return {
          url: `/sessionSuccess`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useAllBookingsQuery,
  useBookingDetailsQuery,
  useStripePaymentMutation,
  useCryptoPaymentMutation,
  useSessionCheckSuccessMutation,
} = bookingAPI;
