const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['admin', 'operator'],
    default: 'operator'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Note: Password hashing is handled in authController.js using bcryptjs
// This keeps the model clean and puts business logic in the controller

module.exports = mongoose.model('User', userSchema);