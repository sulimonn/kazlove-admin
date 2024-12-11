import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import {
  useAddCityMutation,
  useAddTypeMutation,
  useFetchTypesQuery,
  useEditCityMutation,
  useFetchCitiesQuery,
  useEditTypeMutation,
  useAddGenderMutation,
  useFetchGendersQuery,
  useDeleteCityMutation,
  useEditGenderMutation,
  useDeleteTypeMutation,
  useFetchServicesQuery,
  useAddServiceMutation,
  useEditServiceMutation,
  useDeleteGenderMutation,
  useDeleteServiceMutation,
} from 'src/store/reducers/api';

import Form from '../filter-form';

// ----------------------------------------------------------------------

export default function FilterView() {
  const { data: genders = [] } = useFetchGendersQuery();
  const { data: cities = [] } = useFetchCitiesQuery();
  const { data: types = [] } = useFetchTypesQuery();
  const { data: services = [] } = useFetchServicesQuery();

  const [addCity, { isLoading: isAddingCity }] = useAddCityMutation();
  const [deleteCity] = useDeleteCityMutation();
  const [editCity] = useEditCityMutation();
  const [addGender, { isLoading: isAddingGender }] = useAddGenderMutation();
  const [deleteGender] = useDeleteGenderMutation();
  const [editGender] = useEditGenderMutation();
  const [addProfileType, { isLoading: isAddingProfileType }] = useAddTypeMutation();
  const [deleteProfileType] = useDeleteTypeMutation();
  const [editProfileType] = useEditTypeMutation();
  const [addService, { isLoading: isAddingService }] = useAddServiceMutation();
  const [deleteService] = useDeleteServiceMutation();
  const [editService] = useEditServiceMutation();

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Фильтры</Typography>
      </Stack>

      {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch posts={posts} />
        <PostSort
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Stack> */}

      <Stack container spacing={3} maxWidth={900} width="100%" alignItems="stretch" mx="auto">
        <Form
          values={cities}
          title="Города"
          addFilter={addCity}
          isAdding={isAddingCity}
          editFilter={editCity}
          deleteFilter={deleteCity}
        />
        <Form
          values={genders}
          title="Гендеры"
          addFilter={addGender}
          isAdding={isAddingGender}
          editFilter={editGender}
          deleteFilter={deleteGender}
        />
        <Form
          values={types}
          title="Типы профиля"
          addFilter={addProfileType}
          isAdding={isAddingProfileType}
          editFilter={editProfileType}
          deleteFilter={deleteProfileType}
        />
        <Form
          values={services}
          title="Услуги"
          addFilter={addService}
          isAdding={isAddingService}
          editFilter={editService}
          deleteFilter={deleteService}
        />
      </Stack>
    </Container>
  );
}
