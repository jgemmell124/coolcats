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

const ReviewModal = ({ open, setOpen, isNew, onSubmit, rating, sid, uid }) => {
  const [title, setTitle] = useState(rating.title ?? '');
  const [stars, setStars] = useState(rating.rating ?? 0);
  const [comment, setComment] = useState(rating.comment ?? '');

  const action = isNew ? 'Create' : 'Edit';

  useEffect(() => {
    setStars(rating.rating ?? 0);
    setComment(rating.comment ?? '');
    setTitle(rating.title ?? '');
  }, [rating]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const review = {
      rating: stars,
      comment: comment,
      title: title,
      user_id: uid,
      sandwich_id: sid,
    };
    try {
      if (isNew) {
        const newReview = await createRating(review);
        onSubmit(newReview);
      } else {
        await updateRating(rating._id, review);
        onSubmit({ ...rating, ...review });
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
          value={title}
          sx={{ width: '300px', marginBottom: '15px' }}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          id='comment-input'
          label='Comment'
          multiline
          rows={5}
          maxRows={5}
          value={comment}
          sx={{ width: '300px', marginBottom: '15px' }}
          onChange={(e) => setComment(e.target.value)}
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
  rating: PropTypes.object.isRequired,
  uid: PropTypes.string.isRequired,
  sid: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
};

export default ReviewModal;
