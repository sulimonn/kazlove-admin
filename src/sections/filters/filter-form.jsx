import PropTypes from 'prop-types';
import { keyframes } from '@emotion/react';
import React, { useState, useEffect } from 'react';

import { Box, Card, Stack, Button, TextField, Typography } from '@mui/material';

import FilterItem from './filter-item';

const shakeAnimation = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

const Form = ({ values, title, deleteFilter, editFilter, addFilter, isAdding, parent }) => {
  const [name, setName] = useState({
    name: '',
    type: 'primary',
    title: 'Добавить',
    isAdding: false,
  });
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (values.map((item) => item.name).includes(name.name.trim())) {
      setError(true);
    } else {
      setError(false);
    }
  }, [values, name]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '100%' }}
    >
      <Card sx={{ p: 3, width: '100%' }}>
        <Stack direction="row">
          <Stack sx={{ width: '100%' }}>
            <TextField
              label="Название"
              variant="outlined"
              value={name?.name || ''}
              onChange={(e) => setName({ ...name, name: e.target.value })}
              error={error}
              fullWidth
              helperText={error ? 'Этот фильтр уже существует' : ''}
              sx={{
                animation: error ? `${shakeAnimation} 0.3s` : 'none',
                '& .MuiOutlinedInput-root': {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderWidth: 4,
                },
                '& .MuiInputLabel-root': {
                  color: 'text.disabled',
                },
              }}
            />
          </Stack>
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              height: 56,
              position: 'relative',
            }}
            onClick={async () => {
              if (name?.name.trim() !== '') {
                const response = await addFilter({ name: name.name.trim() });
                if (!response?.error) {
                  setName({ name: '', title: 'Добавлено', type: 'success' });
                  setTimeout(() => {
                    setName({ name: '', title: 'Добавить', type: 'primary' });
                  }, 1000);
                } else {
                  setName({ name: '', title: 'Не добавлено', type: 'error' });
                  setTimeout(() => {
                    setName({ name: '', title: 'Добавить', type: 'primary' });
                  }, 1000);
                }
              }
            }}
            disabled={isAdding || name?.name.trim() === ''}
            color={name?.type}
          >
            {name?.title}
          </Button>
        </Stack>
        <Typography variant="body2" color="primary.main" sx={{ mt: 2 }}>
          {title}
        </Typography>
        <Stack
          sx={{
            height: 100,
            overflow: 'auto',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            p: 2,
          }}
        >
          {[
            ...values.filter((item) => (name.name !== '' ? item.name.includes(name.name) : item)),
          ].map((data) => (
            <FilterItem
              filter={data}
              key={data.id}
              deleteFilter={deleteFilter}
              editFilter={editFilter}
            />
          ))}
        </Stack>
      </Card>
    </Box>
  );
};

Form.propTypes = {
  values: PropTypes.array.isRequired,
  title: PropTypes.string,
  deleteFilter: PropTypes.func,
  editFilter: PropTypes.func,
  addFilter: PropTypes.func,
  isAdding: PropTypes.bool,
  parent: PropTypes.string,
};

export default Form;
