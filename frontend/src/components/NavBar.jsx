import React, { useState } from 'react';

const NavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const title = 'Nvbar title';

  const links = [
    { title: 'Home', url: '#' },
    { title: 'Features', url: '#' },
    { title: 'Pricing', url: '#' },
    { title: 'About', url: '#' },
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
        <ul className='navbar-nav mr-auto'>
          {links.map((link, index) => (
            <li className='nav-item' key={index}>
              <a className='nav-link' href={link.url}>{link.title}</a>
            </li>
          ))}
        </ul>
        <form 
          className='form-inline'
          style={{ marginRight: '15px', transition: 'linear' }}>
          <div className='input-group'>
            <input className='form-control mr-sm-2' type='search' placeholder='Search' aria-label='Search'/>
            <button
              className='btn btn-outline-info  my-sm-0'
              type='submit'
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </nav>
  );

};

export default NavBar;
