import React from 'react';
import PropTypes from 'prop-types';

import {
  Stack,
  Button,
  Accordion,
  TextField,
  Typography,
  IconButton,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from '@mui/material';

import {
  useEditTypeMutation,
  useAddServiceMutation,
  useDeleteTypeMutation,
} from 'src/store/reducers/api';

import Iconify from 'src/components/iconify';

import ServiceItem from './service-item';

const ServiceTypeItem = ({ serviceType: initialServiceType, expanded, handleChange, refetch }) => {
  const [edit, setEdit] = React.useState(false);
  const [serviceType, setServiceType] = React.useState(initialServiceType);
  const [editServiceType, { isLoading: isEditing }] = useEditTypeMutation();
  const [deleteServiceType, { isLoading: isDeleting }] = useDeleteTypeMutation();
  const [addService, { isLoading: isAddingService }] = useAddServiceMutation();
  const [newService, setNewService] = React.useState({ profile_type_id: serviceType.id });
  const [name, setName] = React.useState({
    name: '',
    type: 'primary',
    title: 'Добавить',
    isAdding: false,
  });

  return (
    <Accordion expanded={expanded === serviceType.id} onChange={handleChange(serviceType.id)}>
      <AccordionSummary aria-controls={serviceType.id} id={serviceType.id} sx={{ width: '100%' }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Iconify
              icon={expanded ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            />
            {edit ? (
              <TextField
                size="small"
                type="text"
                value={serviceType.name}
                onChange={(e) => {
                  setServiceType({ ...serviceType, name: e.target.value });
                }}
                autoFocus={edit}
                variant="standard"
              />
            ) : (
              <Typography variant="h5" sx={{ '&::first-letter': { textTransform: 'uppercase' } }}>
                {serviceType.name}
              </Typography>
            )}
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1}>
          {edit ? (
            <IconButton
              onClick={async () => {
                await editServiceType(serviceType);
                setEdit(!edit);
              }}
              disabled={isEditing || serviceType.name.trim() === ''}
            >
              {!isEditing ? <Iconify icon="carbon:checkmark" /> : <CircularProgress size={20} />}
            </IconButton>
          ) : (
            <IconButton onClick={() => setEdit(!edit)}>
              <Iconify icon="carbon:edit" />
            </IconButton>
          )}
          <IconButton
            onClick={async () => {
              await deleteServiceType(serviceType.id);
            }}
            disabled={isDeleting}
          >
            {isDeleting ? <CircularProgress size={20} /> : <Iconify icon="eva:trash-2-fill" />}
          </IconButton>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={2}>
          <Stack direction="row">
            <TextField
              fullWidth
              label="Новая услуга"
              variant="outlined"
              value={newService.name || ''}
              onChange={(e) => {
                setNewService({ ...newService, name: e.target.value });
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderBottomRightRadius: 0,
                  borderTopRightRadius: 0,
                  p: 1,
                },
                '& input': {
                  p: 1,
                },
              }}
            />
            <Button
              variant="contained"
              onClick={async () => {
                if (newService?.name.trim() !== '') {
                  const response = await addService({
                    name: newService.name.trim(),
                    profile_type_id: serviceType.id,
                  });
                  if (!response?.error) {
                    setName({ name: '', title: 'Добавлено', type: 'success' });
                    await refetch();
                    setServiceType({
                      ...serviceType,
                      services: [...serviceType.services, response?.data],
                    });

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
              disabled={isAddingService || newService.name?.trim() === ''}
              sx={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              color={name?.type}
            >
              {name?.title}
            </Button>
          </Stack>
          {serviceType.services.map((service) => (
            <ServiceItem
              key={service.id}
              service={service}
              parentType={serviceType.id}
              setServiceType={setServiceType}
            />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

ServiceTypeItem.propTypes = {
  serviceType: PropTypes.object,
  expanded: PropTypes.bool,
  handleChange: PropTypes.func,
  refetch: PropTypes.func,
};
export default ServiceTypeItem;
