import userModel from '../models/userModel.js';

export const getUserById = (userId) => {
  return userModel.findById(userId);
};

export const createUser = (user) => {
  return userModel.create(user);
};

export const updateUser = (userId, user) => {
  return userModel.updateOne({ _id: userId }, { $set: user });
};

export const deleteUser = (userId) => {
  return userModel.deleteOne({ _id: userId });
};
