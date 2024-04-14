import React from 'react';
import Rating from '@mui/material/Rating';
import { Avatar } from '@mui/material';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SandwichCard = () => { //TODO: put rating object as parameter and then set fields to param fields, and add edit button
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
                username placeholder
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
              value={2}
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
            title of review
          </h5>
          <p
            className='card-text'
            style={{
              fontSize: 'small',
              float: 'left',
              textAlign: 'left',
            }}
          >
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
export default SandwichCard;
