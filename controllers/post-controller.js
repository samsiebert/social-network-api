const { Post } = require('../models');

const postController = {
    getAllPosts(req, res) {
      Post.find({})
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbPostData => res.json(dbPostData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
  
    
    getPostById({ params }, res) {
      Post.findOne({ _id: params.id })
        .populate({
          path: 'comments',
          select: '-__v'
        })
        .select('-__v')
        .then(dbPostData => {
          if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
          }
          res.json(dbPostData);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },

    createPost({ body }, res) {
        Post.create(body)
          .then(dbPostData => res.json(dbPostData))
          .catch(err => res.status(400).json(err));
      },

    
      updatePost({ params, body }, res) {
        Post.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbPostData => {
            if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id!' });
              return;
            }
            res.json(dbPostData);
          })
          .catch(err => res.status(400).json(err));
      },

      deletePost({ params }, res) {
          Post.findOneAndDelete({ _id: params.id })
            .then(dbPostData => {
              if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id!' });
                return;
              }
              res.json(dbPostData);
            })
            .catch(err => res.status(400).json(err));
        }
  }

module.exports = postController;