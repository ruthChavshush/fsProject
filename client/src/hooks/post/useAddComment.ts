import api from '@/api/api';
import { ErrorFunction } from '@shared/types/errorFunction.type';
import { Post } from '@shared/types/post.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { USE_GET_POSTS_KEY } from './useGetPosts';

type useAddCommentProps = {
  comment: string;
  postId: string;
};

const addComment = async ({ comment, postId }: useAddCommentProps) => {
  console.log(comment);
  await api.put<Post>(`/posts/comment/${postId}`, { comment });
};

export const useAddComment = (onError: ErrorFunction) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ comment, postId }: useAddCommentProps) => addComment({ comment, postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USE_GET_POSTS_KEY] });
    },
    onError,
  });
};
