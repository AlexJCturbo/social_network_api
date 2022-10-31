//const { Users } = require('../models/Users');
const { Users, Thoughts } = require('../models');

const usersController = {
  //Create a user /api/users
  addUser({ body }, res) {
    Users.create(body)
      .then(dbSocialNetwork => res.json(dbSocialNetwork))
      .catch(err => res.status(400).json(err));
  },

  //Get all users /api/users
  getAllUsers(req, res) {
    Users.find({})
      .select('-__v')
      .then(dbSocialNetwork => res.json(dbSocialNetwork))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //Get one user by ID /api/users/:id
  getUserById({ params }, res) {
    Users.findById({ _id: params.id })
      .select('-__v')
      .populate({
        path: "thoughts friends",
        select: '-__v -createdAt'
      })
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

  //Update a user /api/users/:id
  updateUser({ params, body }, res) {
    Users.findOneAndUpdate(
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
  },

  //Delete a user /api/users/:id
  deleteUser({ params }, res) {
    Users.findOneAndDelete({ _id: params.id })
      .select('-__v')
      .then(dbSocialNetwork => {
        if (!dbSocialNetwork) {
          res.status(404).json({ message: 'No user found with this ID.' });
          return;
        }
        res.json({ message: 'The user has been deleted' });
      })
      .catch(err => res.status(400).json(err));
  },

  //Need to fix this function to delete thoughts of a deleted user
  // deleteUser({ params }, res) {
  //   Users.findOneAndDelete({ _id: params.id })
  //     .select('-__v')
  //     .then(dbSocialNetwork => {
  //       dbSocialNetwork.thoughts.forEach(thought => {
  //         //Thoughts.findOneAndDelete({ _id: thought })
  //         Thoughts.deleteMany({ _id: thought }, res)
  //           .then(dbSocialNetwork => {
  //             if (!dbSocialNetwork) {
  //               res.status(404).json({ message: 'No though was found with this ID.' });
  //               return;
  //             }
  //             res.json({ message: 'The user has been deleted' });
  //           })
  //           .catch(err => {
  //             console.log(err);
  //             res.status(400).json(err);
  //           });
  //       })
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       res.status(400).json(err);
  //     });
  // },

  //Add a friend /api/users/:userId/friends/:friendId
  addFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
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

  //Delete a friend /api/users/:userId/friends/:friendId
  deleteFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then(dbSocialNetwork => res.json(dbSocialNetwork))
      .catch(err => res.json(err));
  }

};

module.exports = usersController;