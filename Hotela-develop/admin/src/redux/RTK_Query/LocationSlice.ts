import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverURL } from "../URL";
export interface ILocation {
  _id: string;
  name: string;
}

type locationResponse = ILocation[];
// type vacantResponse = Ivacant[];
// register slice
export const locationAPI = createApi({
  reducerPath: "locationAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverURL}/api/v1/location` }),
  tagTypes: ["location"],
  endpoints: (build) => ({
    getLocation: build.query<locationResponse, void>({
      query: () => `/`,
      providesTags: ["location"],
    }),
  }),
});

export const { useGetLocationQuery } = locationAPI;
