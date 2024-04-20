import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllSandwiches } from '../apis/Sandwiches';
import SandwichPreviewCard from '../components/SandwichPreviewCard';

const BrowseSandwichesPage = () => {
  const [sandwiches, setSandwiches] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getAllSandwiches()
      .then((data) => {
        setSandwiches(data.sandwiches);
      })
      .catch()
      .finally(() => setIsLoaded(true));
  }, []);

  if (!isLoaded) {
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

  if (sandwiches.length === 0) {
    return <p>No sandwiches available</p>;
  }

  return (
    <div>
      <div style={{ padding: '10px' }}>
        <h1>Browse All Sandwiches ({sandwiches?.length ?? 0})</h1>
        <hr />
      </div>
      {sandwiches.map((sandwich) => (
        <SandwichPreviewCard
          key={sandwich._id}
          _id={sandwich._id}
          name={sandwich.name}
          description={sandwich.description}
          price={sandwich.price}
        />
      ))}
    </div>
  );
};

export default BrowseSandwichesPage;
