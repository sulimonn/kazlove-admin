import { apiSlice } from './apiSlice';

const user = apiSlice.injectEndpoints({
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => '/users/me',
      providesTags: ['User'],
    }),
    editUser: builder.mutation({
      query: (data) => ({
        url: `/users/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    fetchUsers: builder.query({
      query: () => '/users',
      providesTags: ['User'],
    }),
    getProfileByUserID: builder.query({
      query: (id) => `/profile/${id}`,
      providesTags: ['Profile'],
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    addAdmin: builder.mutation({
      query: (data) => ({
        url: '/users/admin',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetMeQuery,
  useEditUserMutation,
  useFetchUsersQuery,
  useGetProfileByUserIDQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useAddAdminMutation,
} = user;

export default user;
