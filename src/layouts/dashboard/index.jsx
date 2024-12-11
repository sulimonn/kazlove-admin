import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import { useFetchProfilesQuery } from 'src/store/reducers/api';
import { setRejected, setUnchecked } from 'src/store/reducers/menu';

import Nav from './nav';
import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const { data: profiles = [] } = useFetchProfilesQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (profiles.length > 0) {
      dispatch(
        setRejected(profiles.filter((item) => item.checked === 1 && item.approved === 0).length)
      );
      dispatch(setUnchecked(profiles.filter((item) => item.checked === 0).length));
    }
  }, [profiles, dispatch]);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
