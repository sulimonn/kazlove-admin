import * as React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import { setSwiperFilter } from 'src/store/reducers/action';

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider({ filter }) {
  const dispatch = useDispatch();
  const defaultValue = (localStorage.getItem(filter.id) &&
    localStorage.getItem(filter.id).split(',').map(Number)) || [filter.min, filter.max];
  const [value, setValue] = React.useState(defaultValue);
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  // Debounce effect: only updates `debouncedValue` 200ms after user stops moving the slider
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  // Dispatch the action whenever the debounced value changes
  React.useEffect(() => {
    if (debouncedValue) {
      dispatch(setSwiperFilter({ id: filter.id, option: debouncedValue }));
    }
  }, [debouncedValue, dispatch, filter.id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', pt: { xs: 2, sm: 3 } }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        max={filter.max}
        min={filter.min}
        marks={[
          { value: filter.min, label: filter.min },
          { value: filter.max, label: filter.max },
        ]}
        step={filter.step}
      />
    </Box>
  );
}

RangeSlider.propTypes = {
  filter: PropTypes.object,
};
