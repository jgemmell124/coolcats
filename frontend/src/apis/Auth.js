// TODO: fix local env and have file for the base urls
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000';
const API_URL = `${BASE_URL}/api`;
const AUTH_URL = `${API_URL}/auth`;

import { authPost, authGet } from './helpers';
export const getSession = () => {
  return authGet(`${AUTH_URL}/session`);
};

export const login = (username, password) => {
  return authPost(`${AUTH_URL}/login`, { username, password });
};

export const logout = () => {
  return authPost(`${AUTH_URL}/logout`);
};
