import api from '@/api/api';
import { ErrorFunction } from '@shared/types/errorFunction.type';
import { LoginRequest, LoginResponse } from '@shared/types/user.type';
import { useMutation } from '@tanstack/react-query';

export const login = async (user: LoginRequest) => {
  return (await api.post('/auth/login/', { user })).data;
};

export const useLogin = (onSuccess: (data: LoginResponse) => void, onError: ErrorFunction) => {
  return useMutation({
    mutationFn: login,
    onSuccess,
    onError,
  });
};
