import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Stack,
  Button,
  TextField,
  DialogActions,
  DialogTitle,
  Dialog,
  Rating,
  Box,
} from '@mui/material';
import { createRating, updateRating } from '../apis/Ratings';

const ReviewModal = ({ open, isNew, rating, setOpen, rid, uid, sid, comment, title  }) => {
  const [stars, setStars] = useState(rating);
  const [newComment, setNewComment] = useState(comment);
  const [newTitle, setNewTitle] = useState(title);
  const [userId, setUserId] = useState(uid);
  const [sandwichId, setSandwichId] = useState(sid);
  const [ratingId, setRatingId] = useState(rid);

  const action = isNew ? 'Create' : 'Edit';

  useEffect(() => {
    setStars(rating);
    setNewComment(comment);
    setNewTitle(title);
    setUserId(uid);
    setSandwichId(sid);
    setRatingId(rid);
  }, [sid, rid, uid, rating, comment, title]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const review = {
      rating: stars,
      comment: newComment,
      title: newTitle,
      user_id: userId,
      sandwich_id: sandwichId,
    };
    try {
      if (isNew) {
        await createRating(review);
      } else {
        await updateRating(ratingId, review);
      }
    } catch (e) {
      // nothing
    }
    handleClose();
  };

  return (
    <Dialog fullWidth maxWidth='xs' onClose={handleClose} open={open}>
      <Stack
        spacing={2}
        direction='column'
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <DialogTitle><b>{action} Review</b></DialogTitle>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ mr: 2 }}>Select Rating:</Box>
          <Rating
            name='star-rating'
            precision={0.25}
            value={stars}
            onChange={(_event, newValue) => {
              setStars(newValue);
            }}
          />
          <Box sx={{ ml: 2 }}>{stars ?? 0} / 5</Box>
        </Box>

        <TextField
          id='username-input'
          label='Review Title'
          rows={2}
          maxRows={2}
          defaultValue={newTitle}
          sx={{ width: '300px', marginBottom: '15px' }}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <TextField
          id='comment-input'
          label='Comment'
          multiline
          rows={5}
          maxRows={5}
          defaultValue={newComment}
          sx={{ width: '300px', marginBottom: '15px' }}
          onChange={(e) => setNewComment(e.target.value)}
        />

      </Stack>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          type='submit'
          disabled={!comment || !title}
          onClick={handleSubmit}
        >
          {isNew ? 'Add Review' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );

};

ReviewModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  isNew: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired,
  rid: PropTypes.string,
  sid: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ReviewModal;
