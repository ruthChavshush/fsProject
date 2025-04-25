import AppLogo from '@/assets/AppLogo.png';
import ControlledTextField from '@/components/Controlled/ControlledTextField';
import { PageWrapperCenter } from '@/components/PageWrapper';
import AuthContext from '@/contexts/AuthContext';
import { useGoogleLogin } from '@/hooks/user/useGoogleLogin';
import { useLogin } from '@/hooks/user/useLogin';
import { HOME_URL } from '@/router/router.const';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Divider, Grid } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { LoginRequest, LoginResponse } from '@shared/types/user.type';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginUserSchema } from './Login.schema';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login: loginAuth } = useContext(AuthContext);

  const onSuccess = (data: LoginResponse) => {
    loginAuth(data.user, data.accessToken, data.refreshToken);
    navigate(HOME_URL);
  };
  const onError = (error?: Error) =>
    Swal.fire({ icon: 'error', title: 'Error', text: error?.message });

  const { mutate: login } = useLogin(onSuccess, onError);
  const { mutate: loginGoogle } = useGoogleLogin(onSuccess, onError);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginUserSchema()),
    values: { email: '', password: '' },
  });

  const onSubmit = (user: LoginRequest) => {
    login(user);
  };

  return (
    <PageWrapperCenter container item sx={{ paddingX: '20vw' }} spacing={2}>
      <Grid item>
        <Box component="img" src={AppLogo} sx={{ mt:'10px',width: '10vw', height:"10%" }} />
      </Grid>
      <Grid item container>
        <ControlledTextField
          name="email"
          label="Email"
          control={control}
          errors={errors}
          textfieldProps={{
            autoFocus: true,
          }}
        />
      </Grid>
      <Grid item container>
        <ControlledTextField
          name="password"
          label="Password"
          type="password"
          control={control}
          errors={errors}
        />
      </Grid>

      <Grid item>
        <Button onClick={handleSubmit(onSubmit)} sx={{ padding: '1vw' }}>
          Log In
        </Button>
      </Grid>

      <Divider
        sx={{
          width: '100%',
          fontSize: '0.8rem',
          fontWeight: '400',
        }}
      >
        OR
      </Divider>
      <Grid item sx={{ padding: '1vw' }}>
        <GoogleLogin onSuccess={loginGoogle} onError={onError} />
      </Grid>
    </PageWrapperCenter>
  );
};

export default Login;
