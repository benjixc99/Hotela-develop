import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverURL } from "../URL";

interface IReport {
  month: string;
  total: number;
}
interface IReportRevenue {
  month: string;
  revenue: number;
}
type reportResponse = IReport[];
type revenueType = IReportRevenue[];

// analysis report slice
export const reportApi = createApi({
  reducerPath: "reportAPi",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverURL}/api/v1/analysis` }),
  tagTypes: ["report"],
  endpoints: (build) => ({
    getUsersReport: build.query<reportResponse, string | null>({
      query: (year) => `/users?year=${year}`,
      providesTags: ["report"],
    }),
    getBookingReport: build.query<reportResponse, string | null>({
      query: (year) => `/booking?year=${year}`,
      providesTags: ["report"],
    }),
    getRevenueReport: build.query<revenueType, string | null>({
      query: (year) => `/revenue?year=${year}`,
      providesTags: ["report"],
    }),
    getRoomReport: build.query<revenueType, void>({
      query: () => `/roomPerformance`,
      providesTags: ["report"],
    }),
  }),
});

export const {
  useGetUsersReportQuery,
  useGetBookingReportQuery,
  useGetRevenueReportQuery,
  useGetRoomReportQuery,
} = reportApi;
