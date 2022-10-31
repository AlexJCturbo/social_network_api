const router = require('express').Router();
const {
  addThougth,
  getThoughts,
  getThoughtById,
  updateThought,
  deleteThought
} = require('../../controllers/thought-controller');

// /api/thoughts/:userId
router
  .route('/:userId')
  .post(addThougth);

router
  .route('/')
  .get(getThoughts);

// /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;