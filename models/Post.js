const dateFormat = require('../utils/dateFormat');
const { Schema, model } = require('mongoose');

const PostSchema = new Schema(
  {
    postName: {
      type: String,
      required: true,
      trim: true
    },
    postBody: {
        type: String,
        required: true,
        trim: true
      },
    createdBy: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

  // get total count of comments and replies on retrieval
  PostSchema.virtual('commentCount').get(function() {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
  });

  
const Post = model('Post', PostSchema);


module.exports = Post