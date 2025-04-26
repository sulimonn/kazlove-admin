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
      providesTags: ['Profile', 'City', 'Tariffs'],
    }),
    fetchCities: builder.query({
      query: () => '/cities/all',
      providesTags: ['City', 'Tariffs'],
    }),
    deleteCity: builder.mutation({
      query: (id) => ({
        url: `/cities/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['City', 'Tariffs'],
    }),
    editCity: builder.mutation({
      query: (data) => ({
        url: `/cities/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['City', 'Tariffs'],
    }),
    addCity: builder.mutation({
      query: (data) => ({
        url: '/cities',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['City', 'Tariffs'],
    }),
    addType: builder.mutation({
      query: (data) => ({
        url: '/service_types',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Type'],
    }),
    fetchTypes: builder.query({
      query: () => '/service_types/all',
      providesTags: ['Type'],
    }),
    editType: builder.mutation({
      query: (data) => ({
        url: `/service_types/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Type'],
    }),
    deleteType: builder.mutation({
      query: (id) => ({
        url: `/service_types/${id}`,
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
      invalidatesTags: ['Type'],
    }),
    addServiceToProfile: builder.mutation({
      query: (data) => ({
        url: '/profiles-services/add',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Service', 'Profile'],
    }),
    updateServiceToProfile: builder.mutation({
      query: (data) => ({
        url: '/profiles-services/update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Service', 'Profile'],
    }),
    deleteServiceFromProfile: builder.mutation({
      query: (data) => ({
        url: '/profiles-services/delete',
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Type'],
    }),
    editService: builder.mutation({
      query: (data) => ({
        url: `/services/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Type'],
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
    addTariff: builder.mutation({
      query: (data) => ({
        url: '/tariffs',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Tariffs'],
    }),
    fetchTariffs: builder.query({
      query: () => '/tariffs/all',
      providesTags: ['Tariffs', 'City'],
    }),
    editTariff: builder.mutation({
      query: (data) => ({
        url: `/tariffs/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Tariffs', 'City'],
    }),
    deleteTariff: builder.mutation({
      query: (id) => ({
        url: `/tariffs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tariffs', 'City'],
    }),
    bendTariffToCity: builder.mutation({
      query: (data) => ({
        url: '/tariffs/cities',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Tariffs', 'City'],
    }),
    fetchTariffTypes: builder.query({
      query: () => '/tariff-types/all',
      providesTags: ['Tariffs', 'Profile'],
    }),
    postTariffType: builder.mutation({
      query: (data) => ({
        url: '/tariff-types',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Tariffs'],
    }),
    editTariffType: builder.mutation({
      query: (data) => ({
        url: `/tariff-types/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Tariffs'],
    }),
    deleteTariffType: builder.mutation({
      query: (id) => ({
        url: `/tariff-types/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tariffs'],
    }),
    postMedia: builder.mutation({
      query: ({ profile_id, data }) => ({
        url: `/profiles/${profile_id}/media`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Media', 'Profile'],
    }),
    deleteMedia: builder.mutation({
      query: ({ profile_id, id }) => ({
        url: `/profiles/${profile_id}/media/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Media', 'Profile'],
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
  useAddTariffMutation,
  useFetchTariffsQuery,
  useEditTariffMutation,
  useDeleteTariffMutation,
  useBendTariffToCityMutation,
  useFetchTariffTypesQuery,
  usePostTariffTypeMutation,
  useEditTariffTypeMutation,
  useDeleteTariffTypeMutation,
  usePostMediaMutation,
  useDeleteMediaMutation,
} = api;

export default api;
