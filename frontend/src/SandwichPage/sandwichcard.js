import React from 'react';
import Rating from '@mui/material/Rating';
import { Avatar } from '@mui/material';
import './card.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SandwichCard() {
  return (
    <div className='card sandwichCard'>
      <div className='card-body'>
        <Container>
          <Row>
            <div>
              <Avatar alt='avatar' src='../images/avatar.png' />
              <h5 className='username'>username placeholder</h5>
            </div>
          </Row>
          <Row>
            <Rating
              className='rating'
              name='read-only size-medium'
              value={2}
              readOnly
            />
          </Row>
          <h5 className='card-title ratingTitle'>title of review</h5>
          <p className='card-text ratingText'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <Row>
            <Col xs>
              <img
                src='../images/example_sandwich.jpeg'
                alt='sandwich pic'
                className='rounded image'
              ></img>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default SandwichCard;
