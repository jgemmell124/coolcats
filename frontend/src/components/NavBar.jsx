import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../apis/Auth';
import { logoutUser } from '../auth/authSlice';
import Alert from './Alert';

const NavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [alert, setAlert] = useState(null);
  const title = 'Navbar title';
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const handleSignout = async () => {
    try {
      await logout();
      dispatch(logoutUser());
      if (window.location.pathname === '/profile') {
        navigate('/', { replace: true });
      }
    } catch (err) {
      setAlert('Failed to sign out');
    }
  };

  // dropdown to show profile and signout button
  const accountDropdown = (
    <li 
      className='nav-item dropdown'>
      <button 
        className='nav-link dropdown-toggle'
        id='dropdownMenuButton' 
        data-bs-toggle='dropdown' 
        aria-haspopup='true' 
        aria-expanded='false'
        type='button'
      >
        Account
      </button>
      <ul 
        className='dropdown-menu dropdown-menu-end' 
        aria-labelledby='dropdownMenuButton'>
        <li>
          <a className='dropdown-item d-flex' to='/profile'>Profile</a>
        </li>
        <li>
          <button 
            className='dropdown-item'
            onClick={handleSignout}
          >
            Sign Out
          </button>
        </li>
      </ul>
    </li>
  );

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
        <ul 
          style={{ marginRight: '15px' }}
          className='navbar-nav'>
          <li className='nav-item'>
            <Link className='nav-link' to={'/'}>Home</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to={'/'}>Sandwiches</Link>
          </li>
          {isAuthenticated ? 
            accountDropdown 
            : 
            <li className='nav-item'>
              <Link className='nav-link' to={'/login'}>Sign In</Link>
            </li>
          }
        </ul>
      </div>
      <Alert alert={alert} setAlert={setAlert} />
    </nav>
  );

};

export default NavBar;
