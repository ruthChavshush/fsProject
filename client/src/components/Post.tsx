import AppLogo from '@/assets/AppLogo.png';
import AuthContext from '@/contexts/AuthContext';
import { useDeletePost } from '@/hooks/post/useDeletePost';
import { useLikePost } from '@/hooks/post/useLikePost';
import useDialog from '@/hooks/useDialog';
import AddPost from '@/pages/AddPost/AddPost';
import { formatDate } from '@/utils/formatDate.util';
import { onError } from '@/utils/onError';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Button, Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { Post as PostType } from '@shared/types/post.type';
import React, { useContext, useMemo } from 'react';
import CommentSection from './Comment/CommentSection';
import AddCommentIcon from '@mui/icons-material/AddComment';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

type PostProps = {
  post: PostType;
  isEditable?: boolean;
};

const Post: React.FC<PostProps> = ({ post, isEditable = false }) => {
  const { isOpen: isOpenComment, close: closeComment, open: openComment } = useDialog();
  const { isOpen: isOpenPost, close: closePost, open: openPost } = useDialog();
  const { currentUser } = useContext(AuthContext);
  const formattedWhen = useMemo(() => formatDate(post.when), [post?.when]);

  const { mutate: likePost } = useLikePost(onError);
  const { mutate: deletePost } = useDeletePost(onError);

  const handleLike = () => {
    likePost({ postId: post._id, userId: currentUser?._id ?? '' });
  };

  const handleDelete = () => {
    deletePost(post._id);
  };

  return (
    <Paper sx={{ 
        width:"25vw", backgroundColor:"white"}}>
    <Grid
      container
      item
      sx={{
        padding: '3vh 3vh',
        flexDirection: 'column',
       
        }}
        spacing={2}
    >
      <Grid item container sx={{ alignItems: 'center' }} spacing={2}>
        <Grid item container xs={1.5} sx={{ justifyContent: 'center' }}>
          <Avatar src={post.user?.image ? `${VITE_BASE_URL}/${post.user.image}` : ''} />
        </Grid>
        <Grid container item sx={{ flexDirection: 'column' }} xs={8}>
          <Grid container item>
            <Typography color="primary" variant="body1">
              {post.user?.name || 'user-not-found'}
            </Typography>
            &nbsp;
            <Typography color="primary" variant="body1">
              |
            </Typography>
            &nbsp;
            <Typography color="primary" variant="body1">
              {post.sportType}
            </Typography>
          </Grid>
          <Grid container item>
            <Typography color="secondary" variant="body2">
              {formattedWhen}
            </Typography>
            &nbsp;
            <Typography color="secondary" variant="body2">
              |
            </Typography>
            &nbsp;
            <Typography color="secondary" variant="body2">
              {post.location}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={2.5} sx={{ justifyContent: 'flex-end' }}>
          {isEditable && (
            <>
              <Tooltip title="Edit">
                <IconButton color="primary" onClick={openPost}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Grid>
      </Grid>
      <Grid container item sx={{ padding: '1vh', justifyContent: 'center' }}>
        <Box
          component="img"
          src={post.image ? `${VITE_BASE_URL}/${post.image}` : AppLogo}
          sx={{  height: '10vw' }}
        />
        </Grid>
         <Grid container item sx={{ flexDirection: 'column' }}>
        <Typography variant="h4">{post.caption}</Typography>
      </Grid>
      <Grid container item sx={{ padding: '1vh' }} spacing={1}>
        <Button variant="outlined" color="primary" onClick={handleLike} sx={{width:"10%", fontSize:"0.8rem", whiteSpace:"nowrap"}}>
          👍 ({post.likes.length})
        </Button>
        &nbsp;
        <Button variant="outlined" color="primary" onClick={openComment}  sx={{width:"10%", fontSize:"0.8rem", whiteSpace:"nowrap"}}>
          <AddCommentIcon/> ({post.comments.length})
        </Button>
      </Grid>
     
      <CommentSection
        isOpen={isOpenComment}
        close={closeComment}
        comments={post.comments}
        postId={post._id}
      />
      {isOpenPost && <AddPost isOpen={isOpenPost} close={closePost} post={post} />}
      </Grid>
      </Paper>
  );
};

export default Post;
