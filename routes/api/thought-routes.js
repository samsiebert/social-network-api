const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
  } = require('../../controllers/thought-controller');


 // /api/thoughts
 router
 .route('/')
 .get(getAllThoughts)
 .post(createThought);

// /api/thoughts/<userId>
router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .post(createThought);

// /api/thoughts/<userId>/<thoughtId>/reactions
router
    .route('/:userId/:thoughtId/reactions')
    .put(addReaction)
    .delete(removeThought);

router
    .route('/:userId/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;