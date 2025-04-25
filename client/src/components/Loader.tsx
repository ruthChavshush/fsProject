import { Box, CircularProgress, SxProps } from '@mui/material';
import React from 'react';

const Loader: React.FC = () => {
  const loaderBox: SxProps = {
    flexGrow: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5vh'
  };

  return (
    <Box sx={loaderBox}>
      <CircularProgress color="primary" />
    </Box>
  );
};

export default Loader;
