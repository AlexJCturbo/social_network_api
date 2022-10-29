const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const { Schema, model } = require('mongoose');

const usersSchema = new Schema(
  {
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
    createdAt: {
      type: Date,
      default: Date.now
    },
    thoughts: [],
    friends: [],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
);

//const Users = model('User', userSchema);
const Users = mongoose.model('Users', usersSchema);
module.exports = Users;