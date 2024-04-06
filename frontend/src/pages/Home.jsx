import React, { useState, useEffect } from 'react';
import { getAllSandwiches } from '../apis/Sandwiches';
import { getAllUsers } from '../apis/Users';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [sandwiches, setSandwiches] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.users))
      .catch((res) => Error);

    getAllSandwiches()
      .then((res) => setSandwiches(res.sandwiches))
      .catch();
  }, []);

  return (
    <div style={{ alignItems: 'center' }}>
      <h1>Welcome to our page!</h1>
      <p>Feel free to browse around and discover all the awesome things we have to offer.</p>
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
    </div>
  );
};


export default HomePage;
