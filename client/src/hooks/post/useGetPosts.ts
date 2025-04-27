import api from '@/api/api';
import { SearchQuery } from '@/components/SearchBar';
import { Post } from '@shared/types/post.type';
import { useQuery } from '@tanstack/react-query';

export const USE_GET_POSTS_KEY = 'posts';

const getPosts = async (filters?: SearchQuery) => {
  const params = new URLSearchParams();
  if (filters?.searchBy && filters?.query) {
    params.append(filters.searchBy, filters.query);
  }

  const res = await api.get<Post[]>(`/posts`, { params });

  return res.data;
};

export const useGetPosts = (filters?: SearchQuery) =>
  useQuery({
    queryKey: [USE_GET_POSTS_KEY, filters],
    queryFn: () => getPosts(filters),
  });
