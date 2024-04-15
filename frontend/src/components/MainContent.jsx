import React from 'react';
import NavBar from './NavBar';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/Home';
import NotFound from '../pages/NotFound';

const MainContent = () => {
  return (
    <div style={{ overflow: 'hidden', height: '100vh' }}>
      <NavBar />
      <div
        style={{
          overflow: 'scroll',
          backgroundImage: 'url(/background.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className='container-fluid h-100'
      >
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/home' element={<Navigate to={'/'} replace />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainContent;
