import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import { Chip } from '@mui/material';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { alpha } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { NAV } from './config-layout';
import navConfig from './config-navigation';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();

  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const { rejected, unchecked } = useSelector((state) => state.menu);
  const pathname = usePathname();

  const active = pathname.includes(item.path);

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        my: 0.5,
        ...(active && {
          color: item.level === 1 ? 'primary.main' : 'text.primary',
          fontWeight: item.level === 1 ? 'fontWeightSemiBold' : 'fontWeightMedium',
          bgcolor: (theme) =>
            alpha(item.level === 1 ? theme.palette.primary.dark : theme.palette.primary.main, 0.15),
          '&:hover': {
            bgcolor: (theme) =>
              alpha(
                item.level === 1 ? theme.palette.primary.dark : theme.palette.primary.main,
                0.2
              ),
          },
        }),
      }}
    >
      {item.icon && (
        <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
          <Iconify icon={item.icon} width={24} height={24} />
        </Box>
      )}
      <Box
        component="span"
        sx={{ whiteSpace: 'nowrap', '&:first-letter': { textTransform: 'uppercase' } }}
        textTransform="lowercase"
      >
        {item.title.length > 16 ? `${item.title.slice(0, 16)}...` : item.title}
      </Box>
      {item?.id === 'unchecked' && (
        <Chip label={unchecked} size="small" sx={{ alignSelf: 'flex-end', ml: 'auto' }} />
      )}
      {item?.id === 'rejected' && (
        <Chip size="small" label={rejected} sx={{ alignSelf: 'flex-end', ml: 'auto' }} />
      )}
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};

// --------------------------------------------------------------------
