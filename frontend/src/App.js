import React, { useState } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './pages/Home';
import NotFound from './pages/NotFound';
import Navigation from './components/Navigation';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { UserContext } from './auth/userContext';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log('isAuthenticated:', isAuthenticated);

  return (
    <UserContext>
      <BrowserRouter>
        <Routes>
          <Route element={<AnonymousRoute />}>
            {/* These routes only available to those NOT logged in */}
            <Route
              exact
              path='/login'
              element={
                isAuthenticated ? <Navigate to='/' replace /> : <LoginPage />
              }
            />
            <Route
              exact
              path='/signup'
              element={
                isAuthenticated ? <Navigate to='/' replace /> : <SignupPage />
              }
            />
          </Route>
          <Route
            path='*'
            element={isAuthenticated ? <MainContent /> : <LoginPage />}
          />
        </Routes>
      </BrowserRouter>
    </UserContext>
  );
}

const MainContent = () => {
  return (
    <Navigation>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Navigation>
  );
};

const AnonymousRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? <Navigate to='/' replace /> : <Outlet />;
};

export default App;
