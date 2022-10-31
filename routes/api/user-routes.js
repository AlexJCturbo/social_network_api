const router = require('express').Router();
const {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/users-controller')

// /api/users/
router
  .route('/')
  .post(addUser)
  .get(getAllUsers);

// /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;