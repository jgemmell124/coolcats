// TODO: fix local env
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000';
const API_URL = `${BASE_URL}/api`;
const RATING_URL = `${API_URL}/ratings`;
import { authPost, authDelete, authGet, authPut } from './helpers';

export const getRatingById = (ratingId) => {
  return authGet(`${RATING_URL}/${ratingId}`);
};

export const getRatingsBySandwich = (sid) => {
    return authGet(RATING_URL, sid);
};

export const deleteRating = (ratingId) => {
  return authDelete(`${RATING_URL}/${ratingId}`);
};

export const updateRating = (ratingId, updateParams) => {
  return authPut(`${RATING_URL}/${ratingId}`, updateParams);
};

export const createRating = (rating) => {
  return authPost(RATING_URL, rating);
};