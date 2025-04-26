/* eslint-disable no-nested-ternary */
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  Box,
  Stack,
  Table,
  alpha,
  Dialog,
  Button,
  Tooltip,
  Container,
  TableBody,
  IconButton,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  TableContainer,
  TablePagination,
  DialogContentText,
} from '@mui/material';

import { shufflePerPromotionLevel } from 'src/utils/format-number';

import { useFetchUsersQuery } from 'src/store/reducers/users';
import {
  useFetchCitiesQuery,
  useFetchProfilesQuery,
  useEditProfileMutation,
  useDeleteProfileMutation,
  useFetchTariffTypesQuery,
} from 'src/store/reducers/api';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import Loader from 'src/components/scrollbar/Loader';

import TableNoData from 'src/sections/user/table-no-data';
import UserTableHead from 'src/sections/user/user-table-head';
import { applyFilter, getComparator } from 'src/sections/user/utils';

import ProfileCard from '../profile-card';
import ProfileTableRow from '../profile-table-row';
import ProfileTableToolbar from '../profile-table-toolbar';

// ----------------------------------------------------------------------

export default function ProfilesView() {
  const { gender, weight, height, age, price, breast_size, services, city } = useSelector(
    (state) => state.action
  );

  const [viewAs, setViewAs] = useState('grid');

  const [filterName, setFilterName] = useState('');

  const { type } = useParams();
  const [users, setUsers] = useState([]);

  const { data = [], isFetching } = useFetchUsersQuery();
  const { data: profiles = [], isFetching: isFetchingProfiles } = useFetchProfilesQuery();
  const { data: tariffTypes = [], isFetching: isFetchingTariffTypes } = useFetchTariffTypesQuery();
  const { data: cities = [], isFetching: isFetchingCities } = useFetchCitiesQuery();
  const [editProfile] = useEditProfileMutation();
  const [deleteProfile] = useDeleteProfileMutation();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState({ open: false, id: null });
  useEffect(() => {
    const selectedCity = city?.id;

    if (profiles.length > 0 && tariffTypes.length > 0) {
      // Filter girls with promotion_level S based on conditions
      const filteredGirls = profiles.map((girl) => ({
        ...girl,
        tariff: {
          ...girl.tariff,
          type: tariffTypes.find((t) => t.id === girl.tariff.type),
        },
        promotion_level: tariffTypes.find((t) => t.id === girl.tariff.type)?.promotion_level,
      }));
      const promotionTop = shufflePerPromotionLevel(
        filteredGirls.filter(
          (girl) =>
            (girl.city?.id === selectedCity || selectedCity <= 0) && girl.promotion_level > 0
        )
      );

      let promotionStn = filteredGirls.filter(
        (girl) => !girl.promotion_level && girl.city?.id === selectedCity
      );

      if (typeof selectedCity === 'number' && selectedCity > 0) {
        promotionStn = promotionStn.filter((girl) => girl.city?.id === selectedCity);
      }

      if (gender.length > 0) {
        promotionStn = promotionStn.filter((girl) =>
          gender.map((g) => parseInt(g, 10)).includes(girl.gender?.id)
        );
      }

      if (services.length > 0) {
        const selectedServiceIds = services.map((s) => s.id);

        promotionStn = promotionStn.filter((girl) =>
          girl.services.some((service) => selectedServiceIds.includes(service.id))
        );
      }

      if (weight.length > 0) {
        promotionStn = promotionStn.filter(
          (girl) => girl.weight >= weight[0] && girl.weight <= weight[1]
        );
      }

      if (height.length > 0) {
        promotionStn = promotionStn.filter(
          (girl) => girl.height >= height[0] && girl.height <= height[1]
        );
      }

      if (age.length > 0) {
        promotionStn = promotionStn.filter((girl) => girl.age >= age[0] && girl.age <= age[1]);
      }

      if (price.length > 0) {
        promotionStn = promotionStn.filter(
          (girl) => girl.price >= price[0] && girl.price <= price[1]
        );
      }

      if (breast_size.length > 0) {
        promotionStn = promotionStn.filter(
          (girl) => girl.breast_size >= breast_size[0] && girl.breast_size <= breast_size[1]
        );
      }

      // Shuffle filtered S
      promotionStn = shufflePerPromotionLevel(promotionStn);

      const remainingStn = shufflePerPromotionLevel(
        filteredGirls.filter(
          (girl) =>
            !promotionStn.includes(girl) &&
            !promotionTop.includes(girl) &&
            girl.city?.id === selectedCity
        )
      );

      const remainingTop = shufflePerPromotionLevel(
        filteredGirls.filter(
          (girl) => girl.promotion_level > 0 && girl.city?.id !== selectedCity && selectedCity >= 0
        )
      );

      let remainingGirls = filteredGirls.filter(
        (girl) =>
          !promotionStn.includes(girl) &&
          !remainingTop.includes(girl) &&
          !promotionTop.includes(girl) &&
          girl.city?.id !== selectedCity
      );

      remainingGirls = shufflePerPromotionLevel(remainingGirls);

      // Combine all arrays in the desired order
      const finalGirls = [
        ...promotionTop,
        ...promotionStn,
        ...remainingStn,
        ...remainingTop,
        ...remainingGirls,
      ];

      if (type === 'unchecked') {
        setUsers(finalGirls.filter((profile) => profile.checked === 0));
      } else if (type === 'rejected') {
        const result = finalGirls.filter(
          (profile) => profile.approved === 0 && profile.checked === 1
        );

        setUsers(result);
      } else if (type === 'active') {
        setUsers(finalGirls.filter((profile) => profile.approved === 1));
      } else {
        setUsers(finalGirls);
      }
    }
  }, [
    type,
    data,
    city,
    gender,
    weight,
    height,
    age,
    price,
    breast_size,
    services,
    profiles,
    tariffTypes,
  ]);
  const handleClickOpen = (id) => {
    setOpen({ open: true, id });
  };

  const handleClose = () => {
    setOpen({ open: false, id: null });
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
    field: 'name',
  });

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const notFound = !dataFiltered.length && !!filterName;

  return isFetchingProfiles || isFetchingTariffTypes || isFetchingCities || isFetching ? (
    <Loader />
  ) : (
    <Container>
      <Dialog
        open={open.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Вы действительно хотите удалить профиль?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Нажав на кнопку &quot;Да, удалить&quot;, профиль будет удалён безвозвратно
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Отменить
          </Button>
          <Button
            onClick={async () => {
              await deleteProfile(open.id);
              handleClose();
            }}
            autoFocus
            color="error"
          >
            Да, удалить
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {type === 'unchecked'
          ? 'Не проверенные анкеты'
          : type === 'rejected'
          ? 'Отклоненные анкеты'
          : 'Активные анкеты'}
      </Typography>

      <ProfileTableToolbar
        filterName={filterName}
        setFilterName={handleFilterByName}
        viewAs={viewAs}
        setViewAs={setViewAs}
        cities={cities}
      />

      {viewAs === 'grid' ? (
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {users
            .filter((item) =>
              filterName !== '' ? item.name.toLowerCase().includes(filterName.toLowerCase()) : item
            )
            .map((item) => {
              const profile = {
                ...item,
                city_id: item.city?.id,
                gender_id: item.gender?.id,
                profile_type_id: item.profile_type?.id,
              };
              return (
                <Box
                  key={profile.id}
                  sx={{
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                    position: 'relative',
                    opacity: profile.hidden === 0 ? 1 : 0.5,
                  }}
                  bgcolor={
                    profile.hidden === 0
                      ? 'background.paper'
                      : (theme) => alpha(theme.palette.grey[900], 0.72)
                  }
                  borderRadius={2}
                  maxWidth={400}
                >
                  {profile.hidden === 1 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 9,
                        pointerEvents: 'none',
                      }}
                    >
                      <Stack
                        direction="column"
                        spacing={1}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Iconify
                          icon="material-symbols:visibility-off-rounded"
                          sx={{ width: 80, height: 80 }}
                        />
                        <Typography variant="h4" sx={{ mt: 2 }}>
                          Скрытая анкета
                        </Typography>
                      </Stack>
                    </Box>
                  )}
                  {profile?.tariff?.id && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'primary.main',
                        borderRadius: 1,
                        p: 1,
                        zIndex: 10,
                      }}
                    >
                      <Typography variant="body1" sx={{ color: 'common.white' }}>
                        {profile?.tariff?.type?.name}
                      </Typography>
                    </Box>
                  )}
                  <ProfileCard girl={profile} />
                  <Stack direction="row" spacing={1} justifyContent="space-between">
                    {profile.approved === 0 && (
                      <Tooltip
                        title="Одобрить"
                        onClick={async () => {
                          await editProfile({
                            ...profile,
                            approved: true,
                            services: [],
                            checked: true,
                          });
                        }}
                      >
                        <IconButton variant="contained">
                          <Iconify
                            icon="eva:checkmark-fill"
                            color="success.main"
                            sx={{ width: 40, height: 40 }}
                          />
                        </IconButton>
                      </Tooltip>
                    )}
                    {(profile.approved === 1 || profile.checked === 0) && (
                      <Tooltip title="Отклонить">
                        <IconButton
                          variant="contained"
                          onClick={async () => {
                            await editProfile({
                              ...profile,
                              approved: 0,
                              services: [],
                              checked: 1,
                            });
                          }}
                        >
                          <Iconify
                            icon="eva:close-fill"
                            sx={{ width: 40, height: 40 }}
                            color="warning.main"
                          />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Удалить">
                      <IconButton variant="contained" onClick={() => handleClickOpen(profile.id)}>
                        <Iconify
                          icon="eva:trash-2-outline"
                          sx={{ width: 40, height: 40 }}
                          color="error.main"
                        />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>
              );
            })}
        </Box>
      ) : (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'id', label: 'ID', align: 'center' },
                    { id: 'name', label: 'Имя', align: 'left' },
                    { id: 'email', label: 'Email' },
                    { id: 'is_admin', label: 'Доступ админа', align: 'center' },
                    {
                      id: 'action_type',
                      label:
                        type === 'rejected'
                          ? 'Одобрить'
                          : type === 'active'
                          ? 'Отклонить'
                          : 'Проверено',
                      align: 'center',
                      sortable: false,
                    },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const profile = {
                        ...row,
                        city_id: row.city?.id,
                        gender_id: row.gender?.id,
                        profile_type_id: row.profile_type?.id,
                      };
                      return (
                        <ProfileTableRow
                          editProfile={editProfile}
                          key={row.id}
                          profile={profile}
                          selected={selected.indexOf(row.name) !== -1}
                          handleClick={(event) => handleClick(event, row.name)}
                        />
                      );
                    })}

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            page={page}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Stack>
      )}
    </Container>
  );
}
