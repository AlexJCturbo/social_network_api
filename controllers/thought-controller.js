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
      { new: true }
    )
      .select('-__v')
      .then(dbSocialNetwork => {
        if (!dbSocialNetwork) {
          res.status(404).json({ message: 'No user found with this ID.' });
          return;
        }
        res.json(dbSocialNetwork);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }

}

module.exports = thoughtsController;