import React from 'react';
import PropTypes from 'prop-types';

import { Stack, TextField, IconButton, Typography, CircularProgress } from '@mui/material';

import Iconify from 'src/components/iconify';

const TariffTypeItem = ({ filter, deleteFilter, editFilter, index }) => {
  const [name, setName] = React.useState(filter.name);
  const [edit, setEdit] = React.useState(false);
  const [isEditing, setEditing] = React.useState();
  const [isDeleting, setDeleting] = React.useState();

  React.useEffect(() => {
    setName(filter.name);
  }, [filter]);

  return (
    <Stack direction="row">
      <Iconify icon="eva:menu-fill" width={24} sx={{ color: 'text.secondary', mr: 1 }} />
      <Typography variant="body1" gutterBottom color="text.primary" pr={1}>
        {index}.
      </Typography>
      {!edit ? (
        <Typography variant="body1" gutterBottom color="text.primary" sx={{ flex: 1 }}>
          {filter.name}
        </Typography>
      ) : (
        <TextField
          sx={{ flex: 1 }}
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="standard"
          autoFocus={edit}
        />
      )}
      <Stack direction="row" spacing={1}>
        {!edit ? (
          <IconButton onClick={() => setEdit(!edit)}>
            <Iconify icon="carbon:edit" />
          </IconButton>
        ) : (
          <IconButton
            onClick={async () => {
              setEditing(true);
              const response = await editFilter({ ...filter, name });
              if (!response?.error) {
                setEdit(!edit);
                setName(response.data.name);
              }
              setEditing(false);
            }}
            disabled={isEditing || name.trim() === ''}
          >
            {!isEditing ? <Iconify icon="carbon:checkmark" /> : <CircularProgress size={20} />}
          </IconButton>
        )}
        <IconButton
          onClick={async () => {
            setDeleting(true);
            await deleteFilter(filter.id);

            setDeleting(false);
          }}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <CircularProgress size={20} color="grey" />
          ) : (
            <Iconify icon="carbon:trash-can" />
          )}
        </IconButton>
      </Stack>
    </Stack>
  );
};

TariffTypeItem.propTypes = {
  filter: PropTypes.object.isRequired,
  deleteFilter: PropTypes.func,
  editFilter: PropTypes.func,
  index: PropTypes.number,
};
export default TariffTypeItem;
