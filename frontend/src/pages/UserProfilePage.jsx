import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { getRatingsByUserId } from '../apis/Ratings';
import { getUserByUsername } from '../apis/Users';
import CircularProgress from '@mui/material/CircularProgress';
import ProfileCard from '../components/ProfileCard';
import StatusAlert from '../components/StatusAlert';
import NotFound from './NotFound';

const UserProfilePage = () => {
  // grab url
  const { uname } = useParams();
  const [user, setUser] = useState({});
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUserByUsername(uname)
      .then(u => {
        setUser(u);
        return getRatingsByUserId(u._id);
      })
      .then((data) => setRatings(data.ratings))
      .catch(setError)
      .finally(() => setLoaded(true));
  }, []);

  const handleSetUser = (newUser) => {
    setUser(newUser);
    newUser.username !== uname && navigate(`/profile/${newUser.username}`);
  };

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
      </Grid>);
  }

  if (_.isEmpty(user)) {
    // redirect to sign in page
    return <NotFound message={'User does not exist'}/>;
  }

  return (
    <>
      <Grid
        alignContent={'center'}
        justifyContent={'center'}>
        <Grid
          margin={'6px'}>
          <Grid item xs={12} sm={12} padding={'5px'}>
            <ProfileCard setCurrentUser={handleSetUser} currentUser={user} />
          </Grid>
        </Grid>
        <Grid item xs={13} padding={'5px'} marginTop={'30px'}>
          <Typography variant='h5'>Ratings ({ratings.length})</Typography>
          <hr />
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
      <StatusAlert
        message={error}
        setMessage={setError}
        status='alert-danger'
      />
    </>
  );

};


export default UserProfilePage;
