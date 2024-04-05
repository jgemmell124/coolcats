import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<h1>Login here</h1>}/>
        <Route exact path='/signup' element={<h1>Sign in here</h1>}/>
        <Route path='*' element={<MainContent />} />
      </Routes>
    </BrowserRouter>
  );
}

const MainContent = () => {
  return (
    <Navbar>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Navbar>
  );
};

export default App;
