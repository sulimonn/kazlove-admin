import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_MAIN = theme.palette.primary.main;

  const SECONDARY_MAIN = theme.palette.secondary.main;

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 50,
        height: 50,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        zoomAndPan="magnify"
        preserveAspectRatio="xMidYMid meet"
        version="1.0"
        viewBox="101.39 67.88 173.11 232.54"
        width="50"
        height="50"
      >
        <defs>
          <g />
          <clipPath id="7bf95dab6e">
            <path
              d="M 102 67.878906 L 144 67.878906 L 144 109 L 102 109 Z M 102 67.878906 "
              clipRule="nonzero"
            />
          </clipPath>
          <clipPath id="6250348012">
            <path
              d="M 231 67.878906 L 273 67.878906 L 273 109 L 231 109 Z M 231 67.878906 "
              clipRule="nonzero"
            />
          </clipPath>
        </defs>
        <path
          fill={PRIMARY_MAIN}
          d="M 187.507812 261.894531 C 187.507812 261.894531 174.550781 249.167969 169.933594 243.453125 C 167.144531 240.019531 167.652344 232.734375 169.492188 228.011719 C 173.070312 218.824219 182.988281 210.386719 187.628906 205.878906 C 195.972656 197.792969 208.40625 185.960938 219.925781 174.769531 C 230.363281 164.628906 236.414062 156.257812 238.292969 148.144531 C 241.484375 134.339844 232.847656 117.648438 216.789062 115.050781 C 216.789062 115.050781 248.324219 104.507812 266.636719 134.621094 C 276.601562 151.027344 274.742188 166.683594 266.261719 180.3125 C 259.175781 191.6875 247.453125 201.035156 234.507812 214.089844 C 206.070312 242.753906 187.507812 261.894531 187.507812 261.894531 Z M 187.507812 261.894531 "
          fillOpacity="1"
          fillRule="evenodd"
        />
        <path
          fill={SECONDARY_MAIN}
          d="M 187.507812 205.996094 L 187.386719 205.875 C 179.058594 197.789062 166.621094 185.957031 155.097656 174.765625 C 144.660156 164.625 138.597656 156.253906 136.722656 148.140625 C 133.527344 134.335938 142.179688 117.644531 158.234375 115.046875 C 158.234375 115.046875 126.699219 104.503906 108.390625 134.617188 C 98.40625 151.023438 100.285156 166.679688 108.761719 180.3125 C 115.84375 191.6875 127.570312 201.035156 140.515625 214.089844 C 168.941406 242.753906 187.507812 261.894531 187.507812 261.894531 Z M 187.507812 205.996094 "
          fillOpacity="1"
          fillRule="evenodd"
        />
        <path
          fill={SECONDARY_MAIN}
          d="M 187.507812 130.433594 C 195.890625 130.433594 202.691406 137.234375 202.691406 145.617188 C 202.691406 154 195.890625 160.789062 187.507812 160.789062 C 179.125 160.789062 172.335938 154 172.335938 145.617188 C 172.335938 137.234375 179.121094 130.433594 187.507812 130.433594 Z M 187.507812 130.433594 "
          fillOpacity="1"
          fillRule="evenodd"
        />
        <g clipPath="url(#7bf95dab6e)">
          <path
            fill={SECONDARY_MAIN}
            d="M 122.941406 67.921875 C 134.25 67.921875 143.414062 77.097656 143.414062 88.40625 C 143.414062 99.714844 134.25 108.890625 122.941406 108.890625 C 111.621094 108.890625 102.457031 99.714844 102.457031 88.40625 C 102.457031 77.097656 111.621094 67.921875 122.941406 67.921875 Z M 122.941406 67.921875 "
            fillOpacity="1"
            fillRule="evenodd"
          />
        </g>
        <g clipPath="url(#6250348012)">
          <path
            fill={PRIMARY_MAIN}
            d="M 252.085938 67.921875 C 263.394531 67.921875 272.566406 77.097656 272.566406 88.40625 C 272.566406 99.714844 263.394531 108.890625 252.085938 108.890625 C 240.777344 108.890625 231.601562 99.714844 231.601562 88.40625 C 231.601562 77.097656 240.777344 67.921875 252.085938 67.921875 Z M 252.085938 67.921875 "
            fillOpacity="1"
            fillRule="evenodd"
          />
        </g>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
