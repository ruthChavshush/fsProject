import AppLogo from '@/assets/AppLogo.png';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { PageWrapperCenter } from './PageWrapper';

const Welcome: React.FC = () => {
  return (
    <PageWrapperCenter direction={'column'} container item>
      <Grid item>
        <Box component="img" src={AppLogo} sx={{ width: '20vw', maxWidth: '40vw' }} />
      </Grid>
      <Grid item>
        <Typography variant='h1'  sx={{fontSize:"5rem", color:"#0d2c7a"}} >Sporty</Typography>
      </Grid>
    </PageWrapperCenter>
  );
};

export default Welcome;
