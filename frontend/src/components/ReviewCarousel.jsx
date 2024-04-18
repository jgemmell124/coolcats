import React from 'react';
import { Carousel } from 'react-bootstrap';
import RatingCard from './RatingCard';
import PropTypes from 'prop-types';

const ReviewCarousel = ({ ratings }) => {
  return (
    <>
      <h2>Recent Reviews</h2>
      <Carousel 
        variant='dark'
        interval={1500}
        style={{
          paddingTop: '50px',
          paddingBottom: '50px'
        }}
      >
        {ratings.splice(0, 3).map((rating) => (
          <Carousel.Item
            key={rating._id}
            style={{
              width: '100%'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <RatingCard rating={rating} />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};
ReviewCarousel.propTypes = {
  ratings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired,
      comment: PropTypes.string,
    })
  ).isRequired,
};
export default ReviewCarousel;
