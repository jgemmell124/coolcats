// TODO: fix local env
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000';
const API_URL = `${BASE_URL}/api`;
const SANDWICH_URL = `${API_URL}/sandwiches`;
import { authPost, authDelete, authGet, authPut } from './helpers';

export const getSandwich = (sid) => {
  return authGet(`${SANDWICH_URL}/${sid}`);
};

export const getAllSandwiches = (params={}) => {
  return authGet(SANDWICH_URL + (params ? `?${new URLSearchParams(params)}` : ''));
};

export const deleteSandwich = (sid) => {
  return authDelete(`${SANDWICH_URL}/${sid}`);
};

export const updateSandwich = (sid, updateParams) => {
  return authPut(`${SANDWICH_URL}/${sid}`, updateParams);
};

export const createSandwich = (sandwich) => {
  return authPost(SANDWICH_URL, sandwich);
};

