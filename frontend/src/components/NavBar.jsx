import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../apis/Auth';
import { logoutUser } from '../auth/authSlice';
import Alert from './Alert';
import { Stack, Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';

const NavBarButton = ({ text, onClickFunction }) => (
  <Button
    onClick={onClickFunction}
    style={{
      fontFamily: 'Gill Sans',
      fontSize: '18px',
    }}
    sx={{
      color: '#b2b2b4ff',
      ':hover': {
        color: 'white',
      },
    }}
  >
    {text}
  </Button>
);

// Props validation for menu button
NavBarButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClickFunction: PropTypes.func.isRequired,
};

const NavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [alert, setAlert] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const username = useSelector((state) => state.auth.user.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
    <li className='nav-item dropdown'>
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
        aria-labelledby='dropdownMenuButton'
      >
        <li>
          <a className='dropdown-item d-flex' to='/profile'>
            Profile
          </a>
        </li>
        <li>
          <button className='dropdown-item' onClick={handleSignout}>
            Sign Out
          </button>
        </li>
      </ul>
    </li>
  );

  const yeah = true;
  if (yeah) {
    return (
      <Stack
        direction='row'
        spacing={2}
        sx={{
          backgroundColor: '#090910',
          height: '75px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <a className='navbar-brand' href='#' style={{ marginRight: '10%' }}>
          <img
            width='250px'
            src='WolliesboxdLogoLight.png'
            alt={'Wolliesboxd'}
          />
        </a>
        <Stack
          direction='row'
          spacing={2}
          sx={{
            backgroundColor: '#090910',
            height: '75px',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Button
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            style={{
              fontFamily: 'Gill Sans',
              fontSize: '18px',
            }}
            sx={{
              color: open ? 'white' : '#b2b2b4ff',
              ':hover': {
                color: 'white',
              },
            }}
          >
            <img
              style={{
                marginRight: '5px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              width='35px'
              height='35px'
              src='emptyProfilePic.png'
              alt={'profilePicture'}
            />
            {username}
            <ArrowDropDownIcon />
          </Button>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Home</MenuItem>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem
              onClick={() => {
                handleSignout();
                handleClose();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
          <NavBarButton text='Home' onClickFunction={() => {}} />
          <NavBarButton text='Sandwiches' onClickFunction={() => {}} />
          <NavBarButton text='Your Stats' onClickFunction={() => {}} />
          <Button
            variant='contained'
            sx={{
              backgroundColor: '#52bf30',
              ':hover': { backgroundColor: '#42852d' },
            }}
          >
            <AddIcon />
            Log Sandwich
          </Button>
        </Stack>
      </Stack>
    );
  } else {
    return (
      <nav className='navbar navbar-expand-md navbar-dark bg-dark justify-contnent-between'>
        <a className='navbar-brand' href='#'>
          <img
            width='250px'
            src='WolliesboxdLogoLight.png'
            alt={'Wolliesboxd'}
          />
        </a>
        <button
          className='navbar-toggler'
          type='button'
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ marginRight: '15px' }}
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className={`${isCollapsed ? 'collapse' : ''} navbar-collapse justify-content-between`}
          id='navbarColor01'
        >
          <form className='form-inline' style={{ margin: '5px' }}>
            <div className='input-group'>
              <input
                className='form-control mr-sm-2'
                type='search'
                placeholder='Find sandwiches or users...'
                aria-label='Search'
              />
              <button
                className='btn btn-outline-info  my-sm-0'
                type='submit'
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </form>
          <ul style={{ marginRight: '15px' }} className='navbar-nav'>
            <li className='nav-item'>
              <Link className='nav-link' to={'/'}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to={'/'}>
                Sandwiches
              </Link>
            </li>
            {isAuthenticated ? (
              accountDropdown
            ) : (
              <li className='nav-item'>
                <Link className='nav-link' to={'/login'}>
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
        <Alert alert={alert} setAlert={setAlert} />
      </nav>
    );
  }
};

export default NavBar;
