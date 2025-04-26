import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Card,
  Stack,
  Button,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';

import {
  useAddTariffMutation,
  useEditTariffMutation,
  useDeleteTariffMutation,
  useBendTariffToCityMutation,
} from 'src/store/reducers/api';

import Iconify from 'src/components/iconify';

const TariffInput = ({ id = null, city = null, tariff_types = [] }) => {
  const [addTariff] = useAddTariffMutation();
  const [bendTariffToCity] = useBendTariffToCityMutation();
  const [newTariff, setNewTariff] = React.useState({
    name: '',
    price: '',
    field_1: 'null',
    field_2: 'null',
    type: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await addTariff({
      name: tariff_types.find((type) => type.id === newTariff.type).name,
      ...newTariff,
    });
    if (response?.data) {
      await bendTariffToCity({
        tariff_id: response?.data?.id,
        city_id: city?.id,
        price_top: 0,
        price_vip: 0,
      });
      setNewTariff({ name: '', price: '', field_1: 'null', field_2: 'null' });
    }
  };

  return (
    <Card key={city.id}>
      <Box p={3}>
        <Typography variant="h5" gutterBottom>
          {city.name}
        </Typography>

        <Stack direction="column" component="form" onSubmit={handleSubmit}>
          <Stack direction="row">
            <TextField
              size="small"
              type="text"
              label="Цена за час"
              variant="outlined"
              value={newTariff.price}
              onChange={(e) => setNewTariff({ ...newTariff, price: e.target.value })}
              required
              sx={{
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  borderBottomLeftRadius: 0,
                  borderTopLeftRadius: 0,
                },
              }}
            />
            <Select
              size="small"
              label="Тип тарифа"
              variant="outlined"
              value={newTariff.type}
              onChange={(e) => setNewTariff({ ...newTariff, type: e.target.value })}
              required
              sx={{
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  borderBottomRightRadius: 0,
                  borderTopRightRadius: 0,
                },
              }}
            >
              {city?.tariffs.map((tariff) => (
                <MenuItem key={tariff?.id} value={tariff?.id}>
                  {tariff?.name}
                </MenuItem>
              ))}
            </Select>

            <Button
              variant="contained"
              type="submit"
              sx={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}
              disabled={!newTariff.name || !newTariff.price || !newTariff.type}
            >
              Добавить
            </Button>
          </Stack>
        </Stack>
        <Stack spacing={2} mt={5}>
          {city?.tariffs.map((tariff) => (
            <ItemInput key={tariff.id} tariff={tariff} />
          ))}
        </Stack>
      </Box>
    </Card>
  );
};

TariffInput.propTypes = {
  id: PropTypes.number,
  city: PropTypes.object,
  tariff_types: PropTypes.array,
};

export default TariffInput;

const ItemInput = ({ tariff: initialTariff = null }) => {
  console.log(initialTariff);

  const [tariff, setTariff] = React.useState(initialTariff);

  const [editTarif] = useEditTariffMutation();
  const [deleteTarif] = useDeleteTariffMutation();
  const handleDelete = async () => {
    await deleteTarif(tariff.id);
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    await editTarif({ ...tariff, type: tariff.type.id });
  };

  return (
    <Stack direction="row" spacing={1}>
      <Typography variant="body1" gutterBottom color="primary">
        <i>{tariff?.type?.name}</i>
      </Typography>
      <TextField
        size="small"
        type="text"
        label="Название тарифа"
        variant="outlined"
        value={tariff.name}
        onChange={(e) => {
          setTariff({ ...tariff, name: e.target.value });
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
          },
        }}
        name="name"
        required
      />
      <TextField
        size="small"
        type="number"
        label="Цена за час"
        variant="outlined"
        value={tariff.price || ''} // Ensure it's a valid value (string or number)
        onChange={(e) => {
          setTariff({ ...tariff, price: e.target.value });
        }}
        name="price"
        required
        sx={{
          '& .MuiOutlinedInput-root': {
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
          },
        }}
      />

      <IconButton
        variant="outlined"
        onClick={() => handleEdit(tariff.id)}
        disabled={tariff?.name?.trim() === '' || tariff?.type.name?.trim() === ''}
      >
        <Iconify icon="carbon:edit" />
      </IconButton>
      <IconButton variant="outlined" onClick={handleDelete}>
        <Iconify icon="eva:trash-2-outline" />
      </IconButton>
    </Stack>
  );
};

ItemInput.propTypes = {
  tariff: PropTypes.object,
};
