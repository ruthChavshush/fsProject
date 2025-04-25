import { Grid, styled } from '@mui/material';

export const PageWrapperCenter = styled(Grid)(() => ({
  justifyContent: 'center',
  alignItems: 'center',
}));


export const PageWrapperStart = styled(Grid)(() => ({
  justifyContent: 'start',
  alignItems: 'center',
}));

export default { PageWrapperCenter, PageWrapperStart };
