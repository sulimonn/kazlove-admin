import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useFetchGendersQuery } from 'src/store/reducers/api';
import { setGender, setSwiperFilter } from 'src/store/reducers/action';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import RangeSlider from './profile-filter-item';

// ----------------------------------------------------------------------

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];
// ----------------------------------------------------------------------

export default function ProductFilters({ openFilter, onOpenFilter, onCloseFilter }) {
  const { data: genders = [] } = useFetchGendersQuery();
  const { gender } = useSelector((state) => state.action);
  const { filter: filters } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();
  const renderGender = (
    <Stack spacing={1.5}>
      <Typography variant="subtitle2">Гендер</Typography>
      <FormGroup>
        {genders?.map((item) => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                value={item.id}
                onClick={(e) => {
                  dispatch(setGender(e.target.value));
                }}
                checked={gender.includes(parseInt(item.id, 10))}
              />
            }
            label={item.name}
          />
        ))}
      </FormGroup>
    </Stack>
  );

  const renderCategory = filters
    .filter((item) => item.type === 'swiper')
    .map((item) => (
      <Stack spacing={1.5} key={item.id}>
        <Typography variant="subtitle2">{item.name}</Typography>
        <RadioGroup>
          <RangeSlider filter={item} />
        </RadioGroup>
      </Stack>
    ));

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={onOpenFilter}
      >
        Предпочтения&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: {
            width: 280,
            border: 'none',
            overflow: 'hidden',
            backgroundColor: 'background.default',
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2, py: 2 }}
        >
          <Typography variant="h6" sx={{ ml: 1 }}>
            Фильтры
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={1} sx={{ py: 3, px: 5 }}>
            {renderGender}

            {renderCategory}
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
            onClick={() => {
              dispatch(setGender(null));
              dispatch(setSwiperFilter({ id: 'age' }));
              dispatch(setSwiperFilter({ id: 'price' }));
              dispatch(setSwiperFilter({ id: 'breast_size' }));
              dispatch(setSwiperFilter({ id: 'weight' }));
              dispatch(setSwiperFilter({ id: 'height' }));
            }}
          >
            Очистить
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

ProductFilters.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};
