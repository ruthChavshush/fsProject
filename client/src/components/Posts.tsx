import { Divider, Grid } from '@mui/material';
import { Post as PostType } from '@shared/types/post.type';
import { Fragment } from 'react';
import Post from './Post';

type PostsProps = {
  posts: PostType[];
  isEditable?: boolean;
};

const Posts: React.FC<PostsProps> = ({ posts, isEditable = false }) => {
  return (
    <Grid
      item
      container
      sx={{
        justifyContent: 'center',
        flexDirection: 'row',
        // paddingX: '30vw',
        padding:"2%"
      }}
      gap={5}
    >
      {posts?.map((post: PostType, index) => (
          <Post post={post} key={post._id} isEditable={isEditable} />
      ))}
    </Grid>
  );
};

export default Posts;
