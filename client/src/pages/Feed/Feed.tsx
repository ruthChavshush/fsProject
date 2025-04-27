import Loader from '@/components/Loader';
import Posts from '@/components/Posts';
import SearchBar, { SearchByFilters, SearchQuery } from '@/components/SearchBar';
import { useGetPosts } from '@/hooks/post/useGetPosts';
import React from 'react';

const Feed: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState<SearchQuery>({
    searchBy: SearchByFilters.all,
    query: '',
  });
  const { data, isLoading } = useGetPosts(searchQuery);

  return (
    <>
      <SearchBar
        onSearch={({ query, searchBy }) => {
          setSearchQuery({ searchBy: searchBy as SearchByFilters, query });
        }}
      />
      {isLoading || !data ? <Loader /> : <Posts posts={data} />}
    </>
  );
};

export default Feed;
