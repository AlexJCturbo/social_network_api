const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const validateEmail = function (email) {
  const check = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return check.test(email);
};

const UsersSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Please introduce a username.'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please introduce an email address.'],
      unique: true,
      trim: true,
      validate: [validateEmail, 'Please provide a valid email address.']
      //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAt => moment(createdAt).format('LLLL')
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
      }
    ],
    friends: [
      {
        type: Schema.Types.Mixed,
        ref: 'Users'
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

UsersSchema.virtual('friendsCount').get(function () {
  return this.friends.length;
});

const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;