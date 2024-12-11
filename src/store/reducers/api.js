import { apiSlice } from './apiSlice';

const api = apiSlice.injectEndpoints({
  tagTypes: ['api', 'Profile', 'City', 'Type', 'Service', 'Gender', 'User', 'Comments'],
  endpoints: (builder) => ({
    fetchProfiles: builder.query({
      query: () => '/profiles',
      providesTags: ['Profile'],
    }),
    myProfile: builder.query({
      query: () => '/profile/me',
      providesTags: ['Profile'],
    }),
    postProfile: builder.mutation({
      query: (data) => ({
        url: '/profiles/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
    editProfile: builder.mutation({
      query: (data) => ({
        url: `/profiles/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Profile', 'User'],
    }),
    deleteProfile: builder.mutation({
      query: (id) => ({
        url: `/profiles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile', 'User'],
    }),
    getProfile: builder.query({
      query: (id) => `/profiles/${id}`,
      providesTags: ['Profile'],
    }),
    fetchCities: builder.query({
      query: () => '/cities/all',
      providesTags: ['City'],
    }),
    deleteCity: builder.mutation({
      query: (id) => ({
        url: `/cities/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['City'],
    }),
    editCity: builder.mutation({
      query: (data) => ({
        url: `/cities/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['City'],
    }),
    addCity: builder.mutation({
      query: (data) => ({
        url: '/cities',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['City'],
    }),
    addType: builder.mutation({
      query: (data) => ({
        url: '/profile_types',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Type'],
    }),
    fetchTypes: builder.query({
      query: () => '/profile_types/all',
      providesTags: ['Type'],
    }),
    editType: builder.mutation({
      query: (data) => ({
        url: `/profile_types/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Type'],
    }),
    deleteType: builder.mutation({
      query: (id) => ({
        url: `/profile_types/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Type'],
    }),
    addService: builder.mutation({
      query: (data) => ({
        url: '/services',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Service'],
    }),
    fetchServices: builder.query({
      query: () => '/services/all',
      providesTags: ['Service'],
    }),
    addServiceToProfile: builder.mutation({
      query: (data) => ({
        url: '/profiles-services/add',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Service'],
    }),
    updateServiceToProfile: builder.mutation({
      query: (data) => ({
        url: '/profiles-services/update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Service'],
    }),
    deleteServiceFromProfile: builder.mutation({
      query: (data) => ({
        url: '/profiles-services/delete',
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['Service'],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Service'],
    }),
    editService: builder.mutation({
      query: (data) => ({
        url: `/services/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Service'],
    }),
    postPhotos: builder.mutation({
      query: ({ data, profile_id }) => {
        console.log(data, profile_id);
        return {
          url: `/profiles/${profile_id}/photos`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Profile'],
    }),
    getProfilePhotos: builder.query({
      query: (profile_id) => `/profiles/${profile_id}/photos`,
      providesTags: ['Profile'],
    }),
    deleteProfilePhoto: builder.mutation({
      query: (data) => ({
        url: `/profiles/${data.profile_id}/photos/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile'],
    }),
    addGender: builder.mutation({
      query: (data) => ({
        url: '/genders',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Genders'],
    }),
    fetchGenders: builder.query({
      query: () => '/genders/all',
      providesTags: ['Genders'],
    }),
    editGender: builder.mutation({
      query: (data) => ({
        url: `/genders/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Genders'],
    }),
    deleteGender: builder.mutation({
      query: (id) => ({
        url: `/genders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Genders'],
    }),
    postComment: builder.mutation({
      query: (data) => ({
        url: '/comments',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Comments'],
    }),
    getProfileComments: builder.query({
      query: (profile_id) => `/comments/profile/${profile_id}`,
      providesTags: ['Comments'],
    }),
    getUserComments: builder.query({
      query: (user_id) => `/comments/user/${user_id}`,
      providesTags: ['Comments'],
    }),
  }),
});

export const {
  useFetchProfilesQuery,
  useMyProfileQuery,
  useFetchCitiesQuery,
  useFetchTypesQuery,
  useFetchServicesQuery,
  useFetchGendersQuery,
  usePostProfileMutation,
  useEditProfileMutation,
  useAddServiceToProfileMutation,
  useDeleteServiceFromProfileMutation,
  usePostPhotosMutation,
  useGetProfilePhotosQuery,
  useDeleteProfilePhotoMutation,
  useGetProfileQuery,
  useGetProfileCommentsQuery,
  usePostCommentMutation,
  useDeleteProfileMutation,
  useDeleteCityMutation,
  useEditCityMutation,
  useDeleteTypeMutation,
  useEditTypeMutation,
  useDeleteServiceMutation,
  useEditServiceMutation,
  useDeleteGenderMutation,
  useEditGenderMutation,
  useAddCityMutation,
  useAddTypeMutation,
  useAddServiceMutation,
  useAddGenderMutation,
  useGetUserCommentsQuery,
  useUpdateServiceToProfileMutation,
} = api;

export default api;
