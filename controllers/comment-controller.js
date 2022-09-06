const { Comment, post } = require('../models');

const commentController = {

    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
          .then(({ _id }) => {
            return Post.findOneAndUpdate(
              { _id: params.postId },
              { $push: { comments: _id } },
              { new: true }
            );
          })
          .then(dbPostData => {
            if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id!' });
              return;
            }
            res.json(dbPostData);
          })
          .catch(err => res.json(err));
      },

      addReply({ params, body }, res) {
        Comment.findOneAndUpdate(
          { _id: params.commentId },
          { $push: { replies: body } },
          { new: true, runValidators: true }
        )
          .then(dbPostData => {
            if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id!' });
              return;
            }
            res.json(dbPostData);
          })
          .catch(err => res.json(err));
      },

      
      removeReply({ params }, res) {
        Comment.findOneAndUpdate(
          { _id: params.commentId },
          { $pull: { replies: { replyId: params.replyId } } },
          { new: true }
        )
          .then(dbpostData => res.json(dbpostData))
          .catch(err => res.json(err));
      },

      removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.commentId })
          .then(deletedComment => {
            if (!deletedComment) {
              return res.status(404).json({ message: 'No comment with this id!' });
            }
            return post.findOneAndUpdate(
              { _id: params.postId },
              { $pull: { comments: params.commentId } },
              { new: true }
            );
          })
          .then(dbPostData => {
            if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id!' });
              return;
            }
            res.json(dbPostData);
          })
          .catch(err => res.json(err));
      }
};

module.exports = commentController;