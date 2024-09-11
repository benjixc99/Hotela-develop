import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverURL } from "../URL";

export interface IRegister {
  fullname: string;
  email: string;
  password: string;
}
export interface ILogin {
  email: string;
  password: string;
}

export interface IAllUsers {
  _id: string;
  fullname: string;
  email: string;
  role: string;
}
type AllUserResponse = IAllUsers[];

// register slice
export const authApi = createApi({
  reducerPath: "authAPi",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverURL}/api/v1/user` }),
  tagTypes: ["auth"],
  endpoints: (build) => ({
    //Get all users
    getAllUsers: build.query<AllUserResponse, void>({
      query: () => `/`,
      providesTags: ["auth"],
    }),
    //Get a single user
    getSingleUser: build.query<IAllUsers, string>({
      query: (id) => `/admin/allUser/${id}`,
      providesTags: ["auth"],
    }),
    // Register Endpoints
    register: build.mutation<IRegister, Partial<IRegister>>({
      query(body) {
        return {
          url: `/admin/register`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["auth"],
    }),
    // Register Endpoints

    login: build.mutation<ILogin, Partial<ILogin>>({
      query(body) {
        return {
          url: `/admin/login`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useRegisterMutation,
  useLoginMutation,
} = authApi;
