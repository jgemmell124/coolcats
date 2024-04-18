import { Container } from '@mui/material';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/Home';
import NotFound from '../pages/NotFound';
import ProfilePage from '../pages/ProfilePage';
import Sandwiches from '../pages/Sandwiches';
import ResponsiveNavBar from './NavBar';
import AllUsersPage from '../pages/AllUsersPage';
import { useSelector } from 'react-redux';
import { selectRole } from '../auth/authSlice';
import { ROLES_ENUM } from '../utils/constants';
import { useLocation } from 'react-router-dom';
import SearchPage from '../pages/SearchPage';

const MainContent = () => {
  const role = useSelector(selectRole);
  const isAdmin = role === ROLES_ENUM.ADMIN;
  const isEmployee = role === ROLES_ENUM.EMPLOYEE;

  // Use location to refresh component between self Profile (/profile) and other user's Profile (/profile/:uname)
  const location = useLocation();

  return (
    <div
      style={{
        overflow: 'auto',
        backgroundImage: 'url(/background.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <ResponsiveNavBar />
      <div style={{ marginTop: '100px' }}>
        <Container maxWidth='lg'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/home' element={<Navigate to={'/'} replace />} />
            <Route
              path='/profile'
              element={<ProfilePage key={location.pathname} />}
            />
            <Route
              path='/profile/:uname'
              element={<ProfilePage key={location.pathname} />}
            />
            <Route path='/search' element={<SearchPage />} />
            <Route
              path='/allUsers'
              element={isAdmin ? <AllUsersPage /> : <NotFound />}
            />
            <Route
              path='/sandwiches'
              element={isAdmin || isEmployee ? <Sandwiches /> : <NotFound />}
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Container>
      </div>
    </div>
  );
};

export default MainContent;
