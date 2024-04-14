import React, { useState, useEffect } from 'react';
import { getAllSandwiches } from '../apis/Sandwiches';
import { getAllUsers } from '../apis/Users';
import SandwichCard from '../components/SandwichCard';
import { List, ListItem, Grid } from '@mui/material';
import Footer from '../components/Footer';

const HomePage = () => {
  const [users, setUsers] = useState([]);
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
          <h1 style={{ paddingTop: '2rem' }}>Website title goes here</h1>
          <iframe
            width='50%'
            height='50%'
            style={{ border: '0', float: 'left', paddingTop: '1rem' }}
            loading='lazy'
            allowfullscreen
            src='https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ3V9Axxh644kRYpjOb4LAAPg&key=AIzaSyBCgHzQFq8djSJDNbhlzBqjj_x49SI58yw'
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
        id='carouselExampleControls'
        className='carousel slide'
        data-ride='carousel'
      >
        <div className='carousel-inner'>
          <div className='carousel-item active'>
            <SandwichCard></SandwichCard>
          </div>
          <div className='carousel-item'>
            <SandwichCard></SandwichCard>
          </div>
          <div className='carousel-item'>
            <SandwichCard></SandwichCard>
          </div>
        </div>
        <a
          className='carousel-control-prev'
          role='button'
          data-slide='prev'
        >
          <span
            className='carousel-control-prev-icon'
            aria-hidden='true'
          ></span>
          <span className='sr-only'>Previous</span>
        </a>
        <a
          className='carousel-control-next'
          role='button'
          data-slide='next'
        >
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
