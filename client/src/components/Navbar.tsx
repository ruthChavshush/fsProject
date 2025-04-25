import AppLogo from '@/assets/AppLogo.png';
import AuthContext from '@/contexts/AuthContext';
import useDialog from '@/hooks/useDialog';
import AddPost from '@/pages/AddPost/AddPost';
import { HOME_URL, LOGIN_URL, PROFILE_URL, SIGNUP_URL } from '@/router/router.const';
import { AppBar, Avatar, Box, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { isOpen, close, open } = useDialog();

  const handleNavigateProfile = () => {
    navigate(PROFILE_URL);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid container sx={{ alignItems: 'center' }} spacing={2}>
          <Grid item container sx={{ alignItems: 'center' }} xs={4}>
            <Grid item>
              <IconButton onClick={() => navigate(HOME_URL)}>
                <Box component="img" src={AppLogo} sx={{ width: '6vw' }} />
              </IconButton>
            </Grid>
            <Typography variant='h4' sx={{marginInline:"10px", color:"#0d2c7a", fontWeight:"700"}}>Sporty </Typography>
            {currentUser && (
              <Grid item>
                <Button color="secondary" onClick={open}>
                  Add Post
                </Button>
              </Grid>
            )}
          </Grid>

          <Grid item container sx={{ alignItems: 'center', justifyContent: 'flex-end' }} xs={8}>
            {currentUser ? (
              <>
                <Grid item>
                  <Button onClick={handleNavigateProfile}>
                    <Avatar
                      src={currentUser?.image ? `${VITE_BASE_URL}/${currentUser.image}` : ''}
                      sx={{ width: '3vw', height: '3vw' }}
                      onClick={handleNavigateProfile}
                    />
                  </Button>
                </Grid>
                <Grid item>
                  <Typography variant="body1" color="inherit">
                    Hello, {currentUser.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <LogoutButton />
                </Grid>
              </>
            ) : (
              <>
                <Grid item>
                  <Button color="secondary" onClick={() => navigate(LOGIN_URL)}>
                    SIGN IN
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="inherit" onClick={() => navigate(SIGNUP_URL)}>
                    SIGN UP
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
      {isOpen && <AddPost isOpen={isOpen} close={close} />}{' '}
    </AppBar>
  );
};

export default Navbar;
