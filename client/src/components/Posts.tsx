import { Grid, Typography } from '@mui/material';
import { Post as PostType } from '@shared/types/post.type';
import Post from './Post';

type PostsProps = {
  posts: PostType[];
  isEditable?: boolean;
};

const Posts: React.FC<PostsProps> = ({ posts, isEditable = false }) => {
  return posts.length > 0 ? (
    <Grid
      item
      container
      sx={{
        justifyContent: 'center',
        flexDirection: 'row',
        padding: '2%',
      }}
      gap={5}
    >
      {posts.map((post: PostType) => (
        <Post post={post} key={post._id} isEditable={isEditable} />
      ))}
    </Grid>
  ) : (
    <Typography sx={{ display: 'flex', justifyContent: 'center' }}>לא נמצאו נתונים</Typography>
  );
};

export default Posts;
