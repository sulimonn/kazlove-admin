import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { Tooltip } from '@mui/material';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import { useDeleteUserMutation } from 'src/store/reducers/users';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ProfileTableRow({ profile, selected, handleClick, editProfile }) {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const router = useRouter();

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell align="center">{profile.id}</TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography
              color="text.primary"
              variant="subtitle2"
              noWrap
              component={Link}
              to={`/users/${profile.id}`}
            >
              {profile.name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography
              color="text.primary"
              variant="subtitle2"
              noWrap
              component={Link}
              to={`/users/${profile.id}`}
            >
              {profile.email}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="center">{profile.is_admin ? 'Да' : 'Нет'}</TableCell>
        <TableCell align="center">
          <Stack direction="row" spacing={1} justifyContent="center">
            {profile.checked === 0 && (
              <Tooltip title="Проверено">
                <IconButton
                  variant="contained"
                  onClick={async () => {
                    await editProfile({
                      ...profile,
                      services: '',
                      checked: 1,
                    });
                  }}
                >
                  <Iconify icon="eva:eye-fill" sx={{ width: 40, height: 40 }} />
                </IconButton>
              </Tooltip>
            )}
            {profile.approved === 0 && (
              <Tooltip
                title="Одобрить"
                onClick={async () => {
                  await editProfile({
                    ...profile,
                    approved: 1,
                    services: '',
                    checked: 1,
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
            {profile.approved === 1 && (
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
          </Stack>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem
          onClick={() => {
            router.push(`/users/${profile.id}`);
          }}
        >
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Редактировать
        </MenuItem>

        <MenuItem
          onClick={async () => {
            await deleteUser(profile.user_id);
          }}
          sx={{ color: 'error.main' }}
          disabled={isLoading}
        >
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Удалить
        </MenuItem>
      </Popover>
    </>
  );
}

ProfileTableRow.propTypes = {
  profile: PropTypes.object,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  editProfile: PropTypes.func,
};
