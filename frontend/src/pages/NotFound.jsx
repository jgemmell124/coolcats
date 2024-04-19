import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';

const NotFound = ({ message }) => {
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
        <img style={{ width: '100%', maxWidth: '600px', justifyContent: 'center' }} src='/images/po.png' alt='snoopy' />
      </Grid>
      <Grid item>
        <h1>{message ?? 'This page does not exist'}</h1>
      </Grid>
    </Grid>
  );
};

NotFound.propTypes = {
  message: PropTypes.string,
};

export default NotFound;
