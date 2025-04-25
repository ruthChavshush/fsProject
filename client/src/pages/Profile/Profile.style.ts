import theme from '@/Theme';
import { SxProps } from '@mui/material';

const profileImage: SxProps = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.secondary.dark,
};

export default { profileImage };
