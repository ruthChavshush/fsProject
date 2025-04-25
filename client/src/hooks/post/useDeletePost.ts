import api from '@/api/api';
import { ErrorFunction } from '@shared/types/errorFunction.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USE_GET_POSTS_KEY } from './useGetPosts';

const deletePost = async (postId: string) => {
  console.log('delete post: ' + postId);
  await api.delete(`/posts/${postId}`);
};

export const useDeletePost = (onError: ErrorFunction) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_POSTS_KEY] });
    },
    onError,
  });
};
