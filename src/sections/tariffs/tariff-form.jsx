import PropTypes from 'prop-types';
import { keyframes } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';

import { Box, Card, Stack, Button, TextField, Typography } from '@mui/material';

import TariffTypeItem from './tariff-type-item';

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
const Form = ({ values, title, deleteFilter, editFilter, addFilter, isAdding }) => {
  console.log(values);

  const [name, setName] = useState({
    name: '',
    description: '',
    type: 'primary',
    title: 'Добавить',
    isAdding: false,
  });
  const [error, setError] = useState(false);
  const [items, setItems] = useState(
    [...values].sort((a, b) => a.promotion_level - b.promotion_level)
  );
  useEffect(() => {
    setItems([...values].sort((a, b) => a.promotion_level - b.promotion_level));
  }, [values]);

  useEffect(() => {
    if (values.map((item) => item.name).includes(name.name.trim())) {
      setError(true);
    } else {
      setError(false);
    }
  }, [values, name]);

  // Handle drag end event
  const handleDragEnd = (result) => {
    if (!result.destination) return; // Ignore if dropped outside

    const reorderedItems = [...items];
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    // Update promotion levels dynamically
    const updatedItems = reorderedItems.map((item, index) => ({
      ...item,
      promotion_level: index + 1,
    }));

    updatedItems.forEach(async (item) => {
      await editFilter(item);
    });

    setItems(updatedItems);
  };

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '100%' }}
    >
      <Card sx={{ p: 3, width: '100%' }}>
        <Stack direction="column">
          <Stack sx={{ width: '100%' }}>
            <TextField
              label="Название"
              variant="outlined"
              value={name?.name || ''}
              onChange={(e) => setName({ ...name, name: e.target.value })}
              error={error}
              fullWidth
              helperText={error ? 'Этот тип тарифа уже существует' : ''}
              sx={{
                animation: error ? `${shakeAnimation} 0.3s` : 'none',
                '& .MuiOutlinedInput-root': {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderWidth: 4,
                },
                '& .MuiInputLabel-root': {
                  color: 'text.disabled',
                },
              }}
            />
          </Stack>
          <Stack sx={{ width: '100%' }}>
            <TextField
              label="Описание"
              variant="outlined"
              value={name?.description || ''}
              onChange={(e) => setName({ ...name, description: e.target.value })}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0,
                  borderWidth: 4,
                },
                '& .MuiInputLabel-root': {
                  color: 'text.disabled',
                },
              }}
            />
          </Stack>
          <Button
            type="button"
            variant="contained"
            sx={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              height: 56,
              position: 'relative',
            }}
            onClick={async () => {
              if (name?.name.trim() !== '') {
                const response = await addFilter({
                  name: name.name.trim(),
                  description: name.description,
                  promotion_level: items.length + 1,
                });
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
            disabled={isAdding}
            color={name?.type}
          >
            {name?.title}
          </Button>
        </Stack>
        <Typography variant="body2" color="primary.main" sx={{ mt: 2 }}>
          {title}
        </Typography>

        {/* Draggable List */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tariff-list">
            {(provided) => (
              <Stack
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{
                  height: 200,
                  overflow: 'auto',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 1,
                }}
              >
                {items
                  .filter((item) => (name.name !== '' ? item.name.includes(name.name) : item))
                  .map((data, index) => (
                    <Draggable key={data.id} draggableId={String(data.id)} index={index}>
                      {(providedi) => (
                        <div
                          ref={providedi.innerRef}
                          {...providedi.draggableProps}
                          {...providedi.dragHandleProps}
                        >
                          <TariffTypeItem
                            filter={data}
                            deleteFilter={deleteFilter}
                            editFilter={editFilter}
                            index={data.promotion_level}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
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
};

export default Form;
