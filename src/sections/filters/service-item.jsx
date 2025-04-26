import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Stack, TextField, IconButton, CircularProgress } from '@mui/material';

import { useEditServiceMutation, useDeleteServiceMutation } from 'src/store/reducers/api';

import Iconify from 'src/components/iconify';

const ServiceItem = ({ service: initialService, parentType, setServiceType }) => {
  const [service, setService] = useState(initialService);
  const [editService, { isLoading }] = useEditServiceMutation();
  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();
  return (
    <Stack direction="row" alignItems="center" key={service.id}>
      <TextField
        fullWidth
        label="Новая услуга"
        variant="standard"
        value={service.name || ''}
        onChange={(e) => {
          setService({ ...service, name: e.target.value });
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            p: 1,
          },
          '& input': {
            p: 1,
          },
        }}
      />
      <IconButton
        onClick={async () => {
          await editService({ ...service, profile_type_id: parentType });
        }}
        disabled={isLoading || service.name.trim() === ''}
      >
        {isLoading ? <CircularProgress size={20} /> : <Iconify icon="eva:edit-fill" />}
      </IconButton>
      <IconButton
        onClick={async () => {
          const res = await deleteService(service.id);
          if (!res?.error) {
            setServiceType((prev) => ({
              ...prev,
              services: prev.services.filter((s) => s.id !== service.id),
            }));
          }
        }}
        disabled={isLoading || isDeleting}
      >
        {isDeleting ? <CircularProgress size={20} /> : <Iconify icon="eva:trash-fill" />}
      </IconButton>
    </Stack>
  );
};

ServiceItem.propTypes = {
  service: PropTypes.object,
  parentType: PropTypes.number,
  setServiceType: PropTypes.func,
};

export default ServiceItem;
