import { useState } from 'react';
import PropTypes from 'prop-types';

import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { listClasses } from '@mui/material/List';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ProfileCities({ setSelectedCity, cities, selectedCity }) {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (event) => {
    setOpen(null);
  };

  const handleClick = (event) => {
    setSelectedCity(event);
  };

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        Город&nbsp;
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
          whiteSpace="nowrap"
        >
          {selectedCity ? selectedCity?.name : 'Все города'}
        </Typography>
      </Button>

      <Menu
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              [`& .${listClasses.root}`]: {
                p: 0,
              },
            },
          },
        }}
        sx={{
          '& .MuiMenuItem-root': {
            minWidth: '150px',
            py: 1,
          },
        }}
      >
        <MenuItem selected={!selectedCity} onClick={() => handleClick(null)}>
          <Typography>Все города</Typography>
        </MenuItem>
        {cities.map((option) => (
          <MenuItem
            key={option?.id}
            selected={selectedCity?.id === option?.id}
            onClick={() => handleClick(option)}
          >
            <Typography>{option?.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

ProfileCities.propTypes = {
  setSelectedCity: PropTypes.func,
  cities: PropTypes.array,
  selectedCity: PropTypes.object,
};
