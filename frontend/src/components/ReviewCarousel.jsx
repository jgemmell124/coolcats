import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import RatingCard from './RatingCard';
import PropTypes from 'prop-types';
import { getAllRatings } from '../apis/Ratings';
import { Tooltip } from '@mui/material';
import { getSession } from '../apis/Auth';

const ReviewCarousel = () => {
  const [ratings, setRatings] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getSession()
      .then((user) => {
        setUser(user);
      })
      .catch(() => {});
    getAllRatings()
      .then((res) => {
        setRatings(res.ratings);
      })
      .catch();
  }, []);

  return (
    <>
      {user ? (
        <Tooltip label='Users who are signed in will see only their reviews and reviews from users they follow'>
          <h2>Personalized Most Recent Reviews</h2>
        </Tooltip>
      ) : (
        <h2>Most Recent Reviews</h2>
      )}
      <Carousel
        variant='dark'
        interval={2500}
        style={{
          paddingTop: '30px',
          paddingBottom: '50px',
        }}
      >
        {ratings
          .filter((rating) => {
            if (!user) {
              // If the user is not signed in, show all reviews
              return true;
            } else {
              // If the user is signed in, limit the reviews to their own and the reviews of those they follow
              return (
                (user.following ?? []).includes(rating.user_id) ||
                rating.user_id === user._id
              );
            }
          })
          .sort((a, b) => {
            new Date(b.lastEdited) - new Date(a.lastEdited);
          })
          .splice(0, 5)
          .map((rating) => (
            <Carousel.Item
              key={rating._id}
              style={{
                width: '100%',
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
        {ratings.filter((rating) => {
          if (!user) {
            // If the user is not signed in, show all reviews
            return true;
          } else {
            // If the user is signed in, limit the reviews to their own and the reviews of those they follow
            return (
              (user.following ?? []).includes(rating.user_id) ||
              rating.user_id === user._id
            );
          }
        }).length === 0 && (
          <Carousel.Item
            style={{
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <h4>
                No recent reviews from yourself or followed users. See feed page
                for all activity.{' '}
              </h4>
            </div>
          </Carousel.Item>
        )}
      </Carousel>
    </>
  );
};
ReviewCarousel.propTypes = {
  ratings: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default ReviewCarousel;
