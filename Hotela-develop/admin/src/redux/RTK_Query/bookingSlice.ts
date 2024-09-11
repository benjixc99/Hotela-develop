import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverURL } from "../URL";
export interface IBooking {
  _id: string;
  userId: {
    firstName: string;
    lastName: string;
  };
  hotel: {
    name: string;
  };
  rooms: {
    name: string;
  };
  address: string;
  occupation: string;
  email: string;
  phoneNumber: string;
  nationality: string;
  passportNumber: string;
  roomId: {
    roomNumber: string;
  };
  price: number;
  discountAmount: number;
  refundAmount: number;
  totalAmount: number;
  checkIn: Date | null;
  checkOut: Date | null;
  numOfGuest: number;
  adults: number;
  children: number;
}
export interface IBooking2 {
  _id: string;

  guestName: string;
  gender: string | null;
  address: string;
  occupation: string;
  email: string;
  phoneNumber: string;
  nationality: string;
  passportNumber: string;
  roomId: string | null;
  price: number;
  discountAmount: number;
  refundAmount: number;
  totalAmount: number;
  checkIn: Date | null;
  checkOut: Date | null;
  numOfGuest: number;
  adults: number;
  children: number;
}
interface IRevenue {
  total: number;
}
type BookingResponse = IBooking[];
// register slice
export const bookingApi = createApi({
  reducerPath: "bookingAPi",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverURL}/api/v1/bookings` }),
  tagTypes: ["booking"],
  endpoints: (build) => ({
    getAllBooking: build.query<BookingResponse, void>({
      query: () => `/`,
      providesTags: ["booking"],
    }),
    getBookingRevenue: build.query<IRevenue, void>({
      query: () => `/revenue`,
      providesTags: ["booking"],
    }),
    singleBooking: build.query<IBooking, string | undefined>({
      query: (id) => `/viewBooking/${id}`,
      providesTags: ["booking"],
    }),
    createBooking: build.mutation<IBooking2, Partial<IBooking2>>({
      query(body) {
        return {
          url: `/createBooking`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useGetAllBookingQuery,
  useGetBookingRevenueQuery,
  useSingleBookingQuery,
  useCreateBookingMutation,
} = bookingApi;
