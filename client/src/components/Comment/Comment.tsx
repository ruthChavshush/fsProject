import { Grid, Typography } from '@mui/material';
import { Comment as CommentType } from '@shared/types/post.type';
import React from 'react';

type CommentProps = {
  comment: CommentType;
};

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <Grid container direction={'column'} paddingY={'2vh'}>
      <Grid item container>
        <Typography variant="body1">{comment.userName}</Typography>
        &nbsp;|&nbsp;
        <Typography variant="caption">{comment.createdAt.toString()}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h4">{comment.content}</Typography>
      </Grid>
    </Grid>
  );
};

export default Comment;
