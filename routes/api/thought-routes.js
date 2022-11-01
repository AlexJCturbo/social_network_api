const router = require('express').Router();
const {
  addThougth,
  getThoughts,
  getThoughtById,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts/:userId
router
  .route('/:userId')
  .post(addThougth);

// /api/thoughts/
router.route('/').get(getThoughts);

// /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').put(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);


module.exports = router;