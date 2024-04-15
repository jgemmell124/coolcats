import React from 'react';
import { Grid } from '@mui/material';

const NotFound = () => {
  return (
    <Grid 
      marginRight='auto'
      paddingTop={'15vh'}
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={3}
    >
      <Grid item>
        <h1>404 Not Found</h1>
      </Grid>
      <Grid item>
        <img style={{ maxWidth: '400px', justifyContent: 'center' }} src='/Snoopy-doghouse-1.jpg' alt='snoopy' />
      </Grid>
      <Grid item>
        <h1>This page does not exist</h1>
      </Grid>
    </Grid>
  );
};

export default NotFound;
