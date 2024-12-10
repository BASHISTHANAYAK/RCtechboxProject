const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Enforce uniqueness
    trim: true,
    lowercase: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Record', RecordSchema);
