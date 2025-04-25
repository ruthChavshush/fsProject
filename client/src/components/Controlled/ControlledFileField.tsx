/* eslint-disable @typescript-eslint/no-explicit-any */
// RenderTextField.tsx
import theme from '@/Theme';
import { Button, Typography } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface ControlledFileFieldProps {
  name: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  control: Control<any>;
  errors: FieldErrors<any>;
  handleFileChangeParent: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ControlledFileField: React.FC<ControlledFileFieldProps> = ({
  control,
  name,
  errors,
  fileInputRef,
  handleFileChangeParent,
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: any) => {
    field.onChange(event.target.files);
    handleFileChangeParent(event);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <Button onClick={() => fileInputRef.current?.click()}>Choose File</Button>
          <input
            type="file"
            ref={fileInputRef}
            hidden
            onChange={event => handleFileChange(event, field)}
          />
          {errors.image?.message && (
            <Typography sx={{ color: theme.palette.error.main }}>{getHelperText()}</Typography>
          )}
        </>
      )}
    />
  );
};

export default ControlledFileField;
