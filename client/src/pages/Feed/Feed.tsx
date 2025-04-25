import Loader from '@/components/Loader';
import Posts from '@/components/Posts';
import { useGetPosts } from '@/hooks/post/useGetPosts';

const Feed: React.FC = () => {
  const { data, isLoading } = useGetPosts();

  return isLoading || !data ? <Loader /> : <Posts posts={data} />;
};

export default Feed;
