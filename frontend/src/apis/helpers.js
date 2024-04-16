import axios from 'axios';

const createRequest = (req) => {
  return new Promise((resolve, reject) => {
    req
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const withCredentials = {
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
};

export const authGet = (url) => {
  return createRequest(axios.get(url, withCredentials));
};

export const authPost = (url, body) => {
  return createRequest(axios.post(url, body, withCredentials));
};

export const authPut = (url, body) => {
  return createRequest(axios.put(url, body, withCredentials));
};

export const authDelete = (url) => {
  return createRequest(axios.delete(url, withCredentials));
};
