import React, { useState, useEffect } from 'react';
import { getAllUsers, getUser } from '../apis/Users';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [sandwiches, setSandwiches] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then(setUsers)
      .catch(console.log);
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
    </div>
  );
};


export default HomePage;
