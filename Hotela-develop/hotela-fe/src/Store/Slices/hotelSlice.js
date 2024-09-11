import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const serverURL = import.meta.env.VITE_serverURL;

export const hotelApi = createApi({
  reducerPath: "hotelAPi",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverURL}/hotels` }),
  tagTypes: ["hotela"],
  endpoints: (build) => ({
    //search and filter hotel by Location, name, price etc...
    searchHotels: build.query({
      query: ({ name, locationName, minRating, minPrice, maxPrice }) =>
        `/search?locationName=${locationName}&minPrice=${minPrice}&maxPrice=${maxPrice}&minRating=${minRating}&name=${name}`,
      providesTags: ["hotela"],
    }),
    // searchHotels: build.query({
    //   query: ({ name, locationName, minRating, minPrice, maxPrice }) => {
    //     // Safely parse the prices and ratings, fallback to null if invalid
    //     const parsedMinRating = Number(minRating) || null;
    //     const parsedMinPrice = Number(minPrice) || null;
    //     const parsedMaxPrice = Number(maxPrice) || null;

    //     // Build query string conditionally
    //     const queryString = new URLSearchParams({
    //       ...(locationName && { locationName }),
    //       ...(name && { name }),
    //       ...(parsedMinRating && { minRating: parsedMinRating }),
    //       ...(parsedMinPrice && { minPrice: parsedMinPrice }),
    //       ...(parsedMaxPrice && { maxPrice: parsedMaxPrice }),
    //     }).toString();

    //     return `/search?${queryString}`;
    //   },
    //   providesTags: ["hotela"],
    // }),
    //search hotel by Geolocation (Google Map)
    hotelGeolocation: build.query({
      query: () => `/searchGeo`,
      providesTags: ["hotela"],
    }),
    //Get hotel details
    hotelDetails: build.query({
      query: (id) => `/search/${id}`,
      providesTags: ["hotela"],
    }),

    // Rating and comment for a hotel
    addRatingAndComment: build.mutation({
      query({ id, ...body }) {
        return {
          url: `/addRating/${id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["hotela"],
    }),
  }),
});

export const {
  useSearchHotelsQuery,
  useHotelGeolocationQuery,
  useHotelDetailsQuery,
  useAddRatingAndCommentMutation,
} = hotelApi;
