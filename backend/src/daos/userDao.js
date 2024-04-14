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

export const updateUser = (uid, updates) => {
  return userModel.updateOne({ _id: uid }, { $set: updates });
};

export const deleteUser = (uid) => {
  return userModel.deleteOne({ _id: uid });
};

export const findUserByCredentials = (username, password) => {
  return userModel.findOne({ username, password });
};

export const getUserByEmail = (email) => {
  return userModel.findOne({ email });
};
