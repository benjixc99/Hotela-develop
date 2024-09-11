import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverURL } from "../URL";
export interface IHotel {
  _id: string;
  name: string;
  email: string;
  rooms?: string[];
  description: string;
  images?: File[];
  geoLocation: {
    coordinates: [number, number];
  };
  amenities?: Array<string>;
  price: number;
}

type roomResponse = IHotel[];
// type vacantResponse = Ivacant[];
// register slice
export const hotelAPI = createApi({
  reducerPath: "hotelAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverURL}/api/v1/hotels` }),
  tagTypes: ["hotel"],
  endpoints: (build) => ({
    getAllHotels: build.query<roomResponse, void>({
      query: () => `/`,
      providesTags: ["hotel"],
    }),

    singleHotel: build.query<IHotel, string | null>({
      query: (id) => `/search/${id}`,
      providesTags: ["hotel"],
    }),
    createHotel: build.mutation<IHotel, FormData>({
      query(body) {
        return {
          url: `/addNew`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["hotel"],
    }),
    updateHotel: build.mutation<IHotel, FormData>({
      query(id, ...body) {
        return {
          url: `/search/${id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["hotel"],
    }),
  }),
});

export const {
  useGetAllHotelsQuery,
  useSingleHotelQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation,
} = hotelAPI;
