// TODO: fix local env
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000';
const API_URL = `${BASE_URL}/api`;
const USERS_URL = `${API_URL}/users`;
import { authPost, authDelete, authGet, authPut } from './helpers';

export const getUser = (username) => {
  return authGet(`${USERS_URL}/${username}`);
};

export const getAllUsers = (params={}) => {
  return authGet(USERS_URL + (params ? `?${new URLSearchParams(params)}` : ''));
};

export const deleteUser = (username) => {
  return authDelete(`${USERS_URL}/${username}`);
};

export const updateUser = (username, updateParams) => {
  return authPut(`${USERS_URL}/${username}`, updateParams);
};

export const createUser = (user) => {
  return authPost(USERS_URL, user);
};

export const login = (username, password) => {
  return authPost(`${USERS_URL}/login`, { username, password });
};

export const logout = () => {
  return authPost(`${USERS_URL}/logout`);
};
