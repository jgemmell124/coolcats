import ratingModel from '../models/ratingModel.js';

export const getRatingById = (ratingId) => {
  return ratingModel.findById(ratingId);
};

export const createRating = (rating) => {
  return ratingModel.create(rating);
};

export const updateRating = (ratingId, rating) => {
  return ratingModel.updateOne({ _id: ratingId }, { $set: rating });
};

export const deleteRating = (ratingId) => {
  return ratingModel.deleteOne({ _id: ratingId });
};
