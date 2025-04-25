import api from '@/api/api';
import { EmptyFunction } from '@shared/types/emptyFunction.type';
import { ErrorFunction } from '@shared/types/errorFunction.type';
import { upsertPost as UpsertPostType } from '@shared/types/post.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USE_GET_POSTS_KEY } from './useGetPosts';

const upsertPost = async (formData: UpsertPostType) => {
  await api.post<UpsertPostType>('/posts/upsert', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useUpsertPost = (onSuccess: EmptyFunction, onError: ErrorFunction) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: UpsertPostType) => upsertPost(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_POSTS_KEY] });
      onSuccess();
    },
    onError,
  });
};
