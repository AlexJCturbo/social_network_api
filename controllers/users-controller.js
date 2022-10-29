//const { Users } = require('../models/Users');
const { Users } = require('../models');
const { put } = require('../routes/api/user-routes');

const usersController = {
  //Create User
  addUser({ body }, res) {
    Users.create(body)
      .then(dbSocialNetwork => res.json(dbSocialNetwork))
      .catch(err => res.status(400).json(err));
  },

  //Get all users
  getAllUsers(req, res) {
    Users.find({})
      .then(dbSocialNetwork => res.json(dbSocialNetwork))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //Get one user by ID
  getUserById({ params }, res) {
    Users.findById({ _id: params.id })
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
  },

  //Update a user
  updateUser({ params, body }, res) {
    Users.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true }
    )
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
  },

  //Delete a user
  deleteUser({ params }, res) {
    Users.findOneAndDelete({ _id: params.id })
      .then(dbSocialNetwork => {
        if (!dbSocialNetwork) {
          res.status(404).json({ message: 'No user found with this ID.' });
          return;
        }
        res.json(dbSocialNetwork);
      })
      .catch(err => res.status(400).json(err));
  }

};

module.exports = usersController;