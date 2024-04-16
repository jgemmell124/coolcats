import React, { useState, useEffect } from 'react';
import { getAllSandwiches } from '../apis/Sandwiches';
import { getAllUsers } from '../apis/Users';
import RatingCard from '../components/RatingCard';
import { List, ListItem, Grid } from '@mui/material';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import { getAllRatings } from '../apis/Ratings';

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
    <div className='container'>
      <Grid container spacing={2}>
        <Grid xs={9}>
          <h1
            style={{
              paddingTop: '1rem',
            }}
          >
            Welcome back, <span style={{ color: '#A9333A' }}>{username}</span>.
            Here&apos;s what your friends have been eating!
          </h1>
          <p>
            Feel free to browse around and discover all the awesome things we
            have to offer.
          </p>{' '}
          <h2
            style={{
              position: 'relative',
              bottom: '-2rem',
            }}
          >
            Wollies Locations
          </h2>
          <iframe
            width='50%'
            height='50%'
            style={{
              border: '0',
              float: 'left',
              paddingTop: '1rem',
              position: 'relative',
              bottom: '-3rem',
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
            height='50%'
            style={{
              border: '0',
              float: 'right',
              paddingTop: '1rem',
              position: 'relative',
              bottom: '-3rem',
            }}
            loading='lazy'
            allowfullscreen
            src={
              'https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ07NCiCF644kRokxOOSJwRuc&key=' +
              process.env.REACT_APP_GOOGLE_API_KEY
            }
          ></iframe>
        </Grid>
        <Grid xs={2}>
          <div
            style={{ padding: '1rem', backgroundImage: '../background.jpeg' }}
          >
            <h2>Featured Sandwiches</h2>
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            >
              {sandwiches.slice(0, 5).map((s) => (
                <ListItem
                  sx={{ backgroundImage: '../background.jpeg' }}
                  key={s._id}
                  disableGutters
                >
                  <a style={{ paddingLeft: '1rem', fontSize: '1rem' }}>
                    s.name
                  </a>
                  <p>{s.price}</p>
                  <p>{s.description}</p>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>
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
      {users.map((user) => (
        <div key={user._id}>
          <h2>{user.username}</h2>
          <p>{user._id}</p>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default HomePage;
