import React, { useState, useEffect } from 'react';
import { getAllSandwiches } from '../apis/Sandwiches';
import { getAllUsers } from '../apis/Users';
import SandwichCard from '../components/SandwichCard';
import { List, ListItem, Grid } from '@mui/material';
import Footer from '../components/Footer';
import { Container, Stack } from '@mui/material';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const username = useSelector((state) => state.auth?.user?.username);
  const [sandwiches, setSandwiches] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.users))
      .catch();

    getAllSandwiches()
      .then((res) => setSandwiches(res.sandwiches))
      .catch();
  }, []);
  return (
    <div className='container'>
      <Grid container spacing={2}>
        <Grid xs={9}>
          <h1>
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
              bottom: '-8rem',
            }}
          >
            Locations
          </h2>
          <iframe
            width='50%'
            height='50%'
            style={{
              border: '0',
              float: 'left',
              paddingTop: '1rem',
              position: 'relative',
              bottom: '-10rem',
            }}
            loading='lazy'
            allowfullscreen
            src='https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ3V9Axxh644kRYpjOb4LAAPg&key=AIzaSyBCgHzQFq8djSJDNbhlzBqjj_x49SI58yw'
          ></iframe>
          <iframe
            width='50%'
            height='50%'
            style={{
              border: '0',
              float: 'right',
              paddingTop: '1rem',
              position: 'relative',
              bottom: '-10rem',
            }}
            loading='lazy'
            allowfullscreen
            src='https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ07NCiCF644kRokxOOSJwRuc&key=AIzaSyBCgHzQFq8djSJDNbhlzBqjj_x49SI58yw'
          ></iframe>
        </Grid>
        <Grid xs={2}>
          <div style={{ padding: '2rem' }}>
            <h2>Featured Sandwiches</h2>
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            >
              {[1, 2, 3, 4, 5, 6, 7].map(
                (
                  value //replace this later
                ) => (
                  <ListItem key={value} disableGutters>
                    <img
                      style={{ width: '5rem', height: '5rem' }}
                      src='../images/example_sandwich.jpeg'
                      alt='sandwich'
                    />
                    <a style={{ paddingLeft: '1rem', fontSize: '1.5rem' }}>
                      sandwich name
                    </a>
                  </ListItem>
                )
              )}
            </List>
          </div>
        </Grid>
      </Grid>
      <div
        style={{ backgroundColor: 'gray' }}
        id='carouselExampleControls'
        className='carousel slide'
        data-ride='carousel'
      >
        <div className='carousel-inner'>
          <div
            className='carousel-item active'
            style={{ float: 'center', left: '25%' }}
          >
            <SandwichCard></SandwichCard>
          </div>
          <div className='carousel-item' style={{ float: 'center' }}>
            <SandwichCard></SandwichCard>
          </div>
          <div className='carousel-item' style={{ float: 'center' }}>
            <SandwichCard></SandwichCard>
          </div>
        </div>
        <a className='carousel-control-prev' role='button' data-slide='prev'>
          <span
            className='carousel-control-prev-icon'
            aria-hidden='true'
          ></span>
          <span className='sr-only'>Previous</span>
        </a>
        <a className='carousel-control-next' role='button' data-slide='next'>
          <span
            className='carousel-control-next-icon'
            aria-hidden='true'
          ></span>
          <span className='sr-only'>Next</span>
        </a>
      </div>
      {users.map((user) => (
        <div key={user._id}>
          <h2>{user.username}</h2>
          <p>{user._id}</p>
        </div>
      ))}
      {sandwiches.map((s) => (
        <div key={s._id}>
          <h2>{s.name}</h2>
          <p>{s.price}</p>
          <p>{s.description}</p>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default HomePage;
