import React from 'react';
import Rating from '@mui/material/Rating';
import { Avatar } from '@mui/material';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

const RatingCard = ({ rating }) => {
  return (
    <div className='card' style={{ width: '50%' }}>
      <div className='card-body'>
        <Container>
          <Row>
            <div>
              <Avatar alt='avatar' src='../images/avatar.png' />
              <h5
                style={{
                  fontSize: 'small',
                  fontWeight: 'bold',
                  float: 'left',
                  top: '1.7rem',
                  left: '5rem',
                  position: 'absolute',
                }}
              >
                {rating.user_id}
              </h5>
            </div>
          </Row>
          <Row>
            <Rating
              max={10}
              style={{
                paddingTop: '0.7rem',
                float: 'left',
              }}
              name='read-only size-medium'
              value={rating.rating}
              readOnly
            />
          </Row>
          <h5
            className='card-title'
            style={{
              float: 'left',
              paddingTop: '0.3rem',
            }}
          >
            {rating.title}
          </h5>
          <p
            className='card-text'
            style={{
              fontSize: 'small',
              float: 'left',
              textAlign: 'left',
            }}
          >
            {rating.comment}
          </p>
          <Row>
            <Col xs>
              <img
                src='../images/example_sandwich.jpeg'
                alt='sandwich pic'
                className='rounded'
                style={{
                  height: '10rem',
                  width: '10rem',
                  float: 'left',
                }}
              ></img>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

RatingCard.propTypes = {
  rating: PropTypes.object,
};

export default RatingCard;
