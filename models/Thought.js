const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Thoughts = new Schema({
  thoughText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {},
  username: {
    Type: String,
    required: true
  },
  reactions: {

  }
})