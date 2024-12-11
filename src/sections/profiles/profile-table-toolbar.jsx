import { useState } from 'react';
import PropTypes from 'prop-types';

import Toolbar from '@mui/material/Toolbar';
import { Stack, Button } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { useFetchCitiesQuery } from 'src/store/reducers/api';

import Iconify from 'src/components/iconify';

import ProfileCities from './profile-cities';
import ProductFilters from './product-filters';

// ----------------------------------------------------------------------

export default function ProfileTableToolbar({
  setFilterName,
  filterName,
  selectedCity,
  setSelectedCity,
  viewAs,
  setViewAs,
}) {
  const { data: cities = [] } = useFetchCitiesQuery();
  const [openFilter, setOpenFilter] = useState(false);

  const handleFilterByName = (event) => {
    setFilterName(event);
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  return (
    <Toolbar
      direction={{ xs: 'column', sm: 'row' }}
      alignItems="center"
      flexWrap="wrap-reverse"
      sx={{
        mb: 5,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', sm: 'row' },
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <OutlinedInput
          value={filterName}
          onChange={handleFilterByName}
          placeholder="Поиск..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />

        <Stack direction="row" alignItems="center" display={{ xs: 'flex', sm: 'none' }}>
          <Button
            variant={viewAs === 'grid' ? 'contained' : 'outlined'}
            sx={{ borderRadius: '5px 0 0 5px', p: 0.5, minWidth: 0 }}
            onClick={() => setViewAs('grid')}
          >
            <Iconify icon="eva:grid-fill" width={20} height={20} />
          </Button>
          <Button
            variant={viewAs === 'list' ? 'contained' : 'outlined'}
            sx={{ borderRadius: '0 5px 5px 0', p: 0.5, minWidth: 0 }}
            onClick={() => setViewAs('list')}
          >
            <Iconify icon="eva:list-fill" width={20} height={20} />
          </Button>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
        <ProductFilters
          openFilter={openFilter}
          onOpenFilter={handleOpenFilter}
          onCloseFilter={handleCloseFilter}
        />

        <ProfileCities
          setSelectedCity={setSelectedCity}
          cities={cities}
          selectedCity={selectedCity}
        />
        <Stack direction="row" alignItems="center" display={{ xs: 'none', sm: 'flex' }}>
          <Button
            variant={viewAs === 'grid' ? 'contained' : 'outlined'}
            sx={{ borderRadius: '5px 0 0 5px', p: 0.5, minWidth: 0 }}
            onClick={() => setViewAs('grid')}
          >
            <Iconify icon="eva:grid-fill" width={20} height={20} />
          </Button>
          <Button
            variant={viewAs === 'list' ? 'contained' : 'outlined'}
            sx={{ borderRadius: '0 5px 5px 0', p: 0.5, minWidth: 0 }}
            onClick={() => setViewAs('list')}
          >
            <Iconify icon="eva:list-fill" width={20} height={20} />
          </Button>
        </Stack>
      </Stack>
    </Toolbar>
  );
}

ProfileTableToolbar.propTypes = {
  filterName: PropTypes.string,
  setFilterName: PropTypes.func,
  selectedCity: PropTypes.object,
  setSelectedCity: PropTypes.func,
  viewAs: PropTypes.string,
  setViewAs: PropTypes.func,
};
