import mongoose from 'mongoose'
const recordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
});

const recordModel = mongoose.model('Record', recordSchema);
export default recordModel;