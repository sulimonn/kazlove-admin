import PropTypes from 'prop-types';

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useResponsive } from 'src/hooks/use-responsive';

import { useAuth } from 'src/contexts';
import { bgBlur } from 'src/theme/css';

import Iconify from 'src/components/iconify';

import { NAV, HEADER } from './config-layout';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();
  const { logout } = useAuth();

  const lgUp = useResponsive('up', 'lg');

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ justifySelf: 'flex-end', ml: 'auto' }}
      >
        <Button
          color="primary"
          endIcon={<Iconify icon="eva:log-out-fill" />}
          onClick={() => {
            logout();
          }}
        >
          Выйти
        </Button>
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
