const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000';
const API_URL = `${BASE_URL}/api`;
const RATINGS_URL = `${API_URL}/ratings`;
import { authGet } from './helpers';

export const getAllRatings = (params={}) => {
  return authGet(RATINGS_URL + (params ? `?${new URLSearchParams(params)}` : ''));
};

export const getRatingsByUsername = (username) => {
  return getAllRatings({ username });
};

export const getRatingsByUserId = (uid) => {
  return getAllRatings({ uid });
};

export const getRatingsBySandwichId = (sid) => {
  return getAllRatings({ sid });
};
