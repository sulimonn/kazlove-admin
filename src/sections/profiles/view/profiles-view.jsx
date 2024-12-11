/* eslint-disable no-nested-ternary */
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  Box,
  Stack,
  Table,
  Tooltip,
  Container,
  TableBody,
  IconButton,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { useFetchUsersQuery } from 'src/store/reducers/users';
import { useEditProfileMutation } from 'src/store/reducers/api';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from 'src/sections/user/table-no-data';
import UserTableHead from 'src/sections/user/user-table-head';
import { applyFilter, getComparator } from 'src/sections/user/utils';

import ProfileCard from '../profile-card';
import ProfileTableRow from '../profile-table-row';
import ProfileTableToolbar from '../profile-table-toolbar';

// ----------------------------------------------------------------------

export default function ProfilesView() {
  const { gender, weight, height, age, price, breast_size, services } = useSelector(
    (state) => state.action
  );

  const [viewAs, setViewAs] = useState('grid');

  const [filterName, setFilterName] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);

  const { type } = useParams();
  const [users, setUsers] = useState([]);

  const { data = [] } = useFetchUsersQuery();
  const [editProfile] = useEditProfileMutation();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  useEffect(() => {
    if (data.length > 0) {
      let filteredGirls = data
        .filter((girl) => girl.profile)
        .map((girl) => ({ ...girl, ...girl.profile }));

      if (selectedCity?.id) {
        filteredGirls = filteredGirls.filter((girl) => girl.city?.id === selectedCity.id);
      }

      if (gender.length > 0) {
        filteredGirls = filteredGirls.filter((girl) =>
          gender.map((g) => parseInt(g, 10)).includes(girl.gender?.id)
        );
      }

      if (services.length > 0) {
        filteredGirls = filteredGirls.filter((girl) =>
          services
            .map((s) => parseInt(s.id, 10))
            .map((s) => s)
            .includes(girl.profile_type?.id)
        );
      }

      if (weight.length > 0) {
        filteredGirls = filteredGirls.filter(
          (girl) => girl.weight >= weight[0] && girl.weight <= weight[1]
        );
      }

      if (height.length > 0) {
        filteredGirls = filteredGirls.filter(
          (girl) => girl.height >= height[0] && girl.height <= height[1]
        );
      }

      if (age.length > 0) {
        filteredGirls = filteredGirls.filter((girl) => girl.age >= age[0] && girl.age <= age[1]);
      }

      if (price.length > 0) {
        filteredGirls = filteredGirls.filter(
          (girl) => girl.price >= price[0] && girl.price <= price[1]
        );
      }

      if (breast_size.length > 0) {
        filteredGirls = filteredGirls.filter(
          (girl) => girl.breast_size >= breast_size[0] && girl.breast_size <= breast_size[1]
        );
      }

      if (type === 'unchecked') {
        setUsers(filteredGirls.filter((profile) => profile.checked === 0));
      } else if (type === 'rejected') {
        setUsers(
          filteredGirls.filter((profile) => profile.approved === 0 && profile.checked === 1)
        );
      } else if (type === 'active') {
        setUsers(filteredGirls.filter((profile) => profile.approved === 1));
      } else {
        setUsers(filteredGirls);
      }
    }
  }, [type, data, selectedCity, gender, weight, height, age, price, breast_size, services]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {type === 'unchecked'
          ? 'Не проверенные анкеты'
          : type === 'rejected'
          ? 'Отклоненные анкеты'
          : 'Активные анкеты'}
      </Typography>

      <ProfileTableToolbar
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        filterName={filterName}
        setFilterName={handleFilterByName}
        viewAs={viewAs}
        setViewAs={setViewAs}
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
                  sx={{
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                    position: 'relative',
                  }}
                  bgcolor="background.paper"
                  borderRadius={2}
                  maxWidth={400}
                >
                  <ProfileCard girl={profile} />
                  <Stack direction="row" spacing={1} justifyContent="space-between">
                    {profile.approved === 0 && (
                      <Tooltip
                        title="Одобрить"
                        onClick={async () => {
                          await editProfile({
                            ...profile,
                            approved: true,
                            services: '',
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
                              services: '',
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
                      <IconButton variant="contained">
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
