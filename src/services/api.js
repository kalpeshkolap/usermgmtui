import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/user/",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "app/",
       
      }),
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `users/${id}`,
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
        url: `users/${updateUser.id}`,
        method: "PUT",
        body: updateUser,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
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
