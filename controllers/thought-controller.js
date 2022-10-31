const { Thoughts, Users } = require('../models');

const thoughtsController = {
  //Create a thougth /api/thoughts/:userId
  addThougth({ params, body }, res) {
    Thoughts.create(body)
      .then(({ _id }) => {
        return Users.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbSocialNetwork => {
        if (!dbSocialNetwork) {
          res.status(404).json({ message: 'No user found with this ID.' })
          return;
        }
        res.json(dbSocialNetwork);
      })
      .catch(err => res.json(err));
  },

  //Get all thoughts /api/thoughts
  getThoughts(req, res) {
    Thoughts.find({})
      .select('-__v')
      .then(dbSocialNetwork => res.json(dbSocialNetwork))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //Get thoughts by ID /api/thoughts/:id
  getThoughtById({ params }, res) {
    Thoughts.findById({ _id: params.id })
      .select('-__v')
      .populate({
        path: "thoughsText",
        select: '-__v -createdAt'
      })
      .then(dbSocialNetwork => {
        if (!dbSocialNetwork) {
          res.status(404).json({ message: 'No though found with this ID.' });
          return;
        }
        res.json(dbSocialNetwork);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //Update a thought by ID /api/thoughts/:id
  updateThought({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true, runValidators: true }
    )
      .select('-__v')
      .then(dbSocialNetwork => {
        if (!dbSocialNetwork) {
          res.status(404).json({ message: 'No thought found with this ID.' });
          return;
        }
        res.json(dbSocialNetwork);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //Delete a thought /api/thought/:id
  deleteThought({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .select('-__v')
      .then(dbSocialNetwork => {
        if (!dbSocialNetwork) {
          res.status(404).json({ message: 'No thought found with this ID.' });
          return;
        }
        res.json({ message: 'The thought has been deleted' });
      })
      .catch(err => res.status(400).json(err));
  },

  //Create a reaction /api/thoughts/:thoughtId/reactions
  addReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .select('-__v')
      .then(dbSocialNetwork => {
        if (!dbSocialNetwork) {
          res.status(404).json({ message: 'No thought found with this ID.' })
          return;
        }
        res.json(dbSocialNetwork);
      })
      .catch(err => res.json(err));
  },

  //Delete a reaction /api/thoughts/:thoughtId/reactions/:reactionId
  deleteReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .select('-__v')
      .then(dbSocialNetwork => {
        if (!dbSocialNetwork) {
          res.status(404).json({ message: 'No thoughts found with this id.' });
          return;
        }
        res.json(dbSocialNetwork);
      })
      .catch(err => res.status(400).json(err));
  }

}

module.exports = thoughtsController;