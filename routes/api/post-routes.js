const router = require('express').Router();
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../../controllers/post-controller');


 // /api/posts
router
.route('/')
.get(getAllPosts)
.post(createPost);

// /api/posts/:id
router
  .route('/:id')
  .get(getPostById)
  .put(updatePost)
  .delete(deletePost);

module.exports = router;