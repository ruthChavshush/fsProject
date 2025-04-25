import api from '@/api/api';
import { REFRESH_TOKEN_STORAGE_ITEM } from '@/contexts/AuthContext';
import { ErrorFunction } from '@shared/types/errorFunction.type';
import { useMutation } from '@tanstack/react-query';

export const logout = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_ITEM) as string;
  await api.post('/auth/logout/', {refreshToken});
};

export const useLogout = (onSuccess: () => void, onError: ErrorFunction) => {
  return useMutation({
    mutationFn: logout,
    onSuccess,
    onError,
  });
};
