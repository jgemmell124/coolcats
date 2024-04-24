import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import PropTypes from 'prop-types';
import { getUserById } from '../apis/Users';
import { getSandwich } from '../apis/Sandwiches';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link, Box, Button, Grid, Tooltip, Paper, Stack } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import { selectIsWhatRole, selectUser } from '../auth/authSlice';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const RatingCard = ({ rating, handleEditClick }) => {
  const [user, setUser] = useState({});
  const [sandwich, setSandwich] = useState({});
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const currentUser = useSelector(selectUser);
  const { isSelf, isAdmin } = useSelector(selectIsWhatRole(currentUser?._id));

  useEffect(() => {
    getSandwich(rating.sandwich_id).then(setSandwich);
    getUserById(rating.user_id).then(setUser);
  }, []);

  const wrapProfileLink = (content) => (
    <Tooltip title='View profile'>
      <Link
        sx={{
          color: 'black',
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' },
        }}
        href={`/profile/${user.username}`}
      >
        {content}
      </Link>
    </Tooltip>
  );

  const getTimeAgo = (time) => {
    const now = new Date();
    const diff = now - time;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    if (months >= 12) {
      return `${months / 12} years ago`;
    } else if (months >= 1) {
      return `${months} months ago`;
    } else if (days >= 1) {
      return `${days} days ago`;
    } else if (hours >= 1) {
      return `${hours} hours ago`;
    } else {
      return `${Math.floor(diff / (1000 * 60))} minutes ago`;
    }
  };

  const postedTime = () => {
    return getTimeAgo(new Date(rating.created));
  };

  const editedTime = () => {
    const created = new Date(rating.created);
    const edited = new Date(rating.lastEdited);
    if (created.getUTCSeconds() === edited.getUTCSeconds()) {
      return '';
    }
    return `, edited ${getTimeAgo(edited)}`;
  };

  return (
    <Paper sx={{ width: '100%', maxWidth: '750px' }}>
      <Card sx={{ width: '100%', maxWidth: '750px' }}>
        <CardHeader
          avatar={wrapProfileLink(
            <Avatar
              alt='avatar'
              src='../images/avatar.png'
              style={{ height: '80px', width: '80px' }}
            />
          )}
          action={
            // admin and user who wrote the review can edit their review
            (isAdmin || isSelf) &&
            handleEditClick && (
              <Tooltip title='Edit'>
                <Button
                  startIcon={<EditIcon />}
                  variant='outlined'
                  aria-label='edit'
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
              </Tooltip>
            )
          }
          title={
            <Typography variant='h4'>
              <b>{wrapProfileLink(user.username)}</b>
            </Typography>
          }
          subheader={`${postedTime()}${editedTime()}`}
        />
        <CardContent sx={{ marginTop: 0, paddingTop: 0, marginBottom: 0 }}>
          <Stack direction='row' spacing={1} sx={{ display: 'flex' }}>
            <Tooltip title='View sandwich'>
              <Link
                href={`/sandwiches/${sandwich._id}`}
                sx={{
                  color: 'black',
                  textDecorationLine: 'none',
                  '&:hover': {
                    textDecorationLine: 'underline',
                  },
                }}
              >
                <Typography
                  variant='h5'
                  sx={{ fontWeight: 'bold' }}
                  color='text.primary'
                >
                  {sandwich.name}{' '}
                </Typography>
              </Link>
            </Tooltip>
            <Rating
              max={5}
              style={{}}
              size='large'
              precision={0.25}
              name='read-only'
              value={rating.rating}
              readOnly
            />
          </Stack>
          <Box paddingBottom={'4px'}>
            <Typography variant='h6' color='text.secondary'>
              &quot;{rating.title}&quot;
            </Typography>
          </Box>
          <Typography paddingTop={'0px'} variant='body1' color='text.secondary'>
            <i>{rating.comment}</i>
          </Typography>
        </CardContent>
        <CardActions>
          <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Grid item>
              <Button
                startIcon={<ThumbUpIcon />}
                onClick={() => {
                  setLiked(!liked);
                  setDisliked(false);
                }}
                color={liked ? 'primary' : 'inherit'}
              >
                {liked ? 14 : 13}
              </Button>
              <Button
                startIcon={<ThumbDownIcon />}
                onClick={() => {
                  setDisliked(!disliked);
                  setLiked(false);
                }}
                color={disliked ? 'error' : 'inherit'}
              >
                {disliked ? 5 : 4}
              </Button>
            </Grid>
            <Grid item>
              <Button startIcon={<ShareIcon />}>Share</Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Paper>
  );
};

RatingCard.propTypes = {
  rating: PropTypes.object.isRequired,
  handleEditClick: PropTypes.func,
};

export default RatingCard;
