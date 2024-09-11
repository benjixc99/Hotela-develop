import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverURL } from "../URL";
export interface IRoom {
  _id: string;
  roomNumber: string;
  description: string;
  photos?: File[];
  perks?: Array<string>;
  roomType: string | null;
  price: number;
  maxGuest: number;
}
export interface Ivacant {
  date: Date;
  vacantRooms: [
    {
      _id: string;
      roomNumber: string;
      price: number;
    },
  ];
  bookedRooms: [
    {
      _id: string;
      roomNumber: string;
      price: number;
    },
  ];
}
type roomResponse = IRoom[];
// type vacantResponse = Ivacant[];
// register slice
export const roomApi = createApi({
  reducerPath: "roomAPi",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverURL}/api/v1/rooms` }),
  tagTypes: ["room"],
  endpoints: (build) => ({
    getAllRoom: build.query<roomResponse, string>({
      query: (hotelId) => `/allRoom/${hotelId}`,
      providesTags: ["room"],
    }),
    createRoom: build.mutation<IRoom, FormData>({
      query(body) {
        return {
          url: `/createRoom`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["room"],
    }),
  }),
});

export const {
  useGetAllRoomQuery,

  useCreateRoomMutation,
} = roomApi;
