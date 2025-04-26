import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import {
  useAddTypeMutation,
  useFetchTypesQuery,
  useEditTypeMutation,
  useAddGenderMutation,
  useFetchGendersQuery,
  useEditGenderMutation,
  useDeleteTypeMutation,
  useDeleteGenderMutation,
} from 'src/store/reducers/api';

import Form from '../filter-form';
import ServiceForm from '../service-form';

// ----------------------------------------------------------------------

export default function FilterView() {
  const { data: genders = [] } = useFetchGendersQuery();
  const { data: types = [], refetch, isFetching } = useFetchTypesQuery();

  const [addGender, { isLoading: isAddingGender }] = useAddGenderMutation();
  const [deleteGender] = useDeleteGenderMutation();
  const [editGender] = useEditGenderMutation();
  const [addProfileType, { isLoading: isAddingProfileType }] = useAddTypeMutation();
  const [deleteProfileType] = useDeleteTypeMutation();
  const [editProfileType] = useEditTypeMutation();

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

      <Stack spacing={3} maxWidth={900} width="100%" alignItems="stretch" mx="auto">
        <Form
          values={genders}
          title="Гендеры"
          addFilter={addGender}
          isAdding={isAddingGender}
          editFilter={editGender}
          deleteFilter={deleteGender}
        />
        <ServiceForm
          values={types}
          title="Категория услуг"
          addFilter={addProfileType}
          isAdding={isAddingProfileType}
          editFilter={editProfileType}
          deleteFilter={deleteProfileType}
          refetch={refetch}
          isFetching={isFetching}
        />
      </Stack>
    </Container>
  );
}
