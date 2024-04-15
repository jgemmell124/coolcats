import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { UserContext } from './auth/userContext';
import MainContent from './components/MainContent';

function App() {
  return (
    <UserContext>
      <BrowserRouter>
        <Routes>
          <Route element={<AnonymousRoute />}>
            {/* 
              These routes only available to those NOT logged in.
              This just means that if you are signed in then you cannot see the login or signup page.
            */}
            <Route exact path='/login' element={<LoginPage />} />
            <Route exact path='/signup' element={<SignupPage />} />
          </Route>
          <Route path='*' element={<MainContent />} />
        </Routes>
      </BrowserRouter>
    </UserContext>
  );
}

const AnonymousRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? <Navigate to='/' replace /> : <Outlet />;
};

export default App;
