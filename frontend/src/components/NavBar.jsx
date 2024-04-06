import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const title = 'Navbar title';
  const { isAuthenticated } = useSelector((state) => state.auth);

  const links = [
    { title: 'Home', url: '#' },
    { title: 'Sandwiches', url: '#' },
    ...(isAuthenticated ? 
      [
        { title: 'Profile', url: '#' },
        { title: 'Sign Out', url: '#' },
      ] :
      [{ title: 'Sign In', url: '/login' }]
    ),
  ];

  const handleSearch = (event) => {
    event.preventDefault();
  };

  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-dark justify-contnent-between'>
      <a className='navbar-brand' href='#'>{title}</a>
      <button
        className='navbar-toggler'
        type='button' 
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{ marginRight: '15px' }}
        aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>
      <div 
        className={`${isCollapsed ? 'collapse' : ''} navbar-collapse justify-content-between`}
        id='navbarColor01' 
      >
        <form 
          className='form-inline'
          style={{ margin: '5px' }}>
          <div className='input-group'>
            <input 
              className='form-control mr-sm-2'
              type='search' 
              placeholder='Find sandwiches or users...' 
              aria-label='Search'/>
            <button
              className='btn btn-outline-info  my-sm-0'
              type='submit'
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </form>
        <ul className='navbar-nav mr-auto'>
          {links.map((link, index) => (
            <li className='nav-item' key={index}>
              <Link className='nav-link' to={link.url}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );

};

export default NavBar;
