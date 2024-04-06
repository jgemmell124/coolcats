import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getProfile } from '../apis/Users';
import { loginUser, logoutUser } from './authSlice';
import { useDispatch } from 'react-redux';

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getProfile()
      .then(user => dispatch(loginUser(user)))
      .catch(() => dispatch(logoutUser())); 
  }, []);

  return children;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
