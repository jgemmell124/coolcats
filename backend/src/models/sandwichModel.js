import mongoose from 'mongoose';

const sandwichSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: Array, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
}, { collection: 'sandwiches' });

export default mongoose.model('Sandwich', sandwichSchema);
