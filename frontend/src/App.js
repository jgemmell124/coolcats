import React from 'react';
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
import { UserContext } from './auth/userContext';

function App() {
  return (
    <UserContext>
      <BrowserRouter>
        <Routes>
          <Route element={<AnonymousRoute />}>
            {/* These routes only available to those NOT logged in */}
            <Route exact path='/login' element={<LoginPage />} />
            <Route exact path='/signup' element={<h1>Sign up here</h1>} />
          </Route>
          <Route path='*' element={<MainContent />} />
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
