import React from 'react';

import { Stack, Divider, Container, Typography } from '@mui/material';

import {
  useAddCityMutation,
  useEditCityMutation,
  useFetchCitiesQuery,
  useDeleteCityMutation,
  useFetchTariffTypesQuery,
  usePostTariffTypeMutation,
  useEditTariffTypeMutation,
  useDeleteTariffTypeMutation,
} from 'src/store/reducers/api';

import Loader from 'src/components/scrollbar/Loader';

import Form from 'src/sections/filters/filter-form';

import TariffForm from '../tariff-form';
import TariffInput from '../tariff-input';

const TariffsView = () => {
  const { data: cities = [], isFetching: isFetchingCities } = useFetchCitiesQuery();
  const { data: tariffTypes = [], isFetching: isFetchingTariffTypes } = useFetchTariffTypesQuery();

  const [addCity, { isLoading: isAddingCity }] = useAddCityMutation();
  const [deleteCity] = useDeleteCityMutation();
  const [editCity] = useEditCityMutation();
  const [addTariffType, { isLoading: isAddingTariffType }] = usePostTariffTypeMutation();
  const [deleteTariffType] = useDeleteTariffTypeMutation();
  const [editTariffType] = useEditTariffTypeMutation();

  if (isFetchingCities || isFetchingTariffTypes || isAddingCity || isAddingTariffType) {
    return <Loader />;
  }

  return (
    <Container>
      <Typography variant="h3">Города</Typography>
      <Container maxWidth="sm" sx={{ pb: 5 }}>
        <Stack spacing={3}>
          <Form
            values={cities}
            title="Города"
            addFilter={addCity}
            isAdding={isAddingCity}
            editFilter={editCity}
            deleteFilter={deleteCity}
          />
        </Stack>
      </Container>
      <Divider />
      <Typography variant="h3" sx={{ mt: 5 }}>
        О тарифах
      </Typography>
      <Container maxWidth="sm">
        <Typography variant="h4" sx={{ mb: 2 }}>
          Категория тарифов
        </Typography>
        <Stack spacing={3}>
          <TariffForm
            values={tariffTypes}
            title="Все категории тарифов"
            addFilter={addTariffType}
            isAdding={isAddingTariffType}
            editFilter={editTariffType}
            deleteFilter={deleteTariffType}
          />
        </Stack>
        <Divider sx={{ my: 4 }} />
        <Typography variant="h4" sx={{ mb: 2 }}>
          Все тарифы
        </Typography>
        <Stack spacing={3}>
          {cities.map((city) => (
            <TariffInput key={city.id} city={city} tariff_types={tariffTypes} />
          ))}
        </Stack>
      </Container>
    </Container>
  );
};

export default TariffsView;
