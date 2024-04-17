import mongoose from 'mongoose';
import { ROLES_ENUM } from '../utils/constants.js';

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    name: String,
    role: {
      type: String,
      enum: ROLES_ENUM.ALL,
      default: ROLES_ENUM.USER,
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    collection: 'users',
    versionKey: false,
  }
);

export default mongoose.model('User', userSchema);
