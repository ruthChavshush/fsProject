import theme from '@/Theme';
import { ButtonProps, TextFieldProps } from '@mui/material';
import { SxProps } from '@mui/system';

const baseField: SxProps = {
  backgroundColor: theme.palette.primary.contrastText,
  borderRadius: '4px',
};

const baseFieldProps: Omit<TextFieldProps, 'variant'> & { variant: 'outlined' } = {
  size: 'small',
  variant: 'outlined',
  required: true,
  fullWidth: true,
};

const button: SxProps = { mt: 3, mb: 2, borderRadius: '10px' };

const buttonProps: Omit<ButtonProps, 'variant'> & { variant: 'contained' } = {
  variant: 'contained',
  fullWidth: true,
  color: 'info',
};

export default { baseField, baseFieldProps, button, buttonProps };
