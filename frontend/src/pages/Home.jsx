import React, { useState, useEffect } from 'react';
import { getAllSandwiches } from '../apis/Sandwiches';
import { getAllUsers } from '../apis/Users';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import { getAllRatings } from '../apis/Ratings';
import ReviewCarousel from '../components/ReviewCarousel';
import FeaturedSandwiches from '../components/FeaturedSandwiches';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const username = useSelector((state) => state.auth?.user?.username);
  const [sandwiches, setSandwiches] = useState([]);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.users))
      .catch();

    getAllSandwiches()
      .then((res) => setSandwiches(res.sandwiches))
      .catch();

    getAllRatings()
      .then((res) => setRatings(res.ratings))
      .catch();
  }, []);
  return (
    <>
      <div
        className='container'
      >
        <h1>
          Welcome back, <span style={{ color: '#A9333A' }}>{username}</span>.
          Here&apos;s what your friends have been eating!
        </h1>
        <p>
          Feel free to browse around and discover all the awesome things we have
          to offer.
        </p>{' '}
        <FeaturedSandwiches sandwiches={sandwiches} />
        <ReviewCarousel ratings={ratings} />
        <h2>Wollies Locations</h2>
        <iframe
          width='50%'
          height='400rem'
          style={{
            border: '0',
            float: 'left',
          }}
          loading='lazy'
          allowfullscreen
          src={
            'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ3V9Axxh644kRYpjOb4LAAPg&key=' +
            process.env.REACT_APP_GOOGLE_API_KEY
          }
        ></iframe>
        <iframe
          width='50%'
          height='400rem'
          style={{
            border: '0',
            float: 'right',
          }}
          loading='lazy'
          allowfullscreen
          src={
            'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ07NCiCF644kRokxOOSJwRuc&key=' +
            process.env.REACT_APP_GOOGLE_API_KEY
          }
        ></iframe>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
