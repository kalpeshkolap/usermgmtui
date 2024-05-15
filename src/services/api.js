import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
  baseUrl: "http://10.0.100.20/user/",
    // baseUrl: process.env.BACKEND_URL ,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: `app/`,
      }),
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `app/${id}`,
        method: "GET",
       
      }),
      providesTags: ["User"],
    }),
    addUser: builder.mutation({
      query: (newPost) => ({
        url: `app/`,
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (updateUser) => ({
        url: `app/${updateUser.id}`,
        method: "PUT",
        body: updateUser,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `app/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useAddUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = api;
