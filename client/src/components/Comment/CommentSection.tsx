import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Comment as CommentType } from '@shared/types/post.type';
import React from 'react';
import Loader from '../Loader';
import AddComment from './AddComment';
import Comment from './Comment';

type CommentSectionProps = {
  comments: CommentType[];
  isOpen: boolean;
  close: () => void;
  postId: string;
};

const CommentSection: React.FC<CommentSectionProps> = ({ comments, isOpen, close, postId }) => {
  return (
    <Dialog open={isOpen} onClose={close} maxWidth={'md'} fullWidth>
      <DialogTitle color={'primary'}>Comments</DialogTitle>
      <DialogContent>
        <AddComment postId={postId} />
        {!comments ? (
          <Loader />
        ) : (
          comments.map((comment, index) => <Comment key={index} comment={comment} />)
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CommentSection;
