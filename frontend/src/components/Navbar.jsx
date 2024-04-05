import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ children }) => {

  return (
    <div style={{ overflow: 'hidden', height: '100vh' }}>
      <nav className='navbar navbar-expand-lg navbar-light bg-primary'>
        <a className='navbar-brand' href='#'>Navbar</a>
        <button className='navbar-toggler' type='button'
          data-toggle='collapse' data-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup' aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'>
          </span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav'>
            <a className='nav-item nav-link
              active' href='#'>
              Home
            </a>
            <a className='nav-item nav-link' href='#'>Features</a>
            <a className='nav-item nav-link' href='#'>Price</a>
            <a className='nav-item nav-link' href='#'>About</a>
          </div>
        </div>
      </nav>
      <div className='container-fluid h-100'>
        <div className='row h-100'>
          <div className='col-2' id='green'>
            <h4>Sidebar</h4>
            <a href='#'>Link 1</a>
            <br/>
            <br/>
            <a href='#'>Link 2</a>
            <br/>
            <br/>
            <a href='#'>Link 3</a>
            <br/>
            <br/>
            <a href='#'>Link 4</a>
            <br/>
            <br/>
          </div>
          <div className='col-10' style={{ textAlign: 'justify', backgroundColor: 'grey' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  children: PropTypes.node,
};


export default Navbar;
