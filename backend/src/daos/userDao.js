import userModel from '../models/userModel.js';

export const getUserByUsername = (username) => {
  return userModel.findOne({ username });
};

export const getUserById = (id) => {
  return userModel.findOne({ _id: id });
};

export const createUser = (user) => {
  return userModel.create(user);
};

export const updateUser = (username, updates) => {
  return userModel.updateOne({ username }, { $set: updates });
};

export const deleteUser = (username) => {
  return userModel.deleteOne({ username });
};

export const findUserByCredentials = (username, password) => {
  return userModel.findOne({ username, password });
};

export const getUserByEmail = (email) => {
  return userModel.findOne({ email });
};
