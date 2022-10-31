const router = require('express').Router();
const {
  addThougth,
  getThoughts,
  getThoughtById
} = require('../../controllers/thought-controller');

// /api/thoughts/:userId
router
  .route('/:userId')
  .post(addThougth);

router
  .route('/')
  .get(getThoughts);

router
  .route('/:id')
  .get(getThoughtById);

module.exports = router;