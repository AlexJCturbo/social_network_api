const router = require('express').Router();
const {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../../controllers/users-controller')

router
  .route('/')
  .post(addUser)
  .get(getAllUsers);

router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);


module.exports = router;