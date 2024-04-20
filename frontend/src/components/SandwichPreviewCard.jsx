import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const SandwichPreviewCard = ({ _id, name, price, description }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        boxShadow: '0px 1px 5px 0px black',
        borderRadius: '15px',
        width: '80%',
        height: '150px',
        padding: '15px',
        marginBottom: '25px',
        '&:hover': {
          boxShadow: '0px 1px 10px 0px black',
          textDecoration: 'underline solid grey',
          cursor: 'pointer'
        }
      }}
      onClick={() => navigate(`/sandwiches/${_id}`)}
    >
      <img
        src={'/images/example_sandwich.jpeg'}
        height='100%'
        width='auto'
        style={{ borderRadius: '15px', marginRight: '15px' }}
      />
      <Box>
        <Typography variant='h4'>{name}</Typography>
        <Typography variant='h6' sx={{ color: '#A9333A' }}>
          ${price}
        </Typography>
        <i>{description}</i>
      </Box>
    </Box>
  );
};

SandwichPreviewCard.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default SandwichPreviewCard;
