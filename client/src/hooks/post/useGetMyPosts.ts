import api from '@/api/api';
import { Post } from '@shared/types/post.type';
import { useQuery } from '@tanstack/react-query';

export const USE_GET_POSTS_KEY = 'posts';

const getMyPosts = async () => {
  const res = await api.get<Post[]>(`/posts/my`);
  return res.data;
};

export const useGetMyPosts = () =>
  useQuery({
    queryKey: [USE_GET_POSTS_KEY],
    queryFn: () => getMyPosts(),
  });
