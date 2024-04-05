import axios from 'axios';

const withCredentials = { withCredentials: true };

export const authGet = (url) => {
  return axios.get(url, withCredentials);
};

export const authPost = (url, body) => {
  return axios.post(url, body, withCredentials);
};

export const authPut = (url, body) => {
  return axios.put(url, body, withCredentials);
};

export const authDelete = (url) => {
  return axios.delete(url, withCredentials);
};
