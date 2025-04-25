import api from '@/api/api';
import { EmptyFunction } from '@shared/types/emptyFunction.type';
import { ErrorFunction } from '@shared/types/errorFunction.type';
import { SignUpRequest } from '@shared/types/user.type';
import { useMutation } from '@tanstack/react-query';

export const signup = async (user: SignUpRequest) => {
  await api.post('/user/', { user });
};

export const useSignup = (onSuccess: EmptyFunction, onError: ErrorFunction) => {
  return useMutation({
    mutationFn: signup,
    onSuccess,
    onError,
  });
};
