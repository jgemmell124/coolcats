import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Button, Card, CardHeader, CardActions, CardContent, CardMedia, Typography, Rating, Tooltip, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import { selectIsWhatRole, selectUser } from '../auth/authSlice';

const SandwichCard = ({ sandwich, totalRating, numRatings, onAddReview }) => {
  const user = useSelector(selectUser);
  const { isAdmin, isEmployee } = useSelector(selectIsWhatRole());

  const starRating = (
    <Rating
      max={5}
      style={{
        float: 'left',
        marginTop: 'auto'
      }}
      size='small'
      precision={0.25}
      name='read-only'
      value={totalRating}
      readOnly
    />
  );

  return (
    <Paper>

      <Card sx={{ width: '100%', maxWidth: 800 }}>
        <CardMedia
          component={'img'}
          sx={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
          image='/images/example_sandwich.jpeg'
          title='Sandwich Title'
        />
        <CardHeader
          title={<Typography variant='h4'>{sandwich.name}</Typography>}
          subheader={
            <Stack>
              <Typography variant='subtitle1'>
                {totalRating ? ` ${totalRating.toFixed(2)} (${numRatings} ratings)` : 'No ratings yet'}
              </Typography>
              {starRating}
            </Stack>
          }
          action={
            // admin and user who wrote the review can edit their review
            (isAdmin || isEmployee) &&
              <Tooltip title='Edit'>
                <Button 
                  startIcon={<EditIcon />}
                  variant='outlined' 
                  aria-label='edit'
                >
                  Edit
                </Button>
              </Tooltip>
          }
        />
        <CardContent>
          <Typography variant='h5' color='text.secondary'>
            Description: {sandwich.description}
          </Typography>
          <Typography variant='h5' color='text.secondary'>
            <strong>Ingredients:</strong> {sandwich.ingredients.join(', ')}.
          </Typography>
        </CardContent>
        <CardActions>
          {
            user &&
              <Button
                startIcon={<AddIcon />}
                onClick={onAddReview}
                color='secondary'
                variant='contained'
              >
                Add Review
              </Button>
          }
        </CardActions>
      </Card>
    </Paper>
  );
};

SandwichCard.propTypes = {
  sandwich: PropTypes.object.isRequired,
  totalRating: PropTypes.number,
  numRatings: PropTypes.number,
  onAddReview: PropTypes.func.isRequired,
};

export default SandwichCard;
