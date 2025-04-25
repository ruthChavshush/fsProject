/* eslint-disable @typescript-eslint/no-explicit-any */
// RenderTextField.tsx
import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface ControlledTextFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  type?: string;
  errors: FieldErrors<any>;
  textfieldProps?: TextFieldProps;
}

const ControlledTextField: React.FC<ControlledTextFieldProps> = ({
  control,
  name,
  label,
  type,
  errors,
  textfieldProps,
}) => {
  const getHelperText = () => {
    const error = errors[name];
    if (error) {
      if (typeof error.message === 'string') {
        return error.message;
      }
    }
    return undefined;
  };

  return (
    <Controller 
      control={control}
      name={name}
      render={({ field, fieldState: { invalid } }) => (
        <TextField
          label={label}
          type={type}
          error={invalid}
          helperText={getHelperText()}
          fullWidth
          required
          {...field}
          {...textfieldProps}
          InputLabelProps={{ shrink: true }}
        />
      )}
    />
  );
};

export default ControlledTextField;
