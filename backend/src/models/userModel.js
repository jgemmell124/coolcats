import mongoose from 'mongoose';
import { ROLES_ENUM } from '../utils/constants.js';

const userSchema = new mongoose.Schema({
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
}, { collection: 'users', versionKey: false });

export default mongoose.model('User', userSchema);
