/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface ControlledAutocompleteProps {
  control: Control<any>;
  name: string;
  label: string;
  errors: FieldErrors<any>;
  options: string[];
}

const ControlledAutocomplete: React.FC<ControlledAutocompleteProps> = ({
  control,
  name,
  label,
  errors,
  options,
}) => {
  const getHelperText = () => {
    const error = errors[name];
    if (error && typeof error.message === 'string') {
      return error.message;
    }
    return undefined;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { invalid } }) => (
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option}
          isOptionEqualToValue={(option, val) => option === val}
          value={value || null}
          onChange={(_, data) => onChange(data)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={invalid}
              helperText={getHelperText()}
              required
              InputLabelProps={{shrink: true}}
            />
          )}
        />
      )}
    />
  );
};

export default ControlledAutocomplete;
