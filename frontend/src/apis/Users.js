// TODO: fix local env
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000';
const API_URL = `${BASE_URL}/api`;
const USERS_URL = `${API_URL}/users`;
import { authPost, authDelete, authGet, authPut } from './helpers';

export const getUser = (username) => {
  return authGet(`${USERS_URL}/${username}`);
};

export const getAllUsers = (params = null) => {
  return authGet(USERS_URL + (params ? `?${new URLSearchParams(params)}` : ''));
};

export const deleteUser = (uid) => {
  return authDelete(`${USERS_URL}/${uid}`);
};

export const updateUser = (uid, updateParams) => {
  return authPut(`${USERS_URL}/${uid}`, updateParams);
};

export const createUser = (user) => {
  return authPost(USERS_URL, user);
};
