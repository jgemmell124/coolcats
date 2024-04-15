import { Container } from '@mui/material';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/Home';
import NotFound from '../pages/NotFound';
import ProfilePage from '../pages/ProfilePage';
import UserProfilePage from '../pages/UserProfilePage';
import ResponsiveNavBar from './NavBar';

const MainContent = () => {
  return (
    <div 
      style={{
        overflow: 'hidden',
        backgroundImage: 'url(/background.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <ResponsiveNavBar />
      <div 
        style={{ paddingTop: '10px', overflow: 'scroll', height: '100%' }}
      >
        <Container
          maxWidth='md'
        >
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/home' element={<Navigate to={'/'} replace />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/profile/:uname' element={<UserProfilePage />} />
            <Route path='/search' element={<h1>search page</h1>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Container>
      </div>
    </div>
  );
};

export default MainContent;
