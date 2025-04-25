import AppLogo from '@/assets/AppLogo.png';
import ControlledTextField from '@/components/Controlled/ControlledTextField';
import { PageWrapperCenter } from '@/components/PageWrapper';
import { useSignup } from '@/hooks/user/useSignup';
import { LOGIN_URL } from '@/router/router.const';
import { onError } from '@/utils/onError';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { mapFormToPayload, UserForm } from './Signup.config';
import { createUserSchema } from './Signup.schema';

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const onSuccess = () => {
    Swal.fire({ icon: 'success', title: 'User added successfully' });
    navigate(LOGIN_URL);
  };

  const { mutate: signup } = useSignup(onSuccess, onError);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<UserForm>({
    resolver: yupResolver(createUserSchema()),
    values: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = (data: UserForm) => {
    signup(mapFormToPayload(data));
  };

  return (
    <PageWrapperCenter container item sx={{ paddingX: '20vw' }} spacing={2}>
      <Grid item>
        <Box component="img" src={AppLogo} sx={{ width: '10vw' }} />
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={6} sm={6}>
          <ControlledTextField name="name" label="Name" control={control} errors={errors} /> 
        </Grid>
        <Grid item xs={6} sm={6}>
          <ControlledTextField name="email" label="Email" control={control} errors={errors} />
        </Grid>
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

      <Grid item container>
        <ControlledTextField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          control={control}
          errors={errors}
        />
      </Grid>

      <Grid item>
        <Button onClick={handleSubmit(onSubmit)} sx={{ padding: '1vw' }}>
          Sign Up
        </Button>
      </Grid>
    </PageWrapperCenter>
  );
};

export default SignUp;
