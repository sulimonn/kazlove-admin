// material-ui
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

// loader style
const LoaderWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 9001,
  width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2),
  },
  backgroundColor: theme.palette.background.paper,
}));

// ==============================|| Loader ||============================== //

const Loader = () => (
  <LoaderWrapper>
    <LinearProgress color="primary" />
  </LoaderWrapper>
);

export default Loader;
