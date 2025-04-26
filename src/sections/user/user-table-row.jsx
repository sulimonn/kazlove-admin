import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useDeleteUserMutation } from 'src/store/reducers/users';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({ id, selected, email, avatarUrl, is_admin, handleClick }) {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const router = useRouter();

  const [openMenu, setOpenMenu] = useState(null);
  const [open, setOpen] = useState(false);
  // const [isDeleted, setIsDeleted] = useState({ isDeleted: false, success: false });

  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Вы действительно хотите удалить?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Нажав на кнопку &quot;Да, удалить&quot;, пользователь {email} будет удалён безвозвратно
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Отменить
          </Button>
          <Button
            onClick={async () => {
              const response = await deleteUser(id);

              console.log(response);
            }}
            autoFocus
            color="error"
          >
            Да, удалить
          </Button>
        </DialogActions>
      </Dialog>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell align="center">{id}</TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={email} src={avatarUrl} />
            <Typography
              color="text.primary"
              variant="subtitle2"
              noWrap
              component={Link}
              to={`/users/${id}`}
            >
              {email}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="center">{is_admin ? 'Да' : 'Нет'}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openMenu}
        anchorEl={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem
          onClick={() => {
            router.push(`/users/${id}`);
          }}
        >
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Редактировать
        </MenuItem>

        <MenuItem onClick={handleClickOpen} sx={{ color: 'error.main' }} disabled={isLoading}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Удалить
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  handleClick: PropTypes.func,
  is_admin: PropTypes.any,
  email: PropTypes.any,
  selected: PropTypes.any,
  id: PropTypes.number,
};
