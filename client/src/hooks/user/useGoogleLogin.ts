import api from '@/api/api';
import { CredentialResponse } from '@react-oauth/google';
import { ErrorFunction } from '@shared/types/errorFunction.type';
import { LoginResponse } from '@shared/types/user.type';
import { useMutation } from '@tanstack/react-query';

// Both signup and login
export const googleLogin = async (credentialResponse: CredentialResponse) => {
  return (await api.post('/auth/googleLogin', { credential: credentialResponse.credential })).data;
};

export const useGoogleLogin = (
  onSuccess: (data: LoginResponse) => void,
  onError: ErrorFunction
) => {
  return useMutation({
    mutationFn: googleLogin,
    onSuccess,
    onError,
  });
};
