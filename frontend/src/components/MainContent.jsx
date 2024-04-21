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
import { selectAuth, selectIsWhatRole } from '../auth/authSlice';
import { useLocation } from 'react-router-dom';
import SearchPage from '../pages/SearchPage';
import SandwichPage from '../pages/SandwichPage';
import Footer from './Footer';
import BrowseSandwichesPage from '../pages/BrowseSandwiches';
import FeedPage from '../pages/FeedPage';

const MainContent = () => {
  const { isAdmin, isEmployee } = useSelector(selectIsWhatRole());
  const { isAuthenticated } = useSelector(selectAuth);

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
      <div style={{ marginTop: '100px', marginBottom: '100px', minHeight: '65vh' }}>
        <Container maxWidth='lg'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/home' element={<Navigate to={'/'} replace />} />
            <Route
              path='/profile'
              element={ 
                isAuthenticated ? 
                  <ProfilePage key={location.pathname} /> 
                  :
                  <Navigate to={'/'} replace />
              }
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
              element={isAdmin || isEmployee ? <Sandwiches /> : <BrowseSandwichesPage />}
            />
            <Route path='/sandwiches/:sid' element={<SandwichPage />} />
            <Route path='/feed' element={<FeedPage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default MainContent;
