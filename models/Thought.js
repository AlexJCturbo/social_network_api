const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReactionsSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAt => moment(createdAt).format('LLLL')
    },
  }, {
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
}
);

const ThoughtsSchema = new Schema(
  {
    thoughsText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAt => moment(createdAt).format('LLLL')
    },
    username: {
      type: String,
      required: true
    },
    reactions: [ReactionsSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);


ThoughtsSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
})

const Thoughts = model('Thoughts', ThoughtsSchema);
module.exports = Thoughts;