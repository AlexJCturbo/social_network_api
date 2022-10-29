const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const thoughtsSchema = new Schema(
  {
    thoughText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

const Thoughts = mongoose.model('Thoughts', thoughtsSchema);
module.exports = Thoughts;