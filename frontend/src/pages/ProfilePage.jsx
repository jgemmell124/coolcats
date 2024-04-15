import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import CircularProgress from '@mui/material/CircularProgress';
import ProfileCard from '../components/ProfileCard';
import { getSession } from '../apis/Auth';
import { useNavigate } from 'react-router-dom';
import { getRatingsByUserId } from '../apis/Ratings';
import Alert from '../components/Alert';

const UserProfilePage = () => {
  const [ratings, setRatings] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getSession()
      .then((user) => {
        setCurrentUser(user);
        return getRatingsByUserId(user._id);
      })
      .then((data) => setRatings(data.ratings))
      .catch(e => setError(e.message))
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded) {
    return (
      <Grid
        container
        spacing={1}
        direction='column'
        alignItems='center'
        justifyContent='center'
        sx={{ minHeight: '91vh' }}
      >
        <Grid item xs={4}>
          <CircularProgress />
        </Grid>
      </Grid>    );
  }

  if (_.isEmpty(currentUser)) {
    // TODO if user logs in the redirect back to this page
    navigate('/login', { replace: true });
  }

  return (
    <>
      <Grid 
        alignContent={'center'}
        justifyContent={'center'}
      >
        <Typography variant='h4'>My Profile</Typography>
        <Grid 
          margin={'6px'}>
          <Grid item xs={12} sm={12} padding={'5px'}>
            <ProfileCard setCurrentUser={setCurrentUser} currentUser={currentUser} />
          </Grid>
        </Grid>
        <Grid item xs={13} padding={'5px'} marginTop={'30px'}>
          <Typography variant='h5'>Ratings ({ratings.length})</Typography>
          <hr/>
          {/* TODO: replace this with a rating card */}
          {ratings.length === 0 && <h1>No Ratings</h1>}
          {ratings.map((rating) => (
            <Box key={rating._id} sx={{ border: '3px solid black', margin: '3px' }}>
              <Typography variant='h7'>{rating.title ?? 'No title'}</Typography>
              <Typography variant='h7'>{rating.rating}</Typography>
              <Typography variant='subtitle2'>{rating.comment ?? 'no Comment'}</Typography>
            </Box>

          ))}
        </Grid>
      </Grid>
      <Alert alert={error} setAlert={setError} />
    </>
  );

};


export default UserProfilePage;

