import React, { useState, useEffect } from 'react';
import { getAllSandwiches } from '../apis/Sandwiches';
import { getAllUsers } from '../apis/Users';
import { Container, Stack } from '@mui/material';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const username = useSelector((state) => state.auth.user.username);
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
    <Container style={{ alignItems: 'center' }}>
      <Stack
        direction='column'
        sx={{ marginTop: '20px', alignItems: 'center' }}
      >
        <h1>
          Welcome back, {username}. Here&apos;s what your friends have been
          eating!
        </h1>
        <p>
          Feel free to browse around and discover all the awesome things we have
          to offer.
        </p>
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
      </Stack>
    </Container>
  );
};

export default HomePage;
