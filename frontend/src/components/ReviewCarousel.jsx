import React from 'react';
import RatingCard from './RatingCard';
import PropTypes from 'prop-types';

const ReviewCarousel = ({ ratings }) => {
  return (
    <>
      <h2>Recent Reviews</h2>
      <div
        style={{ backgroundImage: '../background.jpeg' }}
        id='carouselExampleDark'
        className='carousel carousel-dark slide'
        data-bs-ride='carousel'
      >
        <div className='carousel-inner'>
          <div
            className='carousel-item active'
            style={{ float: 'center', left: '25%' }}
          >
            <RatingCard rating={ratings} />
          </div>
          <div
            className='carousel-item'
            style={{ float: 'center', left: '25%' }}
          >
            <RatingCard rating={ratings} />
          </div>
          <div
            className='carousel-item'
            style={{ float: 'center', left: '25%' }}
          >
            <RatingCard rating={ratings} />
          </div>
        </div>
        <button
          className='carousel-control-prev'
          type='button'
          data-bs-target='#carouselExampleDark'
          data-bs-slide='prev'
        >
          <span
            className='carousel-control-prev-icon'
            aria-hidden='true'
          ></span>
          <span className='visually-hidden'>Previous</span>
        </button>
        <button
          className='carousel-control-next'
          type='button'
          data-bs-target='#carouselExampleDark'
          data-bs-slide='next'
        >
          <span
            className='carousel-control-next-icon'
            aria-hidden='true'
          ></span>
          <span className='visually-hidden'>Next</span>
        </button>
      </div>
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
