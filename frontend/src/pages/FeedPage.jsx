import { CircularProgress, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllRatings } from '../apis/Ratings';
import { getAllSandwiches } from '../apis/Sandwiches';
import _ from 'lodash';
import { Stack } from '@mui/system';
import SandwichPreviewCard from '../components/SandwichPreviewCard';
import RatingCard from '../components/RatingCard';
import { getAllUsers } from '../apis/Users';

const FeedPage = () => {
  const [ratings, setRatings] = useState([]);
  const [sandwiches, setSandwiches] = useState([]);
  const [users, setUsers] = useState([{}]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getAllRatings()
      .then((res) => setRatings(res.ratings))
      .catch();

    getAllUsers()
      .then((res) => setUsers(res.users))
      .catch();

    getAllSandwiches()
      .then((res) => setSandwiches(res.sandwiches))
      .catch()
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
      </Grid>
    );
  }

  return (
    <div>
      <h1>Feed Page</h1>
      <Stack spacing={2}>
        {
          sandwiches
            .concat(ratings)
            .sort((a, b) => new Date(b.created) - new Date(a.created))
            .map((item) => {
              if (_.has(item, 'name')) {
                return (
                  <div key={item._id}>
                    <Typography>
                      A new sandwich was added on {new Date(item.created).toLocaleString()}
                    </Typography>
                    <SandwichPreviewCard
                      key={item._id}
                      _id={item._id}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                    />
                  </div>
                );
              } else {
                const user = users.find((u) => u._id === item.user_id);
                return (
                  <div key={item._id} style={{ width: '100%' }}>
                    <Typography>
                      {user.username} rated a sandwich on {new Date(item.created).toLocaleString()}
                    </Typography>
                    <RatingCard key={item._id} rating={item} />
                  </div>
                );
              }
            })
        }
      </Stack>
    </div>
  );
};

export default FeedPage;
