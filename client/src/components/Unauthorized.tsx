import { HOME_URL } from '@/router/router.const';
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageWrapperCenter } from './PageWrapper';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageWrapperCenter container item sx={{ paddingX: '20vw', paddingY:'30vh', flexDirection: 'column' }}>
      <Grid item>
        <Typography variant={'h1'} color="error" fontWeight={600}>
          Unauthorized
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant={'h4'} color={'primary.light'}>
          You are not authorized to access this page.
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color={'error'}
          sx={{ textDecoration: 'underline' }}
          onClick={() => navigate(HOME_URL)}
        >
          <Typography variant={'h4'} color={'error'} fontWeight={600}>
            Go Home
          </Typography>
        </Button>
      </Grid>
    </PageWrapperCenter>
  );
};

export default Unauthorized;
