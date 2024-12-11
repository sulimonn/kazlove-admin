import * as React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useAutocomplete } from '@mui/base/useAutocomplete';
import { autocompleteClasses } from '@mui/material/Autocomplete';

import Iconify from 'src/components/iconify';

const Root = styled('div')(
  ({ theme }) => `
  color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'};
  font-size: 14px;
  position: relative;
  width: 100%;
`
);

const InputWrapper = styled('div')(
  ({ theme }) => `
  width: 100%;
  border: 1px solid ${theme.palette.mode === 'dark' ? 'white' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? 'transparent' : '#fff'};
  border-radius: 4px;
  padding: 6px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#ff66c4' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#ff66c4' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? 'transparent' : '#fff'};
    color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'};
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

const Listbox = styled('ul')(
  ({ theme }) => `
  width: 100%;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #ff66c4;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);

export default function Services({ value, values, setValues }) {
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    value, // Fully controlled value
    multiple: true,
    options: values,
    getOptionLabel: (option) => option.name,
    onChange: (event, newValue) => {
      setValues(newValue);
    },
    isOptionEqualToValue: (option, newValue) => option.id === newValue.id,
  });

  return (
    <Root>
      <div {...getRootProps()} style={{ marginTop: '10px' }}>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.slice(0, 10).map((option, index) => {
            const { key, ...optionProps } = getOptionProps({ option, index });

            return (
              <li key={key} {...optionProps}>
                <span>{option.name}</span>
                <Iconify icon="carbon:checkmark" fontSize="small" />
              </li>
            );
          })}
        </Listbox>
      ) : null}
    </Root>
  );
}

Services.propTypes = {
  value: PropTypes.array,
  values: PropTypes.array,
  setValues: PropTypes.func,
};
