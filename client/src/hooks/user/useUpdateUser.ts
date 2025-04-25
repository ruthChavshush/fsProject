import api from '@/api/api';
import { ErrorFunction } from '@shared/types/errorFunction.type';
import { UpdateUser, User } from '@shared/types/user.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USE_GET_POSTS_KEY } from '../post/useGetPosts';

export const updateUser = async (user: UpdateUser) => {
  return (
    await api.put('/user/', user, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  ).data;
};

export const useUpdateUser = (onSuccess: (data: User) => void, onError: ErrorFunction) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: UpdateUser) => updateUser(user),
    onSuccess: (data: User) => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_POSTS_KEY] });
      onSuccess(data);
    },
    onError,
  });
};
