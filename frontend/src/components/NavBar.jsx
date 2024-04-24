import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../apis/Auth';
import { logoutUser, selectAuth } from '../auth/authSlice';
import { ROLES_ENUM } from '../utils/constants';
import SearchIcon from '@mui/icons-material/Search';
import ReviewModal from './ReviewModal';
import { getAllSandwiches } from '../apis/Sandwiches';

const ResponsiveNavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openNewReviewModal, setOpenNewReviewModal] = React.useState(false);
  // TODO redux would come in handy here
  const [sandwiches, setSandwiches] = React.useState([{}]);
  const { isAuthenticated, user } = useSelector(selectAuth);
  const username = user?.username;
  const userRole = user?.role;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userHasAccess = (highestAccess) => {
    if (highestAccess === ROLES_ENUM.GUEST) return true;
    if (highestAccess === ROLES_ENUM.USER && userRole !== ROLES_ENUM.GUEST)
      return true;
    if (
      highestAccess === ROLES_ENUM.EMPLOYEE &&
      (userRole === ROLES_ENUM.EMPLOYEE || userRole === ROLES_ENUM.ADMIN)
    )
      return true;
    if (highestAccess === ROLES_ENUM.ADMIN && userRole === ROLES_ENUM.ADMIN)
      return true;
    return false;
  };

  const handleSignout = async () => {
    try {
      await logout();
      dispatch(logoutUser());
      if (window.location.pathname === '/profile') {
        navigate('/', { replace: true });
      }
    } catch (err) {
      /* setAlert('Failed to sign out'); */
    }
  };

  const fetchSandwiches = async () => {
    await getAllSandwiches().then((s) => setSandwiches(s.sandwiches));
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const AppLogo = () => (
    <img width='250px' src='/WolliesboxdLogoLight.png' alt={'Wolliesboxd'} />
  );

  const pages = [
    { title: 'Home', url: '/', highestRole: ROLES_ENUM.GUEST },
    {
      title: 'Sandwiches',
      url: '/sandwiches',
      highestRole: ROLES_ENUM.GUEST,
    },
    { title: 'Users', url: '/allUsers', highestRole: ROLES_ENUM.ADMIN },
    { title: 'Feed', url: '/feed', highestRole: ROLES_ENUM.GUEST },
  ].filter((page) => userHasAccess(page.highestRole));

  const accountMenu = [
    { title: 'Profile', handler: () => navigate('/profile') },
    { title: 'Logout', handler: handleSignout },
  ];

  const profileButton = isAuthenticated ? (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt='Remy Sharp' src='emptyProfilePic.png' />
          <Typography
            display={{ xs: 'none', sm: 'block' }}
            color={'white'}
            paddingLeft={'8px'}
            fontFamily={'monospace'}
          >
            {`${username ?? 'login'}`}
            <ArrowDropDownIcon color='white' />
          </Typography>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {accountMenu.map((setting) => (
          <MenuItem
            key={setting.title}
            onClick={() => {
              handleCloseUserMenu();
              setting.handler();
            }}
          >
            <Typography textAlign='center'>{setting.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  ) : (
    <NavLink to={'/login'} style={{ color: 'white', textDecoration: 'none' }}>
      <Button sx={{ my: 2, color: 'white', display: 'block' }}>Sign In</Button>
    </NavLink>
  );

  const logSandwichButtonMobile = (
    <Button
      variant='contained'
      onClick={async () => {
        if (!isAuthenticated) {
          navigate('/login');
          return;
        }
        await fetchSandwiches();
        setOpenNewReviewModal(true);
      }}
      sx={{
        marginTop: '5px',
        marginLeft: '5px',
        marginRight: '5px',
        backgroundColor: '#52bf30',
        ':hover': { backgroundColor: '#42852d' },
      }}
    >
      <AddIcon />
      Log Sandwich
    </Button>
  );

  return (
    <AppBar
      position='fixed'
      sx={{
        backgroundColor: '#090910',
        height: '65px',
      }}
    >
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <AppLogo />
          </Typography>
          {/* Mobile screen button menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <NavLink
                    to={page.url}
                    style={{ color: 'black', textDecoration: 'none' }}
                  >
                    <Typography textAlign='center'>{page.title}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink
                  to={'/search'}
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  <Typography textAlign='center'>Search</Typography>
                </NavLink>
              </MenuItem>
              {logSandwichButtonMobile}
            </Menu>
          </Box>
          {/* Mobile screen logo */}
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <AppLogo />
          </Typography>
          {/* Desktop screen button menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <NavLink
                key={page.title}
                to={page.url}
                style={{ color: 'white', textDecoration: 'none' }}
              >
                <Button
                  key={page.title}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.title}
                </Button>
              </NavLink>
            ))}
            <NavLink
              to={'/search'}
              style={{
                marginTop: 'auto',
                marginBottom: 'auto',
              }}
            >
              <IconButton
                type='button'
                sx={{
                  height: '40px',
                  width: '40px',
                }}
                aria-label='search'
              >
                <SearchIcon sx={{ color: 'white' }} />
              </IconButton>
            </NavLink>

            <Button
              variant='contained'
              onClick={async () => {
                if (!isAuthenticated) {
                  navigate('/login');
                  return;
                }
                await fetchSandwiches();
                setOpenNewReviewModal(true);
              }}
              sx={{
                my: 2,
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                backgroundColor: '#52bf30',
                ':hover': { backgroundColor: '#42852d' },
              }}
            >
              <AddIcon />
              Log Sandwich
            </Button>
          </Box>
          {/* profile button */}
          {profileButton}
        </Toolbar>
        <ReviewModal
          isNew={true}
          open={openNewReviewModal}
          setOpen={setOpenNewReviewModal}
          rating={{}}
          uid={user?._id ?? ''}
          sandwiches={sandwiches}
        />
      </Container>
    </AppBar>
  );
};

export default ResponsiveNavBar;
