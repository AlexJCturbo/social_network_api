const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  thoughts: [],
  friends: [],
});