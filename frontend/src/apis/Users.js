// TODO: fix local env
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000';
const API_URL = `${BASE_URL}/api`;
const USERS_URL = `${API_URL}/users`;
import { authPost, authDelete, authGet, authPut } from './helpers';

export const getUser = (username) => {
  return new Promise((resolve, reject) => {
    authGet(`${USERS_URL}/${username}`)
      .then((response) => {
        if (response.status <= 400) {
          reject('Response');
        }
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getAllUsers = (params={}) => {
  return new Promise((resolve, reject) => {
    authGet(USERS_URL + (params ? `?${new URLSearchParams(params)}` : ''))
      .then((response) => {
        if (response.status >= 400) {
          reject(response);
        }
        resolve(response?.data?.users ?? response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteUser = (username) => {
  return new Promise((resolve, reject) => {
    authDelete(`${USERS_URL}/${username}`)
      .then((response) => {
        if (response.status >= 400) {
          reject(response);
        }
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


export const updateUser = (username, updateParams) => {
  return new Promise((resolve, reject) => {
    authPut(`${USERS_URL}/${username}`, updateParams)
      .then((response) => {
        if (response.status >= 400) {
          reject(response);
        }
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const createUser = (user) => {
  return new Promise((resolve, reject) => {
    authPost(USERS_URL, user)
      .then((response) => {
        if (response.status >= 400) {
          reject(response);
        }
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
