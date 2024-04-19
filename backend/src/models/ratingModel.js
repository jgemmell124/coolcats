import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema(
  {
    sandwich_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sandwich',
      required: true,
    },
    // TODO either username or user_id or both?
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    title: {
      type: String,
      required: true,
      maxLength: 50,
    },
    comment: {
      type: String,
      required: false,
      maxLength: 500,
    },
  },
  {
    collection: 'ratings',
    timestamps: {
      createdAt: 'created',
      updatedAt: 'lastEdited',
    },
    versionKey: false,
  }
);

export default mongoose.model('Rating', ratingSchema);
