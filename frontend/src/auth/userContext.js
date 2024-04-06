import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getSession } from '../apis/Auth';
import { loginUser, logoutUser } from './authSlice';
import { useDispatch } from 'react-redux';

export const UserContext = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getSession()
      .then(user => dispatch(loginUser(user)))
      .catch(() => dispatch(logoutUser())); 
  }, []);

  return children;
};

UserContext.propTypes = {
  children: PropTypes.node.isRequired,
};
