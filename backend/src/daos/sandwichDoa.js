import sandwichModel from '../models/sandwichModel';

export const getUserById = (sandwichId) => {
  return sandwichModel.findById(sandwichId);
};

export const createUser = (sandwich) => {
  return sandwichModel.create(sandwich);
};

export const updateSandwich = (sandwichId, sandwich) => {
  return sandwichModel.updateOne({ _id: sandwichId }, { $set: sandwich });
};

export const deleteSandwich = (sandwichId) => {
  return sandwichModel.deleteOne({ _id: sandwichId });
};
