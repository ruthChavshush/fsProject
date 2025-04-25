import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { PageWrapperCenter } from './PageWrapper';

const Fallback: React.FC = () => {
  return (
    <PageWrapperCenter
      container
      item
      sx={{ paddingX: '20vw', paddingY: '30vh', flexDirection: 'column' }}
    >
      <Grid item>
        <Typography variant={'h1'} color="error" fontWeight={600}>
          Oops... Something Happend 🙈
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant={'h4'} color={'error'}>
          Let's go back home and try again.
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color={'error'}
          sx={{ textDecoration: 'underline' }}
          onClick={() => window.location.reload()}
        >
          <Typography variant={'h4'} color={'error'} fontWeight={600}>
            Go Home
          </Typography>
        </Button>
      </Grid>
    </PageWrapperCenter>
  );
};

export default Fallback;
